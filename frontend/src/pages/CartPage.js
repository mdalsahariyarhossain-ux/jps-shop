import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Grid, Card, CardContent, IconButton, Divider } from "@mui/material";
import { removeFromCart, clearCart, changeQty } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(changeQty({ id, qty }));
  };

  return (
    <Box sx={{ mt: 6, px: { xs: 2, sm: 4, md: 8 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#1E3A8A' }}
      >
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#475569', mt: 6 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {items.map(item => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 5,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 8 }
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 120, height: 120, objectFit: "contain", borderRadius: '12px' }}
                />
                <CardContent sx={{ flex: 1, ml: 3 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color: '#1E40AF', fontWeight: 'bold' }}>
                    ${item.price.toFixed(2)}
                  </Typography>

                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <IconButton
                      onClick={() => handleQtyChange(item.id, item.qty - 1)}
                      size="small"
                    >
                      <FaMinus />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.qty}</Typography>
                    <IconButton
                      onClick={() => handleQtyChange(item.id, item.qty + 1)}
                      size="small"
                    >
                      <FaPlus />
                    </IconButton>
                  </Box>
                </CardContent>
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <FaTrash />
                </IconButton>
              </Card>
            </Grid>
          ))}

          {/* Order Summary */}
          <Grid item xs={12}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="h6"
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                Total:
                <span>${total.toFixed(2)}</span>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1, fontWeight: 'bold', py: 1.5 }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ flex: 1, fontWeight: 'bold', py: 1.5 }}
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
