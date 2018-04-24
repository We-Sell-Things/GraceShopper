const db = require('../db')
const router = require('express').Router();
const Cart = db.model('cart');
module.exports = router

router.get('/', (req, res, next) => {
  // check if passport exists. If it does, it means that the user is logged in
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;
  const sessionCart = req.session.cart;

  // if not logged in, show the products that are stored in the session
  if (!passportExists) {
    res.json(sessionCart);
  }

  // if logged in, show the products that are stored in the db
  else {
    const userId = passport.user;
    Cart.findOrCreate({
      where: {userId}
    })
    .spread(cart => {

      // if there were products in the user's cart, merge with the session cart
      const dbCart = cart.productIdAndQuantity;

      // if the products in sessionCart and dbCart do not match..
      if (JSON.stringify(dbCart) !== JSON.stringify(sessionCart)){
        // for every productId in dbCart
        for (productId in dbCart) {
          const quantity = dbCart[productId];
          // check if the productId exists in the sessionCart, if so add the quantity to the existing quantity
          if (sessionCart[productId]) {
            sessionCart[productId] = sessionCart[productId] + quantity;
          }
          // else, create new key with productId and it's quantity
          else {
            sessionCart[productId] = quantity;
          }
        }
      }
      cart.update({productIdAndQuantity: sessionCart})
      res.json(cart.productIdAndQuantity)
    })
    .catch(next);
  }
})

router.post('/', (req, res, next) => {
  // check if passport exists. If it does, it means that the user is logged in
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;

  const productId = req.body.productId;

  if (req.session.cart[productId]) {
    req.session.cart[productId]++
  } else {
    req.session.cart[productId] = 1;
  }

  // if logged in, post to the db
  if (passportExists) {
    const userId = passport.user;
    Cart.findOrCreate({
      where: {userId}
    })
    .spread(cart => {
      cart.update({productIdAndQuantity: req.session.cart})
      res.json(cart.productIdAndQuantity);
    })
    .catch(next);
  }

  // if not logged in, no interaction with db
  else {
    res.json(req.session.cart);
  }
})

router.put('/', (req, res, next) => {
  // check if passport exists. If it does, it means that the user is logged in
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;

  const productId = req.body.productId;

  if (req.session.cart[productId] > 1){
    req.session.cart[productId]--;
    // res.json(req.session.cart);
  } else {
    delete req.session.cart[productId];
    // res.json(req.session.cart);
  }

  // if logged in, post to the db
  if (passportExists) {
    const userId = passport.user;
    Cart.findOrCreate({
      where: {userId}
    })
    .spread(cart => {
      cart.update({productIdAndQuantity: req.session.cart})
      res.json(cart.productIdAndQuantity);
    })
    .catch(next);
  }

  // if not logged in, no interaction with db
  else {
    res.json(req.session.cart);
  }
})


router.get('/cart', (req, res, next) => {
  res.json(req.session.cart);
})
// router.delete




