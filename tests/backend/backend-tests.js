import db from '../../server/db';
const User = db.model('user');
const Product = db.model('product');
const Category = db.model('category');
const Order = db.model('order');
const Review = db.model('review');
import app from '../../server';

// import fsMisc from 'fs-misc';
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest-as-promised';
import sinon from 'sinon';
import { request } from 'https';

require('../../server/api/users')

describe('▒▒▒ Backend tests ▒▒▒', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

    describe('Sequelize models', function () {

      // testing user model
        describe('User Model', () => {

            // *Assertion translation*:
            // This assertion expects that the User model will
            // put an `email` column in the users table.
            it('has the expected schema definition', () => {
                expect(User.attributes.email).to.be.an('object');
            });

            describe('validations', () => {

                // *Assertion translation*:
                // The `email` column should be a required field.
                it('require email', () => {
                    const user = User.build();
                    return user.validate()
                        .then(() => { throw new Error('Promise should have rejected');})
                        .catch(err => {
                            expect(err).to.exist;
                            expect(err).to.be.an('error');
                            expect(err.errors).to.contain.a.thing.with.properties({
                                path: 'email',
                                type: 'notNull Violation'
                            });
                        });
                });

            });

        });

        //testing product model
        describe('Product Model', () => {

            describe('definition', () => {

                // *Assertion translation*:
                // This assertion expects that the Product model will:

                // put an `title` column in the products table.
                it('has title column', () => {
                    expect(Product.attributes.title).to.be.an('object');
                });

                // put an `description` column in the products table.
                it('has description column', () => {
                    expect(Product.attributes.description).to.be.an('object');
                });

                // put an `price` column in the products table.
                it('has price column', () => {
                  expect(Product.attributes.price).to.be.an('object');
                });

                // put an `quantity` column in the products table.
                it('has quantity column', () => {
                  expect(Product.attributes.quantity).to.be.an('object');
                });

                // put an `imgUrl` column in the products table.
                it('has imgUrl column', () => {
                  expect(Product.attributes.imgUrl).to.be.an('object');
                });

            });

            describe('validations', () => {

              it('requires a title', () => {
                const product = Product.build();
                return product.validate()
                    .then(() => { throw new Error('Promise should have rejected');})
                    .catch(err => {
                        expect(err).to.exist;
                        expect(err).to.be.an('error');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            path: 'title',
                            type: 'notNull Violation'
                        });
                    });
              });

              it('requires a description', () => {
                const product = Product.build();
                return product.validate()
                    .then(() => { throw new Error('Promise should have rejected');})
                    .catch(err => {
                        expect(err).to.exist;
                        expect(err).to.be.an('error');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            path: 'description',
                            type: 'notNull Violation'
                        });
                    });
              });

              it('requires a price', () => {
                const product = Product.build();
                return product.validate()
                    .then(() => { throw new Error('Promise should have rejected');})
                    .catch(err => {
                        expect(err).to.exist;
                        expect(err).to.be.an('error');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            path: 'price',
                            type: 'notNull Violation'
                        });
                    });
              });
            });


            describe('functionality', () => {

                let fooId;
                let barId;
                beforeEach('Seed users', () => {
                    const users = [
                        {email: 'foo@gmail.com'},
                        {email: 'bar@gmail.com'}
                    ];
                    return User.bulkCreate(users, {returning: true})
                        .then(createdUsers => {
                            fooId = createdUsers[0].id;
                            barId = createdUsers[1].id;
                        });
                });

                describe('getter method', () => {

                    describe('showPrice', () => {

                        let products;
                        beforeEach('Seed products', () => {

                          products = Product.build({
                              title: 'kleenex',
                              description: 'contains tissues',
                              price: '10'
                          });
                        });

                        it('returns price with $ sign attached', () => {
                            expect(products.showPrice).to.be.equal('$10');
                        });
                    })
                });

            });

        });

        // testing category model
        describe('Category Model', () => {

          // *Assertion translation*:
          // This assertion expects that the Category model will
          describe('validations', () => {

              // *Assertion translation*:
              // The `name` column should be a required field.
              it('require name', () => {
                  const category = Category.build();
                  return category.validate()
                      .then(() => { throw new Error('Promise should have rejected');})
                      .catch(err => {
                          expect(err).to.exist;
                          expect(err).to.be.an('error');
                          expect(err.errors).to.contain.a.thing.with.properties({
                              path: 'name',
                              type: 'notNull Violation'
                          });
                      });
              });

          });

      });

      describe('Order Model', () => {
        describe('definition', () => {
          // *Assertion translation*:
          // This assertion expects that the Order model will:

          //put an `subtotal` column in the orders table
          it('has subtotal column', () => {
            expect(Order.attributes.subtotal).to.be.an('object');
          });

          //put a `productIdAndQuantity` column in the orders table
          it('has productIdAndQuantity column', () => {
            expect(Order.attributes.productIdAndQuantity).to.be.an('object');
          });
        });

        describe('validations', () => {
          it('requires a subtotal', () => {
            const order = Order.build();
            return order.validate()
              .then(() => {
                throw new Error ('Promise should have rejected');
              })
              .catch(err => {
                expect(err).to.exist;
                expect(err).to.be.an('error');
                expect(err.errors).to.contain.a.thing.with.properties({
                  path: 'subtotal',
                  type: 'notNull Violation'
                })
              });
          });
          it('requires a productIdAndQuantity', () => {
            const order = Order.build();
            return order.validate()
              .then(() => {
                throw new Error ('Promise should have rejected');
              })
              .catch(err => {
                expect(err).to.exist;
                expect(err).to.be.an('error');
                expect(err.errors).to.contain.a.thing.with.properties({
                  path: 'productIdAndQuantity',
                  type: 'notNull Violation'
                })
              });
          });
        });
      })
      // testing review model
      describe('Review Model', () => {

        // *Assertion translation*:
        // This assertion expects that the Category model will
        describe('validations', () => {

            // *Assertion translation*:
            // The `name` column should be a required field.
            it('require review', () => {
                const review = Review.build();
                return review.validate()
                    .then(() => { throw new Error('Promise should have rejected');})
                    .catch(err => {
                        expect(err).to.exist;
                        expect(err).to.be.an('error');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            path: 'review',
                            type: 'notNull Violation'
                        });
                    });
            });

        });

      });

    });

    describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            let fooId;
            let barId;
            beforeEach('Seed users', () => {
                const users = [
                  {email: 'foo@gmail.com'},
                  {email: 'bar@gmail.com'}
                ];


                return User.bulkCreate(users, {returning: true})
                    .then(createdUsers => {
                        fooId = createdUsers[0].id;
                        barId = createdUsers[1].id;
                    });
            });


            let candle;
            let tumbler;
            let kleenex;
            beforeEach('Seed products', () => {

                const products = [
                    {
                        title: 'candle',
                        description: 'to make your room aromatic',
                        price: '200'
                    },
                    {
                        title: 'tumbler',
                        description: 'to carry coffee',
                        price: '99'
                    },
                    {
                        title: 'kleenex',
                        description: 'tissue in a box',
                        price: '5'
                    }
                ];

                return Product.bulkCreate(products, {returning: true})
                    .then(createdProducts => {
                        candle = createdProducts[0].id;
                        tumbler = createdProducts[1].id;
                        kleenex = createdProducts[2].id;
                    });

            });

            let fragrance;
            let somethingElse;
            beforeEach('Seed categories', () => {
                const categories = [
                  {name: 'fragrance'},
                  {name: 'somethingElse'}
                ];


                return Category.bulkCreate(categories, {returning: true})
                    .then(createdCategories => {
                        fragrance = createdCategories[0].id;
                        somethingElse = createdCategories[1].id;
                    });
            });

            describe('users', () => {

                it('serves up all users on request to GET /', () => {
                    return agent
                        .get('/api/users')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body)
                        });
                });

            });

            describe('products', () => {

              it('serves up all products on request to GET /', () => {
                  return agent
                      .get('/api/products')
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(3);
                          expect(res.body)
                      });
              });

            });

            describe('single product route', () => {

              it('serves up a specific product on request to GET /:id', () => {
                  return agent
                      .get('/api/products/1')
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('object');
                          expect(res.body.title).to.be.equal('candle');
                          expect(res.body.showPrice).to.be.equal('$200');
                          expect(res.body)
                      });
              });

            });

            describe('categories', () => {

              it('serves up all categories on request to GET /', () => {
                  return agent
                      .get('/api/categories')
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(2);
                      });
              });
            });

            describe('orders', () => {

              it('serves up all orders on request to GET /', () => {
                return agent
                    .get('/api/orders')
                    .expect(401) //get 401 because unauthorized
                    .then(res => {
                        expect(res.body).to.be.an('object');
                        expect(res.body.length).to.be.equal(undefined);
                    });
            });
            })
        });

    });

});
