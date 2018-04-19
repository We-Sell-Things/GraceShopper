import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchSingleCart} from '../store/cart'
import {Grid, Image, Icon} from 'semantic-ui-react'
import { postToCart } from '../store'

export class Cart extends Component {

  render() {
    const productsInCart = [];
    console.log("props: ", this.props);
    const productIds = Object.keys(this.props.cart);

    productIds.forEach(id => {
      this.props.products.filter(product => {
        if (+product.id === +id) {
          productsInCart.push(product)
        }
      })
    })

    console.log('Products in cart', productsInCart)

    return (
      <div>
      { productsInCart.length
      ? <Grid centered columns={3} style={{margin: '30px'}}>
        { //if products has length, start the map
          // map over each product in store creating a div box
          productsInCart.map(product => {
            return (
              <Grid.Column as='a' key={ product.id } >
                <div>
                  <h3>{ product.title }</h3>
                  <Image src={ product.imgUrl } />
                  <div>
                    <h5 color="green">{ product.showPrice }</h5>
                  </div>
                </div>
              </Grid.Column>
            )
          })
        }
        </Grid>
      : <h4>There are no products in the Cart!</h4> //display this message if database is empty
      }
      </div>
    )
  }
}


const mapDispatch = (dispatch, ownProps) => (
  {
    // fetchData: () => {
    //   console.log('hi')
    //   dispatch(fetchSingleCart());
    // }
  }
)

const mapState = function (state) {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(Cart);
