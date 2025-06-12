import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const shippingCost = 20.0;
  const taxRate = 0.06;
  const discount = 6.0;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart?user_id=1");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération du panier");
        const data = await response.json();

        const cleanedData = data.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        }));

        setCartItems(cleanedData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const removeItem = async (id) => {
    if (
      !window.confirm("Voulez-vous vraiment supprimer cet article du panier ?")
    )
      return;
    try {
      await fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax - discount;

  const handleCheckout = () => {
    alert("Proceeding to checkout");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, marginTop: "100px", pb: { xs: 10, md: 8 } }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Your Bag
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Typography>Loading cart...</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Left: Items */}
          <Grid item xs={12} lg={9}>
            {cartItems.length === 0 ? (
              <Typography align="center" sx={{ py: 5 }}>
                Your cart is empty
              </Typography>
            ) : (
              cartItems.map((item) => (
                <Box
                  width={582}
                  key={item.id}
                  elevation={2}
                  sx={{
                    display: "flex",
                    p: 2,
                    mb: 3,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "165px" },
                      height: "165px",
                      borderRadius: 2,
                      bgcolor: "#f5f5f5",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        item.image_url ||
                        "https://grieving-tonie-x-jonica-0a1c8b87.koyeb.app/uploads/default.png"
                      }
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1, pl: { sm: 3 }, pt: { xs: 2, sm: 0 } }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        fontSize={20}
                        fontWeight={700}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize={18}
                        fontWeight={500}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Typography variant="body2" mt={1}>
                      {item.description}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={3} gap={2}>
                      <Box
                        sx={{
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          px: 2,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          marginTop: "25px",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography fontWeight={700}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="text"
                        sx={{
                          textTransform: "none",
                          marginTop: "25px",
                          color: "#000",
                          textDecoration: "underline",
                          fontWeight: "bold",
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Grid>

          {/* Right: Summary */}
          <Grid item width={460} height={509}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, lg: 4 },
                borderRadius: 3,
                position: { lg: "sticky" },
                top: { lg: 32 },
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Summary
              </Typography>

              <Box my={3}>
                <Box display="flex" justifyContent="space-between" my={1}>
                  <Typography fontSize={20} fontWeight={500}>
                    Subtotal
                  </Typography>
                  <Typography fontSize={18} fontWeight={500}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                  <Typography fontSize={20} fontWeight={500}>
                    Shipping
                  </Typography>
                  <Typography fontSize={18} fontWeight={500}>
                    ${shippingCost.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                  <Typography fontSize={20} fontWeight={500}>
                    Tax
                  </Typography>
                  <Typography fontSize={18} fontWeight={500}>
                    ${tax.toFixed(2)}
                  </Typography>
                </Box>
                {discount > 0 && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    my={1}
                    color="green"
                  >
                    <Typography fontSize={20} fontWeight={500}>
                      Discount
                    </Typography>
                    <Typography fontSize={18} fontWeight={500}>
                      -${discount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                sx={{
                  backgroundColor: "#201B21",
                  "&:hover": { backgroundColor: "#333" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Checkout →
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Footer fixe en bas uniquement en vue mobile */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "#fff",
            borderTop: "1px solid #ccc",
            p: 2,
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Typography fontWeight={700}>Total: ${total.toFixed(2)}</Typography>
          <Button
            variant="contained"
            onClick={handleCheckout}
            sx={{
              backgroundColor: "#201B21",
              "&:hover": { backgroundColor: "#333" },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
}
