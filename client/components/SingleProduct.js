import React, {Component} from 'react';
import { postToCart } from '../store';
import {fetchSingleProduct} from '../store/singleProduct';
import {connect} from 'react-redux';
import { Grid, Image, Icon, Button, Container } from 'semantic-ui-react'

export class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { handleClick } = this.props;
    const product = this.props.singleProduct;
    return (
      <div>
        <div>
          <img src={ product.imgUrl } />
        </div>
        <div>
          <h3>{ product.title }</h3>
          <p>{ product.description }</p>
          <h5>{ product.price }</h5>
          <Button animated='fade' color="green" onClick={() => handleClick(product.id) }>
          <Button.Content visible>Add to Cart</Button.Content>
          <Button.Content hidden>
            <Icon name='shop' />
          </Button.Content>
        </Button>
        </div>
      </div>
    )
  }
}


const mapDispatch = (dispatch, ownProps) => (
  {
    fetchData: () => {
      const id = ownProps.match.params.productId;
      dispatch(fetchSingleProduct(id));
    },
    handleClick: (id) => {
      dispatch(postToCart(id));
    }
  }
)

const mapState = function (state) {
  return {
    singleProduct: state.singleProduct
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);

