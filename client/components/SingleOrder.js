import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder} from '../store'
import {Grid, Image} from 'semantic-ui-react'



export class SingleOrder extends Component {

  componentDidMount() {
    this.props.fetchData();
  }
render() {
  const order = this.props.order;
  const productsInOrder = [];

  const productIds = order.productIdAndQuantity && Object.keys(order.productIdAndQuantity);

  productIds && productIds.forEach(id => {
    this.props.products.filter(product => {
      if (+product.id === +id) {
        productsInOrder.push(product)
      }
    })
  })
  return (
    <div>
    <h1>Products Ordered</h1>
    {  <div><Grid centered columns={3} style={{margin: '30px'}}>
      { //if products has length, start the map
        // map over each product in store creating a div box

        productsInOrder.map(product => {
          return (
            <Grid.Column as="a" key={ product.id } >
              <div>
                <h3><a href={`/products/${product.id}`}>{ product.title }</a></h3>
                <Image src={ product.imgUrl } />
                <div>
                  <h5 color="green">Item Price: { product.showPrice }</h5>
                </div>
              </div>
            </Grid.Column>
          )
        })


      }

      </Grid>


     </div>
    }
    <h3>Order Total: ${order.subtotal}</h3>
    <h3>Products Ordered on: {order.createdAt}</h3>

    </div>
  );
}
}

const mapState = state => {
  return {
    order: state.singleOrder,
    products: state.products
  }
}

const mapDispatch = (dispatch, ownProps) => (
  {
    fetchData: () => {
      const id = +ownProps.match.params.id;
      dispatch(fetchSingleOrder(id));
    }
  }
)


export default connect(mapState, mapDispatch)(SingleOrder)

/**
 * PROP TYPES
 */
SingleOrder.propTypes = {
  order: PropTypes.object.isRequired
}
