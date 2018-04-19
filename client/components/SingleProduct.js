import React, {Component} from 'react';
import axios from 'axios';
import store from '../store';
import {fetchSingleProduct} from '../store/singleProduct';
import {connect} from 'react-redux';

export class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
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
    }
  }
)

const mapState = function (state) {
  return {
    singleProduct: state.singleProduct
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);

