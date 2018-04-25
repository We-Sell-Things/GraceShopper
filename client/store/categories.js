import axios from 'axios';
import history from '../history';

//action types
const GET_CATEGORIES = 'GET_CATEGORIES';

//action creators
export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

//thunk creator to get all the categories
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch(getCategories(categories))
      })
      .catch(err => console.log(err));

//initial state
const initialState = [];

//reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default: return state;
  }
}

