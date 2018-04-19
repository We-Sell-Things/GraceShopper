const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  res.json(req.session.cart);
})


router.post('/', (req, res, next) => {
  const productId = req.body.productId;
  console.log('product ID ', req.body.productId);
  console.log('CART BEFORE   ', req.session.cart);
  if (req.session.cart[productId]) {
    req.session.cart[productId]++
  } else {
    req.session.cart[productId] = 1;
  }
  console.log('CART BEFORE   ', req.session.cart);
  res.json(req.session.cart);
})


// router.delete
