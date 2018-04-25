import React from 'react';
import {createStore} from 'redux';
import chai, {expect} from 'chai';
import enzyme, {shallow} from 'enzyme';
import {spy} from 'sinon';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() })

import db from '../../server/db';
const User = db.model('user');
const Product = db.model('product');

// components
import productsComponent from '../../client/components/products';

//stores
import { getProducts } from '../../client/store/products';
import { getUser, removeUser } from '../../client/store/user';
import { getCategories } from '../../client/store/categories';
import cartReducer, { getCart, addToCart, removeFromCart } from '../../client/store/cart';
import { Cart } from '../../client/components/cart';



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



})
