import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteFromCart, postToCart } from '../store/cart'
import { Grid, Image, Icon } from 'semantic-ui-react'

export class Checkout extends Component {



  render() {
    const productsInCart = [];
    const productIds = Object.keys(this.props.cart);
    const { handleSubtract } = this.props;
    const { handleAdd } = this.props;

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
          <h2>Subtotal: {total} </h2>
          <form>
          <h3>Contact Info: </h3>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Email Address:
    <input type="text" name="email" />
  </label>
  <h3>Address: </h3>
  <label>
    Line 1:
    <input type="text" name="shippingaddress" />
  </label>
  <label>
    City
    <input type="text" name="city" />
  </label>
  <label>
    State: (Initials ie. 'NY')
    <input type="text" name="state" />
  </label>
  <label>
    Country: (Initials ie. 'US')
    <input type="text" name="country" />
  </label>
  <label>
    Postal Code:
    <input type="text" name="code" />
  </label>
  <input type="submit" value="Submit" />
</form>
      </div>
    )
  }
}


const mapDispatch = (dispatch) => (
  {
    handleSubtract: (id) => {
      dispatch(deleteFromCart(id));
    },
    handleAdd: (id) => {
      dispatch(postToCart(id));
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
