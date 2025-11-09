import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const Admin = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Products</Typography>
              <Typography>Add, edit, or delete products</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">View Orders</Typography>
              <Typography>Check customer orders and status</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
