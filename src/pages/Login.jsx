import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

export default function Login() {
  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          placeholder="Email"
          required
          sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)", width: 300 }}
        />
        <Input placeholder="password" type="password" sx={{ mb: 2 }} />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
}
