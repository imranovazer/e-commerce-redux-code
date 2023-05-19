import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

export default function Register() {
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
          placeholder="Name"
          required
          sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)", width: 300 }}
        />

        <Input
          placeholder="Email"
          required
          sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)", width: 300 }}
        />
        <Input placeholder="Password" type="password" sx={{ mb: 2 }} />
        <Input placeholder="Confirm password" type="password" sx={{ mb: 2 }} />
        <Button type="submit">Register</Button>
      </form>
    </Box>
  );
}
