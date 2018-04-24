import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

// components
import productsComponent from '../../client/components/products';

//stores
import { getProducts } from '../../client/store/products';

describe('The Products Component', () => {

});

describe('The Products Redux Store', () => {

  describe('getProducts', () => {

    it('fetches products', () => {

      const testProducts = [{name: 'test1', price: 10}, {name: 'test2', price: 20}]

      expect(getProducts(testProducts)).to.be.to.deep.equal({
        type: 'GET_PRODUCTS',
        products: testProducts
      })

    });

  });

});
