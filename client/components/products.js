import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { Grid, Image, Icon, Button, Container } from 'semantic-ui-react'
import { postToCart } from '../store'

const Products = ({ products, handleAdd }) => {
  console.log('hereee');
  return (
    <div style={{marginLeft: '10vw'}}>
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
                <Grid columns={2} justify-content="space-between">
                  <Grid.Column>
                    <h5 color="green">{ product.showPrice }</h5>
                  </Grid.Column>
                  <Grid.Column>
                    <Button animated='fade' color="green" onClick={() => handleAdd(product.id) }>
                      <Button.Content visible>Add to Cart</Button.Content>
                      <Button.Content hidden>
                        <Icon name='shop' />
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                </Grid>
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
