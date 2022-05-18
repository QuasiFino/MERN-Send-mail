import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import { reducer as reduxForm } from'redux-form';

import authReducer from './reducers/authReducer';
import surveyReducer from './reducers/surveyReducer';

const store = configureStore({
  reducer: { auth: authReducer, surveys: surveyReducer, form: reduxForm },
  middleware: [ reduxThunk ]
});

// const comReducers = combineReducers({ auth: authReducer });
// const store = createStore(comReducers, {}, applyMiddleware(reduxThunk));

export default store;

