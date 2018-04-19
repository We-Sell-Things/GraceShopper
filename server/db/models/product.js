const Sequelize = require('sequelize');
const db = require('../db');

//imgUrl
const defaultProductImg = 'http://www.deplaque.com/Portals/0/CVStoreImages/default_product_image_400.jpg';

//define a model
const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 1
    }
  },
  imgUrl: {
    type: Sequelize.STRING(10000),
    defaultValue: defaultProductImg
  }
}, {
  getterMethods: {
    showPrice() {
      return '$' + this.price; //add measure in cents
    }
  }
})

module.exports = Product
