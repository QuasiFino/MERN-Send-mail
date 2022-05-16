import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';

// const store = configureStore({
//   reducers: { auth: authReducer },
//   middleware: [ thunk ]
// });

const comReducers = combineReducers({ auth: authReducer });
const store = createStore(comReducers, {}, applyMiddleware());

export default store;

