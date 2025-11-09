import React, { useState, useMemo, useEffect } from "react";
import {
  Box, Typography, Button, RadioGroup, FormControlLabel, Radio,
  Divider, TextField, Grid, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions, Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addAddress, setDefaultAddress } from "../store/slices/addressSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51SMEQmEDZKLt8XRnjsuPBnaUyjk3qcw0otLI2V4PW4JAgnGf2zn2wl2TqVrd6hpH6RqZqnbJPILi0N38AwbObjqm00KIf4p1dF");

// ✅ Stripe Checkout
const StripeCheckout = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/stripe/create-payment-intent",
        { amount: Math.round(total * 100) }
      );
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      if (result.error) console.error(result.error.message);
      else console.log("✅ Payment Successful!");
    } catch (error) {
      console.error("❌ Payment Failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
        Pay ₹{total.toFixed(2)}
      </Button>
    </form>
  );
};

// ✅ UPI Payment
const UpiPayment = ({ total }) => {
  const [upiId, setUpiId] = useState("");
  const handlePay = () => {
    if (!upiId) return alert("Enter valid UPI ID");
    alert(`✅ UPI Request sent to ${upiId} for ₹${total}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        placeholder="yourname@upi"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button fullWidth variant="contained" color="success" onClick={handlePay}>
        Pay ₹{total.toFixed(2)} via UPI
      </Button>
    </Box>
  );
};

// ✅ Checkout Main Component
const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items = [] } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const allAddresses = useSelector((state) => state.address.addresses || {});

  const userId = user?.id || "guest";
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "", phone: "", housename: "", street: "",
    city: "", state: "", zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  // ✅ Load addresses from Redux or localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "{}");
    const fromStorage = stored[userId] || [];
    const fromRedux = allAddresses[userId] || [];

    if (fromRedux.length > 0) setAddresses(fromRedux);
    else if (fromStorage.length > 0) setAddresses(fromStorage);
    else setAddresses([]);
  }, [allAddresses, userId]);

  const product = location.state?.product || null;
  const selectedItems = location.state?.selectedItems || null;

  const checkoutItems = (product
    ? [product]
    : selectedItems && selectedItems.length > 0
    ? selectedItems
    : items
  ).map((item) => ({
    ...item,
    qty: item.qty && item.qty > 0 ? item.qty : 1,
  }));

  const total = useMemo(
    () =>
      checkoutItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.qty),
        0
      ),
    [checkoutItems]
  );

  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.housename || !newAddress.street)
      return alert("Please fill all required fields");

    const id = Date.now();
    const updated = [...addresses, { id, ...newAddress }];

    // ✅ Save to Redux and localStorage
    dispatch(addAddress({ userId, address: { id, ...newAddress } }));
    const stored = JSON.parse(localStorage.getItem("addresses") || "{}");
    stored[userId] = updated;
    localStorage.setItem("addresses", JSON.stringify(stored));

    setAddresses(updated);
    setSelectedAddress(id);
    setShowAddAddress(false);
    setNewAddress({
      name: "", phone: "", housename: "", street: "", city: "", state: "", zip: "",
    });
  };

  return (
    <Box sx={{ py: 5, px: 2, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Grid container spacing={3} sx={{ maxWidth: 1300, mx: "auto" }}>
        {/* LEFT SIDE — Order Summary */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              🛒 Order Summary ({checkoutItems.length}{" "}
              {checkoutItems.length === 1 ? "item" : "items"})
            </Typography>

            {checkoutItems.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  boxShadow: 1,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginRight: 16,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: "#333" }}>
                    {item.name || item.title}
                  </Typography>
                  <Typography sx={{ color: "#1976d2", fontWeight: 500 }}>
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.qty}
                  </Typography>
                </Box>
                <Typography fontWeight="bold" color="primary">
                  ₹{(item.price * item.qty).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography textAlign="right" fontWeight="bold">
              Total: ₹{total.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* RIGHT SIDE — Address + Payment */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            {/* 🏠 ADDRESS SECTION */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🏠 Select Delivery Address
              </Typography>

              {addresses.length > 0 ? (
                addresses.map((addr) => (
                  <Box
                    key={addr.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border:
                        selectedAddress === addr.id
                          ? "2px solid #1976d2"
                          : "1px solid #ddd",
                      bgcolor:
                        selectedAddress === addr.id ? "#e3f2fd" : "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedAddress(addr.id);
                      dispatch(setDefaultAddress({ userId, addressId: addr.id }));
                    }}
                  >
                    <Typography fontWeight="bold">{addr.name}</Typography>
                    <Typography>
                      {addr.housename}, {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {addr.phone}
                    </Typography>
                    <Button
                      size="small"
                      variant={selectedAddress === addr.id ? "contained" : "outlined"}
                      sx={{ mt: 1 }}
                    >
                      Deliver Here
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  No saved addresses found.
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowAddAddress(true)}
                sx={{ mt: 1 }}
              >
                + Add New Address
              </Button>
            </Paper>

            {/* 💳 PAYMENT SECTION */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                💳 Select Payment Method
              </Typography>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 3 }}
              >
                <FormControlLabel value="stripe" control={<Radio />} label="Credit / Debit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI (Google Pay / Paytm)" />
              </RadioGroup>

              {paymentMethod === "stripe" && (
                <Elements stripe={stripePromise}>
                  <StripeCheckout total={total} />
                </Elements>
              )}
              {paymentMethod === "paypal" && (
                <PayPalButtons
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [{ amount: { value: (total / 83).toFixed(2) } }],
                    })
                  }
                  onApprove={(data, actions) => actions.order.capture()}
                  onError={(err) => console.error("❌ Payment Failed:", err.message)}
                />
              )}
              {paymentMethod === "upi" && <UpiPayment total={total} />}
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* ➕ ADD NEW ADDRESS MODAL */}
      <Dialog
        open={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {["name", "phone", "housename", "street", "city", "state", "zip"].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              sx={{ mb: 2 }}
              value={newAddress[field]}
              onChange={(e) =>
                setNewAddress({ ...newAddress, [field]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddAddress(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAddress}>
            Save Address
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Checkout;
