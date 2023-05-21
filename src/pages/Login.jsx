import * as React from "react";
import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";
import { isA } from "@jest/expect-utils";
// TODO remove, this demo shouldn't need to reset the theme.
const SignIn = Yup.object().shape({
  /*password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),*/
  email: Yup.string().email("Invalid email").required("Required"),
});

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = React.useContext(AuthContext);
  React.useEffect(() => {
    if (localStorage.getItem("token") === "True") {
      navigate(-1);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={{
                email: "azer",
                password: "",
              }}
              validationSchema={SignIn}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  const locaStorageData = localStorage.getItem("users");
                  if (locaStorageData) {
                    const user = JSON.parse(locaStorageData).find(
                      (e) => e.email === values.email
                    );
                    if (user) {
                      if (user.password === values.password) {
                        localStorage.setItem("token", "True");
                        setIsAuth("True");
                        alert("Congrats you logged in");
                        navigate("/Products");
                      } else {
                        alert("Password is wrong");
                      }
                    } else {
                      alert("User with this email not found");
                    }
                  }
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting, errors }) => (
                <Form>
                  <Field
                    component={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  {isSubmitting && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid container>
              <Grid item>
                <Link to="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
