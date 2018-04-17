const router = require('express').Router();
const {Product} = require('../db/models');
module.exports = router;

//get all the products
router.get('/', (req, res, next) => {
  Product.findAll({
    //select just a few attributes to show
    attributes: ['id', 'title', 'description', 'price']
  })
  .then(products => res.json(products))
  .catch(next);
});
