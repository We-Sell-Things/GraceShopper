import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { Grid, Image, Icon, Button, Container } from 'semantic-ui-react'
import { postToCart } from '../store'

const Products = ({ products, handleAdd }) => {
  return (
    <div>
    { products.length
    ? <Grid columns={3} style={{margin: '30px'}}>
      { //if products has length, start the map
        // map over each product in store creating a div box
        products.map(product => {
          return (
            <Grid.Column key={ product.id } style={{border: '3px blue'}}>
              <div>
                <h3><a href={`/products/${product.id}`}>{ product.title }</a></h3>
                <Image src={ product.imgUrl } />
                <Container>
                  <h5 color="green">{ product.showPrice }</h5>
                  <Button animated='vertical' color="blue" onClick={() => handleAdd(product.id) }>
                    <Button.Content hidden>Add to Cart</Button.Content>
                    <Button.Content visible>
                      <Icon name='shop' />
                    </Button.Content>
                  </Button>
                </Container>
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
    handleAdd: function(productId) {
      console.log(productId)
      dispatch(postToCart(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Products)

/**
 * PROP TYPES
 */
Products.propTypes = {
  products: PropTypes.array.isRequired
}
