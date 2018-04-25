import React from 'react';
import {createStore} from 'redux';
import {expect} from 'chai';
import enzyme, {shallow} from 'enzyme';
import {spy} from 'sinon';
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() })

// components
import productsComponent from '../../client/components/products';
import { SingleProduct } from '../../client/components/SingleProduct';

//stores
import { getProducts } from '../../client/store/products';
import { getUser, removeUser } from '../../client/store/user';
import { getCategories } from '../../client/store/categories';
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
          beforeEach('Create <SingleProduct /> wrapper', () => {
            fakeProducts = [{title: 'test1', price: 10, imgUrl: 'pic.jpg'}, {title: 'test2', price: 20, imgUrl: 'pic.jpg'}]

            fakeWrapper = shallow(<productsComponent products={fakeProducts} />)


          })

          it('renders', () => {
            expect(fakeWrapper.find('p').text()).toEqual('light it');
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



  // CART REACT/REDUX
  describe('CART', () => {

    describe('React', () => {

      describe('Visual Content', () => {

        let cartData, cartWrapper;
        beforeEach('Create <Cart /> wrapper', () => {
          cartData = {
            id: 1,
            productIdAndQuantity: {"3": 2, "4": 5}
          };
          cartWrapper = shallow(<Cart />)
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

})
