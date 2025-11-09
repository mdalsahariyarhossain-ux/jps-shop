const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  let query = {};
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  const products = await Product.find(query).populate('reviews');
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  res.json(product);
});

router.post('/:id/reviews', require('../middleware/auth'), async (req, res) => {
  const review = new Review({ ...req.body, product: req.params.id, user: req.user.id });
  await review.save();
  res.status(201).json(review);
});

module.exports = router;