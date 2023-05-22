import * as React from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CartContext } from "../CartContext/CartContextProvider";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import { Box } from "@mui/material";

export default function ImgMediaCard({ itemData }) {
  const { cart, setCart } = React.useContext(CartContext);
  const isInCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemData.id);
    return existingItemIndex !== -1 ? true : false;
  };
  const handleRemove = () => {
    const newCart = [...cart];
    const prodIndex = newCart.findIndex((e) => e.id === itemData.id);
    if (prodIndex !== -1) {
      newCart.splice(prodIndex, 1);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const addToChart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemData.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        count: updatedCart[existingItemIndex].count + 1,
      };

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id: itemData.id,
        price: itemData.price,
        title: itemData.title,
        description: itemData.description,
        image: itemData.image,
        count: 1,
      };

      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography
        level="h2"
        fontSize="md"
        sx={{ mb: 0.5 }}
        style={{
          width: 150,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {itemData.title}
      </Typography>
      <Typography level="body2">{itemData.category}</Typography>

      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img src={itemData.image} loading="lazy" alt="" />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${itemData.price}
          </Typography>
        </div>
        {!isInCart() ? (
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={addToChart}
          >
            Add to chart
          </Button>
        ) : (
          <Button
            variant="solid"
            size="sm"
            color="danger"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={handleRemove}
          >
            Delete from chart
          </Button>
        )}
      </Box>
    </Card>
  );
}
