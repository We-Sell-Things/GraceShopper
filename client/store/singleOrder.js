import axios from 'axios';

//action type
const GET_ORDER = 'GET_ORDER';

//action creator
const getOrder = order => ({
  type: GET_ORDER,
  order
});

//thunk
export const fetchSingleOrder = (id) => dispatch =>
  axios.get(`/api/orders/${id}`)
  .then(res => res.data)
  .then(order => {
    const action = getOrder(order);
    dispatch(action);
  })
  .catch(err => console.log(err));

//reducer
const order = {};

export default function (state = order, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default: return state;
  }
}
