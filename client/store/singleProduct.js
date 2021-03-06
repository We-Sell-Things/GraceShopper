import axios from 'axios';
import history from '../history';


const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';


const singleProduct = {};

export const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const fetchSingleProduct = (id) =>
  dispatch =>
    axios.get(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => {
        const action = getSingleProduct(product);
        dispatch(action);
      })
      .catch(err => console.log(err));


export default function (state = singleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product

    default:
      return state
  }
}
