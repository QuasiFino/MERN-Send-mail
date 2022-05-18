import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../redux/actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const navigate = useNavigate();

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className='teal btn-flat right white-text'
        onClick={() => submitSurvey(formValues, navigate)}
      >
        Send Survey
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
