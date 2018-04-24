const Sequelize = require('sequelize');
const db = require('../db');

//define a model
const Order = db.define('order', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
});

module.exports = Order;
