const router = require('express').Router()
module.exports = router

// consider mounting cart on a /user/id/cart (restful)
// consider adding some more security validations (people shouldn't be able to read other peoples cart)

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
})


router.post('/', (req, res, next) => {
  const productId = req.body.productId;
  if (req.session.cart[productId]) {
    req.session.cart[productId]++
  } else {
    req.session.cart[productId] = 1;
  }
  res.json(req.session.cart);
})

router.put('/', (req, res, next) => {
  const productId = req.body.productId;
  if (req.session.cart[productId] > 1){
    req.session.cart[productId]--;
    res.json(req.session.cart);
  } else {
    delete req.session.cart[productId];
    res.json(req.session.cart);
  }
})


// remove old code or unused code and don't push it to master
router.get('/cart', (req, res, next) => {
  res.json(req.session.cart);
})

// don't push comments to master unless they are for clarification
// router.delete
