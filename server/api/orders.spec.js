/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/orders', () => {
    const orderPrice = 27;
    const productId = 1;
    const quantity = 3;

    beforeEach(() => {
      return Order.create({
        price: orderPrice,
        productId: productId,
        quantity: quantity
      });
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].price).to.be.equal(orderPrice);
          expect(res.body[0].productId).to.be.equal(productId);
          expect(res.body[0].quantity).to.be.equal(quantity);
        })
    })
  });
});
