const router = require('express').Router()
module.exports = router

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


// router.delete
