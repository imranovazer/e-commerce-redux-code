import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImgMediaCard from "./ImgMediaCard";
import { Container } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";

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
      <Box>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            rowGap: 20,
            justifyContent: "space-around",
          }}
        >
          {data.data.map((e, index) => (
            // <Grid item xs={2} sm={4} md={4} key={index}>
            //   <ImgMediaCard itemData={e}></ImgMediaCard>
            // </Grid>
            <ImgMediaCard key={index} itemData={e} />
          ))}
        </div>
      </Box>
    </Container>
  );
}
