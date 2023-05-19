import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartContext } from "../CartContext/CartContextProvider";

export default function ImgMediaCard({ itemData }) {
  const { cart, setCart } = React.useContext(CartContext);
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
    <Card sx={{ maxWidth: 345, minHeight: 500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={itemData.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {itemData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={addToChart}>
          Add to chart
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
