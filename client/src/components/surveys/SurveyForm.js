import React from "react";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

const SurveyForm = (props) => {
  const renderFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
    });
  }

  return (
    <div>
      <form
        onSubmit={props.handleSubmit(values => { //handleSubmit by reduxForm
          console.log(values);
          props.onSurveySubmit();
        })}
      >
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );

}
const validate = (values) => { //values - key and value pair of the input
  const errors = {}
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({name}) => {
    if(!values[name]) {
      errors[name] = `You must provide ${name}`
    }
  });
  return errors; //if this is an empty obj, then redux form assumes that there are no errors in the form input
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
