const Sequelize = require('sequelize')
const db = require('../db')


const defaultProductImg = 'http://www.deplaque.com/Portals/0/CVStoreImages/default_product_image_400.jpg';

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imgUrl: {
    type: Sequelize.STRING(10000),
    defaultValue: defaultProductImg
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
})

module.exports = Product
