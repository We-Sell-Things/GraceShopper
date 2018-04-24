const router = require('express').Router()
const keyPublishable = process.env.pk_test_bTipXCXlk32UsSY2G7SqOR5C;
const keySecret = process.env.sk_test_Sm9PyHXOKGmJW0FWjUa3ievP;
const stripe = require('stripe')(keySecret);


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






