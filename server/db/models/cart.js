const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // consider removing old or unused code
  // don't store properties on the model that you don't need
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart
