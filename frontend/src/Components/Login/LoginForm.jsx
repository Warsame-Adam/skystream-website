import React, { useState, useContext } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import companyLogo from "../../Components/Assets/company-logo.png";
import GoogleLoginButton from "./GoogleLoginButton";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/axios";
import { jwtKey } from "../../data/websiteInfo";
export default function LoginForm({ onSignupClick }) {
  const { setAuth } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: "",
    });
    let err = false;
    let messages = [];
    if (formData.email === "") {
      err = true;
      messages.push("Email is required");
    }
    if (
      !/(?:[a-z0-9!#$%&'*/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        formData.email
      )
    ) {
      err = true;
      messages.push("Email is invalid");
    }
    if (formData.password === "") {
      err = true;
      messages.push("Password is required");
    }
    if (err) {
      setError({
        status: true,
        message: messages.join(", "),
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        await localStorage.setItem(jwtKey, response.data.token);
        setAuth({ ...response.data.data.user, token: response.data.token });
      } else {
        setError({
          status: true,
          message: response.data.error,
        });
      }
    } catch (err) {
      console.log(err);
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid container direction='column' sx={{ color: "#161616" }}>
      {/* logo */}
      <Grid sx={{ width: "100%" }}>
        <Box
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <Avatar src={companyLogo} sx={{ mr: { xs: 1, md: 2 } }} />
          </IconButton>
          <Typography
            variant={"h6"}
            sx={{
              letterSpacing: ".1rem",
              fontWeight: 900,
            }}
          >
            SkyStream
          </Typography>
        </Box>
      </Grid>
      {/* heading */}
      <Grid sx={{ width: "100%", mt: "25px" }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 700, fontSize: { md: "32px", xs: "24px" } }}
        >
          Get the full experience
        </Typography>
      </Grid>
      {/* description */}
      <Grid sx={{ width: "100%", mt: "8px" }}>
        <Typography variant='subtitle1' sx={{ lineHeight: "24px" }}>
          Track prices, make trip planning easier and enjoy faster booking.
        </Typography>
      </Grid>

      {/* email */}
      <Grid sx={{ width: "100%", mt: "16px" }}>
        <Typography
          variant='subtitle2'
          sx={{
            ...inputLableStyle,
          }}
        >
          Email
        </Typography>
        <Input
          type='email'
          disableUnderline
          placeholder='Enter Email address'
          fullWidth
          sx={{
            ...inputStyle,
            borderRadius: "10px",
          }}
          value={formData.email}
          onChange={(e) => {
            setFormData((f) => {
              return { ...f, email: e.target.value };
            });
          }}
        />
      </Grid>
      {/* password */}
      <Grid sx={{ width: "100%", mt: "16px" }}>
        <Typography
          variant='subtitle2'
          sx={{
            ...inputLableStyle,
          }}
        >
          Password
        </Typography>
        <Input
          type='password'
          disableUnderline
          placeholder='Password'
          fullWidth
          sx={{
            ...inputStyle,
            borderRadius: "10px",
          }}
          value={formData.password}
          onChange={(e) => {
            setFormData((f) => {
              return { ...f, password: e.target.value };
            });
          }}
        />
      </Grid>
      {error.status && (
        <Grid item sx={{ mt: "8px", width: "100%" }}>
          <Alert severity='warning'>{error.message}</Alert>
        </Grid>
      )}
      {/* submit */}
      <Grid sx={{ width: "100%", mt: "16px" }}>
        <Button
          variant='contained'
          size='large'
          fullWidth
          sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
          startIcon={
            loading && <CircularProgress size='1rem' color='primary' />
          }
          disabled={loading}
          onClick={submitHandler}
        >
          Log in{" "}
        </Button>
      </Grid>
      {/* google login */}
      {/* <Grid sx={{ width: "100%", mt: "16px" }}>
        <GoogleLoginButton />
      </Grid> */}

      {/* sign up */}
      <Grid item sx={{ mt: "20px", width: "100%" }}>
        <Typography variant='subtitle2' sx={{ textAlign: "center" }}>
          Don's have an account?{" "}
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={onSignupClick}
          >
            Register now
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
}

const inputLableStyle = {
  fontWeight: "700",
  zIndex: 1,
};

const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  p: "13px 16px",
  mt: "4px",
  "& input": {
    p: 0,
    height: "unset",
    border: "none",
    lineHeight: "21px",
  },
};
