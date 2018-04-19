import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { Grid, Image, Icon } from 'semantic-ui-react'

const Products = ({ products }) => {
  return (
    <div>
    { products.length
    ? <Grid centered columns={3} style={{margin: '30px'}}>
      { //if products has length, start the map
        // map over each product in store creating a div box
        products.map(product => {
          return (
            <Grid.Column as='a' href={`/products/${product.id}`} key={ product.id } >
              <div>
                <h3>{ product.title }</h3>
                <Image src={ product.imgUrl } />
                <div>
                  <h5 color="green">{ product.showPrice }</h5>
                  <Icon name="add to cart" />
                </div>
              </div>
            </Grid.Column>
          )
        })
      }
      </Grid>
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
