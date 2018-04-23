const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Category = require('./category');
const Order = require('./order');
const Review= require('./review');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsTo(User);
Cart.hasMany(Product);

Product.belongsTo(Category);
Category.hasMany(Product, { onDelete: 'cascade', hooks: true });
Order.belongsTo(User);
User.hasMany(Order);

// Review Associations
Review.belongsTo(User);
Product.hasMany(Review);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Cart,
  Category,
  Review
}
