import React from 'react';
import './Card.css';

const Success = () => {
  return (
    <div style={{ textAlign: 'center' }} className="success">
      <h1>Congratulations!</h1>
      <br />
      <h2>Payment was successful</h2>
      <br />
      <h3>Your Credits have been updated</h3>
    </div>
  );
}

export default Success;

// yarn add @stripe/react-stripe-js@1.7.0 @stripe/stripe-js@1.22.0