const router = require('express').Router();
const {Product} = require('../db/models');
module.exports = router;

//get all the products
router.get('/', (req, res, next) => {
  Product.findAll({
    //select just a few attributes to show
    attributes: ['id', 'title', 'description', 'price', 'imgUrl', 'categoryId']
  })
  .then(products => res.json(products))
  .catch(next);
});

//get a single product
router.get('/:id', (req, res, next) => {
  //find by id and add eager loading
  Product.findById(req.params.id, { include: [{ all: true }]})
  .then(product => res.json(product))
  .catch(next);
});
