const Sequelize = require('sequelize')
const db = require('../db')


const defaultProductImg = 'http://www.deplaque.com/Portals/0/CVStoreImages/default_product_image_400.jpg';

const Product = db.define('product', {
  title: {
    // OB: consider unique validator
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    // OB: watch out for floats and financial info, industry standard is to use INTEGER and measure in cents
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    // OB: consider min validator
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imgUrl: {
    // OB: consider url validator
    type: Sequelize.STRING(10000),
    defaultValue: defaultProductImg
  },
  categories: {
    // OB: viable option, but if querying by category is slow, consider indexing
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
}, {
  getterMethods: {
    showPrice() {
      return '$' + this.price;
    }
  }
})

module.exports = Product
