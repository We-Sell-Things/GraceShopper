import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const Orders = ({order}) => {
  console.log(order);
  return (
    <ul>
      {
        order.map(singleOrder => (
          <li key={singleOrder.id}>{singleOrder.id}</li>
        ))
      }
    </ul>
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
