import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me, fetchProducts, fetchSingleCart, fetchCategories} from './store'
import {Login, Signup, UserHome, Products, Checkout} from './components'
import SingleProduct from './components/SingleProduct';
import SingleCategory from './components/SingleCategory';
import Cart from './components/cart'
import Orders from './components/Orders'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/shoppingCart" component={ Cart } />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/categories/:categoryId" component={SingleCategory} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/checkout" component={Checkout} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/orders" component={Orders} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={ Products } />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
      dispatch(fetchSingleCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
