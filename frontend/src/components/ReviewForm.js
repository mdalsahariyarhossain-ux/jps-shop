import React, { useState } from 'react';
import { TextField, Button, Box, Rating, Typography } from '@mui/material';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, { rating, comment });
    alert('Review submitted!');
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6">Add a Review</Typography>
      <form onSubmit={handleSubmit}>
        <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
        <TextField fullWidth label="Comment" multiline rows={4} value={comment} onChange={(e) => setComment(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained">Submit Review</Button>
      </form>
    </Box>
  );
};

export default ReviewForm;