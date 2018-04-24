import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import FilterSearchBar from './FilterSearchBar'
import { Menu, Container, Icon } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <Menu>
    <Menu.Item link to="/products">We Sell Stuff</Menu.Item>
    <FilterSearchBar />
      {isLoggedIn ? (
        <Menu.Menu position='right'>
          {/* The navbar will show these links after you log in */}
          <Menu.Item link to="/home">Home</Menu.Item>
          <Menu.Item link to="/orders">My past orders</Menu.Item>
          <Menu.Item link to="#" onClick={handleClick}>Logout</Menu.Item>
          <Menu.Item link to="/cart"><Icon name="shop" /></Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position='right'>
          {/* The navbar will show these links before you log in */}
          <Menu.Item link to="/login">Login</Menu.Item>
          <Menu.Item link to="/signup">Sign Up</Menu.Item>
          <Menu.Item link to="/cart"><Icon name="shop" /></Menu.Item>
        </Menu.Menu>
      )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
