import React, {Component} from 'react';
import axios from 'axios';
import store from '../store'
import {fetchSingleProduct} from '../store/singleProduct'
// OB: commented out code should never make it master
// import { connect } from 'tls';
import {connect} from 'react-redux';


export class SingleProduct extends Component {


  componentDidMount() {
    this.props.fetchData();
  }



  // console.log(props)
  // const productId = +props.match.params.productId;




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
  // OB: consider having no redundant data, and finding product using the match params id and the all products state (no separate single product state)
  return {
    singleProduct: state.singleProduct
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);

