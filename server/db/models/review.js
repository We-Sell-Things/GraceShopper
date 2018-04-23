const Sequelize = require('sequelize');
const db = require('../db');

//define a model
const Review = db.define('review', {
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  review: {
    type: Sequelize.STRING(10000),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Review
