const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
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
