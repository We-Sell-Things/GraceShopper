const Sequelize = require('sequelize');
const db = require('../db');

//define a model
const Order = db.define('order', {
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productIdAndQuantity: {
    type: Sequelize.JSON,
    allowNull: false
  }
});

module.exports = Order;
