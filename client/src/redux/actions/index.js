import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from '../ActionTypes';

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

export const submitSurvey = (values, navigate) => async dispatch => {
  const response = await axios({
    method: 'post',
    url: '/api/surveys',
    data: values
  })
  navigate('/surveys');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchSurveys = () => async dispatch => {
  const response = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: response.data });
};
