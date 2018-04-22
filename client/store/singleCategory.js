import axios from 'axios';
import history from '../history';

//action type
const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY';

//action creator
const getSingleCategory = category => ({
  type: GET_SINGLE_CATEGORY,
  category
});

//thunk to get a single category
export const fetchSingleCategory = (id) =>
dispatch =>
  axios.get(`/api/categories/${id}`)
  .then(res => res.data)
  .then(category => {
    const action = getSingleCategory(category);
    dispatch(action);
  })
  .catch(err => console.log(err));

//default state
const singleCategory = {};

//reducer
export default function(state = singleCategory, action) {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return action.category;
    default: return state;
  }
}
