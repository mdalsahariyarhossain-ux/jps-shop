// @route   GET /api/products?search=keyword
// @desc    Search products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
