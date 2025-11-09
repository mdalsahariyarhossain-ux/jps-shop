const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const order = new Order({ ...req.body, user: req.user.id });
  await order.save();
  res.status(201).json(order);
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
});

module.exports = router;