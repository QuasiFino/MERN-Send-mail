import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk'

import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: [ reduxThunk ]
});

// const comReducers = combineReducers({ auth: authReducer });
// const store = createStore(comReducers, {}, applyMiddleware(reduxThunk));

export default store;

