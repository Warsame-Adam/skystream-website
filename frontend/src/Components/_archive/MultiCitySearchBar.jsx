import React, { useState } from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  Input,
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
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "black",
  padding: "9.2px 15px",
  flex: "0 0 auto",
  height: "32px",
  "&:focus": {
    borderColor: "primary.main",
  },
};

const MultiCitySearchBar = () => {
  const [flights, setFlights] = useState([
    { from: "", to: "", departDate: "" },
    { from: "", to: "", departDate: "" },
  ]);

  const addFlightRow = () => {
    setFlights([...flights, { from: "", to: "", departDate: "" }]);
  };

  const removeFlightRow = (index) => {
    if (flights.length > 2) {
      setFlights(flights.filter((_, i) => i !== index));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* Flight Rows */}
      <Grid container direction='column' gap='10px'>
        {flights.map((_, index) => (
          <Grid container key={index} alignItems='center' gap='15px'>
            <Grid item sx={{ flex: 1 }}>
              <Input
                placeholder='From'
                disableUnderline
                sx={{
                  ...inputStyle,
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <Input
                placeholder='To'
                disableUnderline
                sx={{
                  ...inputStyle,
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <Input
                placeholder='Depart'
                disableUnderline
                sx={{
                  ...inputStyle,
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <IconButton
              onClick={(e) => {
                if (index < 2) {
                  e.preventDefault();
                } else {
                  removeFlightRow(index);
                }
              }}
              sx={{
                p: 0,
                color:
                  flights.length > 2
                    ? "#ffffff"
                    : index < 2
                    ? "#44586d"
                    : "#ffffff",
                cursor: index < 2 ? "not-allowed" : "pointer", // Change cursor for first two rows
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          padding: "10px 0",
        }}
      >
        <Button
          onClick={addFlightRow}
          variant='contained'
          sx={{
            marginTop: "10px",
            fontSize: "16px",

            color: "black",
            backgroundColor: "#e0e3e5",
            textTransform: "none",
            borderRadius: "11px",
            padding: "5px 15px",
            width: "185px",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
            "&:Hover": { backgroundColor: "#c2c9cd" },
          }}
        >
          <AddIcon />
          <Typography sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>
            Add another flight
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box sx={{ flex: "1" }}>
          {" "}
          {/* Input wrapped to keep its width dynamic */}
          <Input
            disableUnderline
            defaultValue='1 adult, Economy'
            sx={{
              ...inputStyle,
              textAlign: "center",
              backgroundColor: "white",
              color: "black",
              width: "410px", // Or use flex if dynamic width required
              height: "55px",
              borderRadius: "12px",
            }}
          />
        </Box>

        <Button
          variant='contained'
          sx={{
            color: "white",
            backgroundColor: "#0062e3",
            padding: "15px 20px",
            textTransform: "none",
            fontSize: "15px",
            "&:Hover": { backgroundColor: "#024daf" },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default MultiCitySearchBar;
