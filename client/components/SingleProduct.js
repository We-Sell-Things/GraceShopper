import React, {Component} from 'react';
import { postToCart } from '../store';
import {fetchSingleProduct} from '../store/singleProduct';
import {connect} from 'react-redux';
import { Grid, Image, Icon, Button, Container } from 'semantic-ui-react';
import Reviews from './Reviews';

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
          <h5>Quantity in stock: { product.quantity }</h5>
          <h5>Price: { product.showPrice }</h5>
          <Button animated='fade' color="green" onClick={() => handleClick(product.id) }>
          <Button.Content visible>Add to Cart</Button.Content>
          <Button.Content hidden>
            <Icon name='shop' />
          </Button.Content>
        </Button>
        </div>
        <h3>Reviews of this product:</h3>
        <Reviews reviews={product.reviews} />
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

