const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  if (!!req.user.isAdmin) {
    User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.status(401).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  }
})
