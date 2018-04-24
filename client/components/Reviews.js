import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const Reviews = (props) => {
  console.log('PROPS: ', props)
  return (
    <h4>There are no reviews for this product</h4>
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
  }
}

export default connect(mapState, mapDispatch)(Reviews)

/**
 * PROP TYPES
 */
Reviews.propTypes = {
  products: PropTypes.array.isRequired
}
