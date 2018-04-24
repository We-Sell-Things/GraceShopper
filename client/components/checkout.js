import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteFromCart, postToCart, checkout } from '../store/cart'
import { Grid, Image, Icon } from 'semantic-ui-react'
import {Elements} from 'react-stripe-elements';
import InjectedCheckout from './injectedCheckout';



export class Checkout extends Component {



  render() {
    const productsInCart = [];
    const productIds = Object.keys(this.props.cart);
    const { handleSubmit } = this.props;

    let total = 0;

    productIds.forEach(id => {
      this.props.products.filter(product => {
        if (+product.id === +id) {
          product.quantity = this.props.cart[id]
          total += (product.quantity * product.price)
          productsInCart.push(product)
        }
      })
    })



    return (
      <div>
      <h1>Check Out</h1>
{ //if products has length, start the map
  // map over each product in store creating a div box
  productsInCart.map(product => {
    return (
      <ul key={product.id} >
        <div>
          <h3>{product.title}</h3>
          <div>
            <h5 color="green">{product.showPrice}</h5>
            <h5>Quantity: {product.quantity}</h5>
          </div>
        </div>
      </ul>
    )
  })
}
<h2>Subtotal: ${total} </h2>
      <Elements>
    <InjectedCheckout />
      </Elements>
      </div>
    )
  }
}


const mapDispatch = (dispatch) => (
  {
    handleSubmit: (event) => {
      event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const address = event.target.address.value;
      dispatch(checkout({name, email, address}));
    }
  }
)

const mapState = function (state) {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(Checkout);
