import { Button, Container } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContextProvider";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const handleRemove = (id) => {
    const newCart = [...cart];
    const prodIndex = newCart.findIndex((e) => e.id === id);
    if (prodIndex !== -1) {
      newCart.splice(prodIndex, 1);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Container style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {cart?.map((e, i) => (
        <div className="cartItem" key={i}>
          <h3>{i}</h3>
          <img src={e?.image} style={{ height: 50 }} />
          <div className="title">{e?.title}</div>
          <div className="price">{e?.price}$</div>
          <div>amount : x{e.count && e.count}</div>
          <Button onClick={() => handleRemove(e.id)}>remove</Button>
        </div>
      ))}
    </Container>
  );
}

export default Cart;
