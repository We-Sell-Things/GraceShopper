import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProduct from './singleProduct'
import cart from './cart'
import categories from './categories'
import singleCategory from './singleCategory'

const reducer = combineReducers({user, products, singleProduct, cart, categories, singleCategory})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store;

// export all from each store component
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './cart'
export * from './categories'
export * from './singleCategory'
