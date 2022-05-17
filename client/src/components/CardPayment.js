import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

import './Card.css';
import { paymentSuccess } from '../redux/actions';

const CardPayment = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [amount, setAmount] = useState(1);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }
    // sending post req to the server
    const response = await axios({
      method: 'post',
      url: '/api/createpayment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        paymentMethodType: 'card',
        currency: 'usd',
        amount: amount*100,
      }
    });

    const { clientSecret } = response.data;

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        }
      }
    )
    if(stripeError) {
      console.log(stripeError.message)
      return;
    }
    console.log(paymentIntent);
    if(paymentIntent.status === 'succeeded') {
      props.paymentSuccess(amount);

      navigate('/success');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Enter Payment Details</h2>
      <form onSubmit={handleSubmit} className='card'>
        <label htmlFor='card-element'>Card Number</label>
        <CardNumberElement id='card-element' className='content' />
        <label htmlFor='card-expiry'>Card Expiry Date</label>
        <CardExpiryElement id='card-expiry' className='content'/>
        <label htmlFor='card-cvc'>Card CVC</label>
        <CardCvcElement id='card-cvc' className='content'/>
        <label htmlFor='amount'>Enter amount</label>
        <input 
          id='amount'
          value={amount}
          type='number'
          required
          min='1'
          className='content'
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
        <div className='actions'>
          <button>Make Payment</button>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { paymentSuccess })(CardPayment);
