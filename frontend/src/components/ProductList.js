import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { Grid, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
