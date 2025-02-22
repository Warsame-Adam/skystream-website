import React, { useEffect, useState } from "react";
import {
  AppBar,
  Menu,
  Link,
  Input,
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
  Divider,
} from "@mui/material";
import {
  AccessTime,
  FreeBreakfast,
  Pets,
  ChildFriendly,
  Wifi,
  AcUnit,
  FitnessCenter,
  SupportAgent,
  Restaurant,
  SmokeFree,
} from "@mui/icons-material";

const fastFacts = [
  { icon: AccessTime, text1: "Check-in from", text2: "15:00" },
  { icon: AccessTime, text1: "Check out by", text2: "12:00" },
  { icon: FreeBreakfast, text1: "Breakfast", text2: "Breakfast available" },
  { icon: Pets, text1: "Pets", text2: "Pets are allowed." },
  {
    icon: ChildFriendly,
    text1: "Children",
    text2: "Children are welcome at this hotel.",
  },
];

const amenities = [
  { icon: Wifi, text: "Wi-Fi" },
  { icon: AcUnit, text: "Air conditioning" },
  { icon: FitnessCenter, text: "Fitness centre" },
  { icon: SupportAgent, text: "Front desk 24 hour" },
  { icon: Restaurant, text: "Restaurant" },
  { icon: SmokeFree, text: "Non-smoking" },
];

const FastfactsandAmenties = () => {
  return (
    <Container className='container' sx={{ pt: { md: "96px", xs: "24px" } }}>
      <Typography
        variant='h6'
        sx={{
          fontSize: { md: "40px", xs: "20px" },
          fontWeight: "bold",
          mb: "40px",
        }}
      >
        Fast facts
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(3, 1fr)", xs: "repeat(2, 1fr)" }, // Three columns
          gap: "20px", // Space between the items
          alingItems: "start",
          rowGap: "40px",
        }}
      >
        {fastFacts.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <item.icon sx={{ fontSize: "30px", marginBottom: "10px" }} />{" "}
            {/* Icon */}
            <Typography sx={{ fontSize: "16px" }}>{item.text1}</Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              {item.text2}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: "24px" }} />
      <Typography
        variant='h6'
        sx={{
          fontSize: { md: "40px", xs: "20px" },
          fontWeight: "bold",
          mb: { md: "40px", xs: "20px" },
        }}
      >
        Amenities
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)", // Six columns
          gap: "16px", // Space between the items
          maxWidth: "100%",
          overflowX: "auto",
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none" /* Safari and Chrome */,
          },
        }}
      >
        {amenities.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#eff3f8",
              padding: { md: "20px", xs: "8px" },
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "84px",
              minHeight: "74px",
            }}
          >
            <item.icon
              sx={{
                fontSize: "24px",
                mb: { md: "20px", xs: "10px" },
                color: "#000",
              }}
            />{" "}
            {/* Icon */}
            <Typography
              variant='body2'
              sx={{
                fontSize: "14px",
                color: "#161616",
                lineHeight: "20px",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FastfactsandAmenties;
