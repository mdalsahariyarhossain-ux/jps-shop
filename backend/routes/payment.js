const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
paypal.configure({ mode: 'sandbox', client_id: process.env.PAYPAL_CLIENT_ID, client_secret: process.env.PAYPAL_CLIENT_SECRET });
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/stripe/create-payment-intent', auth, async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({ amount, currency: 'usd' });
  res.json({ clientSecret: paymentIntent.client_secret });
});

router.post('/paypal/create-payment', auth, (req, res) => {
  const { amount } = req.body;
  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    redirect_urls: { return_url: 'http://localhost:3000/success', cancel_url: 'http://localhost:3000/cancel' },
    transactions: [{ amount: { currency: 'USD', total: (amount / 100).toString() } }]
  };
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) res.status(500).json(error);
    else res.json({ approval_url: payment.links.find(link => link.rel === 'approval_url').href });
  });
});

module.exports = router;