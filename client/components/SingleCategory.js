import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { SingleProduct } from './SingleProduct';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { postToCart } from '../store';

const SingleCategory = ({singleCategory, handleAdd}) => {
  return (
    <div>
    {
      singleCategory.products &&
      singleCategory.products.length
      ? <Grid columns={3} style={{margin: '30px'}}>
      {
        singleCategory.products.map(product => {
          return (
            <Grid.Column key={ product.id } style={{border: '3px blue'}}>

            <div>
              <h3><a href={`/products/${product.id}`}>{ product.title }</a></h3>
              <Image src={ product.imgUrl } />
              <Grid columns={2} justify-content="space-between">
                <Grid.Column>
                  <h5 color="green">{ product.showPrice }</h5>
                </Grid.Column>
                <Grid.Column>
                  <Button animated='fade' color="green" onClick={() => handleAdd(product.id) }>
                    <Button.Content visible>Add to Cart</Button.Content>
                    <Button.Content hidden>
                      <Icon name='shop' />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              </Grid>
            </div>
            </Grid.Column>
          );
        })
      }
      </Grid>
      : <h1>There are no products in this category</h1>
    }
    </div>
  );
}

//props
const mapState = (state) => {
  return {
    singleCategory: state.singleCategory
  }
};

const mapDispatch = (dispatch) => (
  {
    handleAdd: function(productId) {
      dispatch(postToCart(productId))
    }
  }
)

export default connect(mapState, mapDispatch)(SingleCategory);

/**
 * PROP TYPES
 */
SingleCategory.propTypes = {
  singleCategory: PropTypes.object.isRequired
}
