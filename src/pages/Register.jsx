import * as React from "react";
import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { AuthContext } from "../AuthContext/AuthProvider";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "At least 8 symols")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password should contain capital letter and number"
    ),
});
export default function Register() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") === "True") {
      navigate("/Products");
    }
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                const userId = Math.floor(Math.random * 100);
                const newUser = { ...values, userId };
                if (localStorage.getItem("users")) {
                  const localStorageData = JSON.parse(
                    localStorage.getItem("users")
                  );
                  const newLocastorageData = JSON.stringify([
                    ...localStorageData,
                    newUser,
                  ]);
                  localStorage.setItem("users", newLocastorageData);
                } else {
                  localStorage.setItem("users", JSON.stringify([newUser]));
                }

                alert("You are registered plese log in");
                navigate("/Login");
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/Login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
