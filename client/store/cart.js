import axios from 'axios';

//action types
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

//action creators
const getCart = cart => ({
  type: GET_CART,
  cart
});



//get single cart thunk
export const fetchSingleCart = (id) => dispatch =>
  axios.get(`/api/cart/${id}`)
  .then(res => res.data)
  .then(cart => {
    const action = getCart(cart);
    dispatch(action);
  })
  .catch(err => console.log(err));

//reducer
const singleCart = [];

export default function(state = singleCart, action){
  switch (action.type){
    case GET_CART:
      return action.cart;
    default: return state;
  }
}
