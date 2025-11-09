const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/products', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

module.exports = router;