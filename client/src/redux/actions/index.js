import axios from 'axios';
import { FETCH_USER } from '../ActionTypes';

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');

  console.log(response.data);

  dispatch({
    type: FETCH_USER,
    payload: response.data //response user obj
  });
};

export const paymentSuccess = (amount) => async dispatch => {
  const response = await axios({
    method: 'post',
    url: '/api/paymentsuccess',
    data: {
      amount: amount
    }
  });
  dispatch({ type: FETCH_USER, payload: response.data });
}
