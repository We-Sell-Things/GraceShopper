import axios from 'axios';

//action type
const GET_ORDERS = 'GET_ORDERS';

//action creator
const getOrders = orders => ({
  type: GET_ORDERS,
  orders
});

//thunk
export const fetchUserOrders = () => dispatch =>
  axios.get('/api/orders')
  .then(res => res.data)
  .then(orders => {
    const action = getOrders(orders);
    dispatch(action);
  })
  .catch(err => console.log(err));

//reducer
const orders = [];

export default function (state = orders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default: return state;
  }
}
