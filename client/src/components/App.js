import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../redux/actions';
import Header from './Header';
import Landing from './Landing';
import CardPayment from './CardPayment';
import Success from './Success';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

function App(props) {

  const { fetchUser } = props;

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div >
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/surveys" element={<Dashboard />} />
          <Route path="/surveys/new" element={<SurveyNew />} />
          <Route path='/payments' element={<CardPayment />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </div>
    </div>
  );
}

export default connect(null, { fetchUser })(App);
