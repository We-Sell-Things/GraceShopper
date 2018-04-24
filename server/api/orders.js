const router = require('express').Router();
const { Order, User } = require('../db/models');
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
  Order.findById(req.params.id, { include: [User] })
    .then(order => res.json(order))
    .catch(next);
});

//post an order
router.post('/', (req, res, next) => {
  const passport = req.session.passport;
  const passportExists = !!passport && !!Object.keys(passport).length;


  if (passportExists) {
    const userId = passport.user;
    const orderObject = { subtotal: req.body.subtotal, productIdAndQuantity: req.body.productIdAndQuantity, userId }
    Order.create(orderObject)
      .then(order => res.json(order))
      .catch(next);
  } else {
    Order.create(req.body)
      .then(order => res.json(order))
      .catch(next);
  }

});
