import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => navigate('/admin/products')}>
        Manage Products
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/admin/orders')}>
        Manage Orders
      </Button>
    </Box>
  );
};

export default AdminPanel;
