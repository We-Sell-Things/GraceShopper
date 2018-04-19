import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import fetchSingleCart from '../store/cart'

export class Cart extends Component {

  ComponentDidMount() {
  this.props.fetchData();
  }



  render() {
    return(
      <div>
      EMPTY SHOPPING CART!
      </div>
    )
  }


}

const mapDispatch = (dispatch) => (
  {
    fetchData: () => {
      dispatch(fetchSingleCart());
    }
  }
)

const mapState = function (state) {
  return {
    products: state.defaultCart
  }
}


export default connect(mapState, mapDispatch)(Cart);
