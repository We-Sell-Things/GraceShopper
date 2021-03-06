import React from 'react';
import {createStore} from 'redux';
import {expect} from 'chai';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy} from 'sinon';
// import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import db from '../../server/db';
const User = db.model('user');
const Product = db.model('product');

const adapter = new Adapter();
Enzyme.configure({adapter});

// components
import { Orders } from '../../client/components/Orders'
import {Products} from '../../client/components/products';
import { SingleProduct } from '../../client/components/SingleProduct';

//stores
import { getProducts } from '../../client/store/products';
import { getUser, removeUser } from '../../client/store/user';
import { getCategories } from '../../client/store/categories';
import singleOrderReducer, { getOrder } from '../../client/store/singleOrder';
import cartReducer, { getCart, addToCart, removeFromCart } from '../../client/store/cart';
import { Cart } from '../../client/components/cart';
import singleProductReducer, { getSingleProduct } from '../../client/store/singleProduct';
import { test } from 'mocha';


describe('▒▒▒ Front-end tests ▒▒▒', function () {

  // USER REACT/REDUX
  describe('USER', () => {

    describe('Redux architecture', () => {

      describe('Action Creators', () => {

        it('creates getUser action', () => {

          const testUsers = [{email: 'foo@google.com'}]
          expect(getUser(testUsers)).to.be.to.deep.equal({
            type: 'GET_USER',
            user: testUsers
          })

        });

        it('creates removeUser action', () => {

          expect(removeUser()).to.be.to.deep.equal({
            type: 'REMOVE_USER'
          })

        });

      });

    });

  })


  // PRODUCT REACT/REDUX
  describe('PRODUCT', () => {

      describe('React Component', () => {

        describe('Visual Content', () => {

          // let testingStore = createStore(singleProductReducer);

          let fakeProducts, fakeWrapper;
          beforeEach('Create <Products /> wrapper', () => {
            fakeProducts = [{title: 'test1', price: 10, imgUrl: 'pic.jpg'}]

            fakeWrapper = shallow(<Products products={fakeProducts} />)


          })

          it('renders', () => {
            expect(fakeWrapper.find('h3').text()).to.be.equal('test1');
          })

        })

      })

    describe('Redux architecture', () => {

      describe('Action Creators', () => {

        it('creates getProducts action', () => {

          const testProducts = [{name: 'test1', price: 10}, {name: 'test2', price: 20}]
          expect(getProducts(testProducts)).to.be.to.deep.equal({
            type: 'GET_PRODUCTS',
            products: testProducts
          })

        });

      });

    });

  })

  // CATEGORY REACT/REDUX
  describe('CATEGORY', () => {

    describe('Redux architecture', () => {

      describe('Action Creators', () => {

          it('creates getCategories action', () => {

            const testCategories = ['kitchen', 'fragrance']
            expect(getCategories(testCategories)).to.be.to.deep.equal({
              type: 'GET_CATEGORIES',
              categories: testCategories
            })

          });

      });

    })

  })

  describe('ORDER', () => {
    describe('Redux architecture', () => {
      describe('Action Creators', () => {
        it('creates getOrder action', () => {
          const testOrder = {
            subtotal: 135,
            productIdAndQuantity: {'1': 3}
          };
          expect(getOrder(testOrder)).to.be.to.deep.equal({
            type: 'GET_ORDER',
            order: testOrder
          })
        })
      })
    })
  })


  // CART REACT/REDUX
  describe('CART', () => {

    describe('React', () => {

      describe('Visual Content', () => {

        let cartData, productData, cartWrapper;
        let productDataArr = [];
        beforeEach('Create <Cart /> wrapper', () => {
          cartData = {"1": 3};
          productData = Product.build({
            id: 1,
            title: 'kleenex',
            description: 'contains tissues',
            price: '10'
        });
          productDataArr.push(productData.dataValues)
          cartWrapper = shallow(<Cart cart={cartData} products={productDataArr}/>)
        })

        it('includes "QUANTITY" line as an h5', () => {
          expect(cartWrapper.find('h2').text().trim()).to.equal('Subtotal: $30');
        })

      })

    })

    describe('Redux architecture', () => {

      describe('Action Creators', () => {

        it('creates getCart action', () => {

          const testCart = {"1": 3, "4": 2};
          expect(getCart(testCart)).to.be.to.deep.equal({
            type: 'GET_CART',
            cart: testCart
          })

        });

        it('creates addToCart action', () => {

          const testCart = {"1": 3, "4": 2};
          expect(addToCart(testCart)).to.be.to.deep.equal({
            type: 'ADD_TO_CART',
            cart: testCart
          })

        });

        it('creates removeFromCart action', () => {

          const testCart = {"1": 3, "4": 2};
          expect(removeFromCart(testCart)).to.be.to.deep.equal({
            type: 'REMOVE_FROM_CART',
            cart: testCart
          })

        });

      });

      describe('Reducer', () => {

        let testingStore;
        beforeEach('Create testing store', () => {
          testingStore = createStore(cartReducer);
        })

        describe('ADD_TO_CART reducer', () => {

          it('changes state when a product is added', () => {

            const currentStoreState = testingStore.getState();

            const testCart = {"1": 3, "4": 2};
            testingStore.dispatch({
              type: 'ADD_TO_CART',
              cart: testCart
            })

            const subsequentStoreState = testingStore.getState();

            expect(currentStoreState).to.not.be.equal(subsequentStoreState);

          });

        })

        describe('REMOVE_TO_CART reducer', () => {

          it('changes state when a product is removed', () => {

            const currentStoreState = testingStore.getState();

            const testCart = {"1": 3, "4": 2};
            testingStore.dispatch({
              type: 'REMOVE_FROM_CART',
              cart: testCart
            })

            const subsequentStoreState = testingStore.getState();

            expect(currentStoreState).to.not.be.equal(subsequentStoreState);

          });

        });

      })

    });

  })

  // SINGLE PRODUCT REACT/REDUX
  describe('singleProduct', () => {

    describe('Redux architecture', () => {

      describe('Action Creators', () => {

        it('creates getSingleProduct action', () => {

          const fakeProduct = {
            id: 1,
            title: 'candle',
            description: 'light it',
            price: 5,
            quantity: 5,
            imgUrl: 'candlePic.jpg',
            categoryId: 4
          };
          expect(getSingleProduct(fakeProduct)).to.be.to.deep.equal({
            type: 'GET_SINGLE_PRODUCT',
            product: fakeProduct
          })

        });

      });

      describe('Reducer', () => {

        let testingStore;
        beforeEach('Create testing store', () => {
          testingStore = createStore(singleProductReducer);
        })

        describe('GET_SINGLE_PRODUCT reducer', () => {

          it('changes state when a product is fetched', () => {

            const currentStoreState = testingStore.getState();

            const testProduct = {id: 3, title: 'nothing'};
            testingStore.dispatch({
              type: 'GET_SINGLE_PRODUCT',
              product: testProduct
            })

            const subsequentStoreState = testingStore.getState();

            expect(currentStoreState).to.not.be.equal(subsequentStoreState);

          });

        })

      })

    });

  })

  describe('<Orders /> component', () => {
    let testingStore = createStore(singleOrderReducer);

    let orders, fakeWrapper;
    beforeEach('Create <Orders /> wrapper', () => {
      orders = [
        {
          id: 1,
          subtotal: 137,
          productIdAndQuantity: {'1': 2}
        }
      ];
      fakeWrapper = shallow(<Orders orders={orders} store={testingStore} />)
    });

    it('renders `Order History: in h1 tag`', () => {
      expect(fakeWrapper.find('h1').text().trim()).to.equal('Order History:');
    });
  });
})
