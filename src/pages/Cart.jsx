import React, { useContext } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Container, IconButton } from "@mui/material";
import { AuthContext } from "../AuthContext/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
function Cart() {
  const { isAuth } = useContext(AuthContext);
  const [data, setData] = React.useState({
    address: "",
    status: "initial",
  });

  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    cart.map((e) => (total = total + e.price * e.count));

    return total.toFixed(2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const orders = localStorage.getItem("orders");
    if (orders) {
      const newOrders = [
        ...JSON.parse(orders),
        { user: isAuth, order: cart, address: data.address },
      ];

      localStorage.setItem("orders", JSON.stringify(newOrders));
    } else {
      localStorage.setItem(
        "orders",
        JSON.stringify([{ user: isAuth, order: cart, address: data.address }])
      );
    }
    setData({ address: "", status: "sent" });
  };
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const addOne = (id) => {
    dispatch({ type: "ADD_ONE", payload: id });
  };
  const removeOne = (id) => {
    dispatch({ type: "REMOVE_ONE", payload: id });
  };

  return (
    <Container style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h1>Total price {totalPrice()}</h1>
      {cart?.map((e, i) => (
        <div className="cartItem" key={i}>
          <h3>{i}</h3>
          <img src={e?.image} style={{ height: 50 }} />
          <div className="title">{e?.title}</div>
          <div className="price">{e?.price}$</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton onClick={() => removeOne(e.id)}>
              <RemoveIcon />
            </IconButton>
            <div>x{e.count && e.count}</div>
            <IconButton onClick={() => addOne(e.id)}>
              <AddIcon />
            </IconButton>
          </div>

          <Button onClick={() => handleRemove(e.id)}>remove</Button>
        </div>
      ))}
      <form id="demo" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel
            sx={(theme) => ({
              "--FormLabel-color": "theme.vars.palette.primary.plainColor,",
            })}
          >
            Make order
          </FormLabel>
          <Input
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            placeholder="Your address"
            type="text"
            required
            value={data.address}
            onChange={(event) =>
              setData({ address: event.target.value, status: "initial" })
            }
            error={data.status === "failure"}
            endDecorator={
              <Button
                variant="solid"
                color="primary"
                loading={data.status === "loading"}
                type="submit"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Order
              </Button>
            }
          />
          {data.status === "failure" && (
            <FormHelperText sx={(theme) => ({ color: "red" })}>
              Oops! something went wrong, please try again later.
            </FormHelperText>
          )}

          {data.status === "sent" && (
            <FormHelperText sx={(theme) => ({ color: "green" })}>
              You are all set!
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Container>
  );
}

export default Cart;
