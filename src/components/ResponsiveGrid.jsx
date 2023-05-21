import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImgMediaCard from "./ImgMediaCard";
import { Container } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const { data, isLoading, error } = useQuery("repoDtata", () => {
    return axios.get("https://fakestoreapi.com/products");
  });
  if (isLoading) return "Loading...";
  return (
    <Container style={{ paddingTop: 50 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.data.map((e, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ImgMediaCard itemData={e}></ImgMediaCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
