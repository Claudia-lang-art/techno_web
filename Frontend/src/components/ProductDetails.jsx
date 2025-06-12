import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // on enregistre tous les produits dans le state
  
        const index = data.findIndex((p) => p.id === parseInt(id));
        if (index !== -1) {
          setCurrentIndex(index);
          setProduct(data[index]);
        }
        console.log(data); // on affiche les données récupérées, pas le state
      })
      .catch((error) => {
        console.error("Erreur lors du fetch des produits :", error);
      });
  }, [id]);
  

  const handleQuantityChange = (type) => {
    if (type === "inc" && product.stock && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added to cart: ${product.category}, Quantity: ${quantity}`);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
    navigate(`/product/${products[newIndex].id}`);
  };

  const handleNext = () => {
    const newIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;
    navigate(`/product/${products[newIndex].id}`);
  };

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>Loading product...</Typography>
      </Box>
    );
  }

  // Mobile View
  if (isMobile) {
    return (
      <Box maxWidth="lg" mt={10} mx="auto" p={2}>
        {/* Product Image */}
        <Box
          width="100%"
          height={300}
          borderRadius="20px"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#f8f8f8"
        >
          <img
            src={product.image_url || "http://localhost:4000/uploads/img_4.png"}
            alt={product.description}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </Box>

        {/* Navigation Dots and Arrows */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          px={1}
        >
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{ p: 1 }}
          >
            <ArrowBackIosNewIcon
              sx={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            />
          </IconButton>

          <Box display="flex" gap={1}>
            {products.map((_, index) => (
              <FiberManualRecordIcon
                key={index}
                sx={{
                  fontSize: 8,
                  color: index === currentIndex ? "#201B21" : "#E9EBEE",
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={currentIndex === products.length - 1}
            sx={{ p: 1 }}
          >
            <ArrowForwardIosIcon
              sx={{ opacity: currentIndex === products.length - 1 ? 0.5 : 1 }}
            />
          </IconButton>
        </Box>

        {/* Product Info */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 3,
            bgcolor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            fontWeight={700}
            fontSize="1.25rem"
            color="#201B21"
            mb={0.5}
          >
            {product.name}
          </Typography>
          <Typography fontSize="1.125rem" color="#67696E" mb={2}>
            {product.description}
          </Typography>
          <Typography fontWeight={500} fontSize="1.25rem" mb={3}>
            ${product.price}
          </Typography>

          <Divider sx={{ borderColor: "#E9EBEE", my: 2 }} />

          {/* Quantity Selector */}
          <Box mb={3}>
            <Typography fontWeight={500} mb={1}>
              Quantity
            </Typography>
            <Box
              display="flex"
              width={120}
              height={40}
              border="1px solid #E9EBEE"
              borderRadius="10px"
              alignItems="center"
            >
              <Button
                onClick={() => handleQuantityChange("dec")}
                disabled={quantity <= 1}
                sx={{
                  minWidth: 0,
                  px: 1.5,
                  py: 1,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
              >
                -
              </Button>
              <Typography flex={1} textAlign="center" fontWeight={700}>
                {quantity}
              </Typography>
              <Button
                onClick={() => handleQuantityChange("inc")}
                disabled={quantity >= product.stock}
                sx={{
                  minWidth: 0,
                  px: 1.5,
                  py: 1,
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
              >
                +
              </Button>
            </Box>
            {product.stock && (
              <Typography variant="caption" color="#67696E" mt={0.5}>
                {product.stock} available
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 50,
              borderRadius: "10px",
              bgcolor: "#201B21",
              color: "white",
              fontWeight: 700,
              "&:hover": { bgcolor: "#000000" },
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Paper>

        {/* category */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 3,
            bgcolor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography fontWeight={700} fontSize="1.125rem" mb={2}>
            category
          </Typography>
          <Divider sx={{ borderColor: "#E9EBEE", mb: 2 }} />
          <Typography color="#67696E">
            {product.category || "No category available"}
          </Typography>

          <Box component="ul" mt={2} pl={3} color="#67696E">
            <li>Regular fit</li>
            <li>Lace closure</li>
            <li>Rubber outside with vulcanized look</li>
            <li>Imported</li>
          </Box>
        </Paper>

        {/* Additional Image */}
        {product.autre_url && (
          <Box
            mt={3}
            width="100%"
            height={250}
            borderRadius="20px"
            overflow="hidden"
          >
            <img
              src={product.autre_url}
              alt={product.description}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                mixBlendMode: "darken",
              }}
            />
          </Box>
        )}
      </Box>
    );
  }

  // Desktop View
  return (
    <Box maxWidth={1200} mx="auto" mt={10} p={{ xs: 2, md: 4 }}>
      {/* Main Product Section */}
      <Box display="flex" gap={4} mb={6}>
        {/* Product Image and Navigation */}
        <Box
          width={546}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            width={546}
            height={375}
            borderRadius="20px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f8f8f8"
          >
            <img
              src={
                product.image_url || "http://localhost:4000/uploads/img_4.png"
              }
              alt={product.description}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Box>

          {/* Navigation */}
          <Box
            width={500}
            height={40}
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              sx={{ p: 1 }}
            >
              <ArrowBackIosNewIcon
                sx={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
              />
            </IconButton>

            <Box display="flex" gap={1}>
              {products.map((_, index) => (
                <FiberManualRecordIcon
                  key={index}
                  sx={{
                    fontSize: 8,
                    color: index === currentIndex ? "#201B21" : "#E9EBEE",
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={currentIndex === products.length - 1}
              sx={{ p: 1 }}
            >
              <ArrowForwardIosIcon
                sx={{ opacity: currentIndex === products.length - 1 ? 0.5 : 1 }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Product Info */}
        <Paper
          elevation={0}
          sx={{
            width: 528,
            height: 443,
            p: 4,
            bgcolor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4.44px 66.67px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box px={3}>
            <Typography
              fontWeight={700}
              fontSize="1.5rem"
              lineHeight="32px"
              color="#201B21"
              mb={0.5}
            >
              {product.name}
            </Typography>
            <Typography
              fontSize="1.25rem"
              fontWeight={400}
              lineHeight="24px"
              color="#67696E"
              mb={2}
            >
              {product.description}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize="1.5rem"
              lineHeight="24px"
              mb={4}
            >
              ${product.price}
            </Typography>

            <Divider sx={{ borderColor: "#E9EBEE", mb: 4 }} />

            {/* Quantity Selector */}
            <Box mb={6}>
              <Typography fontWeight={500} mb={1} mt={2}>
                Quantity
              </Typography>
              <Box
                display="flex"
                width={136}
                height={48}
                border="1px solid #E9EBEE"
                borderRadius="10px"
                alignItems="center"
              >
                <Button
                  onClick={() => handleQuantityChange("dec")}
                  disabled={quantity <= 1}
                  sx={{
                    minWidth: 0,
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "#201B21",
                  }}
                >
                  -
                </Button>
                <Typography
                  flex={1}
                  textAlign="center"
                  fontWeight={700}
                  fontSize="1.125rem"
                  color="#201B21"
                >
                  {quantity}
                </Typography>
                <Button
                  onClick={() => handleQuantityChange("inc")}
                  disabled={quantity >= product.stock}
                  sx={{
                    minWidth: 0,
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "#201B21",
                  }}
                >
                  +
                </Button>
              </Box>
              {product.stock && (
                <Typography variant="caption" color="#67696E" mt={0.5}>
                  {product.stock} available
                </Typography>
              )}
            </Box>

            {/* Add to Cart Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: 60,
                borderRadius: "10px",
                bgcolor: "#201B21",
                color: "white",
                fontWeight: 700,
                fontSize: "1.125rem",
                lineHeight: "20px",
                py: "20px",
                "&:hover": { bgcolor: "#000000" },
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* category Section */}
      <Box display="flex" gap={4}>
        <Box
          elevation={0}
          sx={{
            flex: 1,
            p: 4,
            bgcolor: "white",
            borderRadius: "20px",
          }}
        >
          <Typography fontWeight={700} fontSize="1.25rem" mb={2}>
            Description
          </Typography>
          <Divider sx={{ borderColor: "#E9EBEE", mb: 3 }} />
          <Typography
            width={482}
            fontWeight={400}
            fontSize="1.125rem"
            lineHeight="24px"
            color="#67696E"
            mb={3}
          >
            {product.category || "No category available"}
          </Typography>

          <Box component="ul" pl={3} color="#67696E">
            <Box component="li" fontSize="1.125rem" mb={1}>
              Regular fit
            </Box>
            <Box component="li" fontSize="1.125rem" mb={1}>
              Lace closure
            </Box>
            <Box component="li" fontSize="1.125rem" mb={1}>
              Rubber outside with vulcanized look
            </Box>
            <Box component="li" fontSize="1.125rem">
              Imported
            </Box>
          </Box>
        </Box>

        {/* Additional Image */}
        {product.autre_url && (
          <Box
            width={546}
            height={375}
            borderRadius="20px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={product.autre_url || "image non trouve"}
              alt={product.description}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                mixBlendMode: "darken",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
