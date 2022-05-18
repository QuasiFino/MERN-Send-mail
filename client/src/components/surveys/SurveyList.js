import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../redux/actions';

const SurveyList = (props) => {

  const renderSurveys = () => {
    return props.surveys.reverse().map(survey => {
      return (
        <div className='row' style={{ marginTop: "30px", color: "white" }} key={survey._id}>
          <div className='col s12 m12 l12'>
            <div className='card teal lighten-1' >
              <div className='card-content'>
                <span className='card-title'>
                  <b>{survey.title}</b>
                </span>
                <p>{survey.body}</p>
                <p className='right'>
                  Sent On: { new Date(survey.dateSent).toLocaleDateString() }
                </p>
              </div>
              <div className='card-action red accent-1'>
                <a style={{ color: "white" }}><b>Yes: {survey.yes}</b></a>
                <a style={{ color: "white" }}><b>No: {survey.no}</b></a>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }

  useEffect(() => {
    props.fetchSurveys();
  }, []);

  return(
    <div>
      {renderSurveys()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys
  }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
