const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const extraMiddleware = (req, res, next) => {
  if (req.user.isAdmin){
    // if the requester is an admin, let them continue
    next();
  }
  // if not, send a 401 unauthorized
  else {
    res.sendStatus(401);
  }
}

// router.<method> take an unlimited number of middleware
router.get('/', extraMiddleware, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
