import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from '../redux/actions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survey New</h2>

function App(props) {

  const { fetchUser } = props;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/surveys" element={<Dashboard />} />
        <Route path="/surveys/new" element={<SurveyNew />} />
      </Routes>
    </div>
  );
}



export default connect(null, { fetchUser })(App);
