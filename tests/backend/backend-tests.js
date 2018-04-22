import db from '../../server/db';
const User = db.model('user');
const Product = db.model('product');
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

describe('▒▒▒ Backend tests ▒▒▒', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

    describe('Sequelize models', function () {

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

                    // Be sure to read the large comment in server/models/index.js
                    // before attempting the following assertions.
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
                            expect(products.showPrice).to.be.a("$10");
                        });
                    })
                });

            });

        });

    });

    describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

//         describe('api routes', () => {

//             let obama;
//             let biden;
//             beforeEach('Seed users', () => {
//                 const users = [
//                     {email: 'obama@gmail.com'},
//                     {email: 'biden@gmail.com'}
//                 ];
//                 return User.bulkCreate(users, {returning: true})
//                     .then(createdUsers => {
//                         obama = createdUsers[0].id;
//                         biden = createdUsers[1].id;
//                     });
//             });

//             let obamaFirstMessage;
//             let bidenFirstMessage;
//             let obamaSecondMessage;
//             beforeEach('Seed messages', () => {

//                 const messages = [
//                     {
//                         toId: biden,
//                         fromId: obama,
//                         body: 'HEYOOOOOOO'
//                     },
//                     {
//                         toId: obama,
//                         fromId: biden,
//                         body: 'WAAASSUUUUPP??'
//                     },
//                     {
//                         toId: biden,
//                         fromId: obama,
//                         body: 'nmu?'
//                     }
//                 ];

//                 return Message.bulkCreate(messages, {returning: true})
//                     .then(createdMessages => {
//                         obamaFirstMessage = createdMessages[0].id;
//                         bidenFirstMessage = createdMessages[1].id;
//                         obamaSecondMessage = createdMessages[2].id;
//                     });

//             });

//             describe('users', () => {

//                 it('serves up all users on request to GET /', () => {
//                     return agent
//                         .get('/users')
//                         .expect(200)
//                         .then(res => {
//                             expect(res.body).to.be.an('array');
//                             expect(res.body.length).to.be.equal(2);
//                             expect(res.body).to.contain.a.thing.with('id', obama);
//                             expect(res.body).to.contain.a.thing.with('id', biden);
//                         });
//                 });

//                 it('updates a user at PUT /{{usersId}}, sending a 201 response', () => {
//                     return agent
//                         .put(`/users/${obama}`)
//                         .send({
//                             email: 'potus@hotmail.com'
//                         })
//                         .expect(201)
//                         .then(res => {
//                             return User.findById(obama);
//                         })
//                         .then(user => {
//                             expect(user.email).to.be.equal('potus@hotmail.com');
//                         });
//                 });

//             });

//             describe('messages', () => {

//                 it('serves up all messages to a specific user on GET /to/{{recipientId}}', () => {
//                     return agent
//                         .get(`/messages/to/${obama}`)
//                         .expect(200)
//                         .then(res => {
//                             expect(res.body).to.be.an('array');
//                             expect(res.body.length).to.be.equal(1);
//                             expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
//                         });
//                 });

//                 it('serves up all messages from a specific sender on GET /from/{{senderId}}', () => {
//                     return agent
//                         .get(`/messages/from/${obama}`)
//                         .expect(200)
//                         .then(res => {
//                             expect(res.body).to.be.an('array');
//                             expect(res.body.length).to.be.equal(2);
//                             expect(res.body).to.contain.a.thing.with.property('body', 'HEYOOOOOOO');
//                             expect(res.body).to.contain.a.thing.with.property('body', 'nmu?');
//                         });
//                 });


//                 it('serves up all messages—WITH FILLED IN REFERENCES—to a specific user on GET /to/{{recipientId}}', () => {
//                     return agent
//                         .get(`/messages/to/${obama}`)
//                         .expect(200)
//                         .then(res => {
//                             expect(res.body).to.be.an('array');
//                             expect(res.body.length).to.be.equal(1);
//                             expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
//                             expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
//                         });
//                 });

//                 it(`serves up all messages from a specific sender on GET /from/{{senderId}}
//                     and uses the Message model static getAllWhereSender in the process`, () => {

//                     // http://sinonjs.org/docs/#spies
//                     const getAllWhereSenderSpy = sinon.spy(Message, 'getAllWhereSender');

//                     return agent
//                         .get(`/messages/from/${obama}`)
//                         .expect(200)
//                         .then(res => {

//                             expect(res.body).to.be.an('array');
//                             expect(res.body.length).to.be.equal(2);

//                             expect(getAllWhereSenderSpy.called).to.be.equal(true);
//                             expect(getAllWhereSenderSpy.calledWith(obama.toString())).to.be.equal(true);

//                             getAllWhereSenderSpy.restore();

//                         });

//                 });

//                 it('adds a new message on POST /, responding with 201 and created message', () => {

//                     return agent
//                         .post('/messages')
//                         .send({
//                             fromId: biden,
//                             toId: obama,
//                             body: 'You are my best friend. I hope you know that.'
//                         })
//                         .expect(201)
//                         .then(res => {
//                             const createdMessage = res.body;
//                             return Message.findById(createdMessage.id)
//                         })
//                         .then(foundMessage => {
//                             expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
//                         });

//                 });

//             });

//         });

//     });

});
