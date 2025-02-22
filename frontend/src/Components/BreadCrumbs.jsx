import React from "react";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Breadcrumbs,
  Stack,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "@mui/material/Link";

const BreadCrumbs = () => {
  const params = useParams();

  return (
    <Container className='container' sx={{ pt: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
          color: "#626971",
        }}
      >
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Home
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Hotels
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          {params.country || "Country"}
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          {params.city || "City"}
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0" }} />
        <Typography variant='subtitle1'>
          {params.hotelName || "Hotel name"}
        </Typography>
      </Box>
    </Container>
  );
};

export default BreadCrumbs;
