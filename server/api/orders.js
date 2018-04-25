const router = require('express').Router();
const { Order, User } = require('../db/models');
const secret = (process.env.NODE_ENV !== 'production') ? require('../../secrets') : process.env.STRIPEKEY;

var stripe = require("stripe")(secret);

module.exports = router;

//get all the orders
router.get('/', (req, res, next) => {
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;

  if (passportExists) {
    const userId = passport.user;
    Order.findAll({
      where: {
        userId
      }
    })
    .then(orders => res.json(orders))
    .catch(next);
  } else {
    res.sendStatus(401);
  }
});

//get a single order
router.get('/:id', (req, res, next) => {
  //find by id and eager load User model
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;

  if (passportExists) {

  Order.findById(req.params.id, { include: [User] })
    .then(order => {
      if (req.user.id === order.userId) {
        res.json(order)
      } else {
        res.sendStatus(401);
      }
    })
    .catch(next);
  } else {
    res.sendStatus(401);
  }
});

//post an order
router.post('/', (req, res, next) => {
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;
  const token = req.body.result;


  if (passportExists) {
    const userId = passport.user;
    const orderObject = { subtotal: req.body.subtotal, productIdAndQuantity: req.body.productIdAndQuantity, userId }
    stripe.charges.create({
      amount: req.body.subtotal,
      currency: 'usd',
      description: 'Example charge',
      source: token.token.id
    })
    .then(
      Order.create(orderObject)
      .then(order => res.json(order))
      .catch(next)
    )
    .catch(next);
  } else {
   const subtotal = req.body.subtotal
    stripe.charges.create({
      amount: subtotal,
      currency: 'usd',
      description: 'Example charge',
      source: token.token.id
    })
    .then(
      Order.create(req.body)
      .then(order => res.json(order))
      .catch(next)
    )
    .catch(next);
  }

});
