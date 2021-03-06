import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {deleteFromCart, postToCart} from '../store/cart'
import {Grid, Image, Icon} from 'semantic-ui-react'

export class Cart extends Component {


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
      { productsInCart.length
      ? <div><Grid centered columns={3} style={{margin: '30px'}}>
        { //if products has length, start the map
          // map over each product in store creating a div box
          productsInCart.map(product => {
            return (
              <Grid.Column as="a" key={ product.id } >
                <div>
                  <h3><a href={`/products/${product.id}`}>{ product.title }</a></h3>
                  <Image src={ product.imgUrl } />
                  <div>
                    <h5 color="green">{ product.showPrice }</h5>
                    <h5>Quantity: {product.quantity}</h5>
                    <button onClick={() => handleAdd(product.id)}>Add</button>
                    { product.quantity > 0 ? <button onClick={() => handleSubtract(product.id)}>Subtract</button> : <h3>Item deleted</h3>}
                  </div>
                </div>
              </Grid.Column>
            )
          })


        }

        </Grid>
        <center><h2>Subtotal: ${total} </h2>
        <h3><Link to={'/cart/checkout'}>Checkout</Link></h3>
        </center></div>

      : <div><h4>There are no products in the Cart!</h4>
      <center><h2>Subtotal: ${total} </h2></center></div>

      }

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

export default connect(mapState, mapDispatch)(Cart);
