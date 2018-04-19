import axios from 'axios';

//action types
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
//forth when we want to remove cart all together

//action creators
const getCart = cart => ({
  type: GET_CART,
  cart
});

const addToCart = product => ({
  type: ADD_TO_CART,
  product
});

const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
});

//get single cart thunk
export const fetchSingleCart = () => dispatch =>
  axios.get('/api/cart/')
  .then(res => res.data)
  .then(cart => {
    const action = getCart(cart);
    dispatch(action);
  })
  .catch(err => console.log(err));

//add to cart thunk
export const postToCart = (productId) => dispatch =>
  axios.post('/api/cart/', {productId})
  .then(res => res.data)
  .then(productId => {
    const action = addToCart(productId)
    dispatch(action);
  })
  .catch(err => console.log(err));

//remove from cart thunk
export const deleteFromCart = (productId) => dispatch =>
  axios.delete('/api/cart/')
  .then(() => {
    const action = removeFromCart(productId);
    dispatch(action);
  })
  .catch(err => console.log(err));

//reducer
const defaultCart = [];

export default function(state = defaultCart, action){
  switch (action.type){
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return state.filter(product => product !== action.product)
    default: return state;
  }
}
