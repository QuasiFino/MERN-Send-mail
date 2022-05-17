const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/paymentsuccess', requireLogin, async(req, res) => {
      req.user.credits += Number(req.body.amount);
      const user = await req.user.save();

      res.send(user);
    });

    app.post('/api/createpayment', requireLogin, async(req, res) => {
      const { paymentMethodType, currency, amount } = req.body;
      try{
        const paymentIntent = await stripe.paymentIntents.create({
          description: 'Software development services',
          shipping: {
            name: 'Jenny Rosen',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
          },
          amount: amount, 
          currency: currency,
          payment_method_types: [paymentMethodType], 
        });

        const customer = await stripe.customers.create({
          name: 'Jenny Rosen',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        });
        res.json({ clientSecret: paymentIntent.client_secret, customer: customer });
      } catch(err) {
        res.status(400).json({ error: { message: err.message } });
      }
    });
}
