import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Orders = ({order}) => {
  return (
    <div>
    <h1>Order History:</h1>
      {
        order.map(singleOrder => (
          <Link to={`/orders/${singleOrder.id}`} key={singleOrder.id}>
          <p>
          <span>Order Number: {singleOrder.id} Total: ${singleOrder.subtotal}</span>
          </p>
          </Link>
        ))
      }
    </div>
  );
}

const mapState = state => {
  return {
    order: state.order
  }
}

export default connect(mapState, null)(Orders)

/**
 * PROP TYPES
 */
Orders.propTypes = {
  order: PropTypes.array.isRequired
}
