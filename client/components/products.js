import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
// import {logout} from '../store'

const Products = ({ products }) => {
  return (
    <div>
    { products.length
    ? <div>
      { //if products has length, start the map
        // map over each product in store creating a div box
        products.map(product => {
          return (
            <div key={ product.id }>
            <NavLink to={`/products/${product.id}`}>
              <div>
                <h3>{ product.title }</h3>
                <h5>{ product.showPrice }</h5>
              </div>
              <div>
                <img src={ product.imgUrl } />
              </div>
            </NavLink>
            <button>Add to Cart</button>
            </div>
          )
        })
      }
      </div>
    : <h4>There are no products in the database!</h4> //display this message if database is empty
    }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    // handleClick() {
    //   dispatch(logout())
    // }
  }
}

export default connect(mapState, mapDispatch)(Products)

/**
 * PROP TYPES
 */
Products.propTypes = {
  products: PropTypes.array.isRequired
}
