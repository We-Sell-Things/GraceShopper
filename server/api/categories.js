const router = require('express').Router();
const {Category} = require('../db/models');
module.exports = router;

//get all the categories
router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
});

//get a single category
router.get('/:id', (req, res, next) => {
  //find by id and add eager loading to see all the products
  Category.findById(req.params.id, { include: [{all: true}]})
  .then(category => res.json(category))
  .catch(next);
});
