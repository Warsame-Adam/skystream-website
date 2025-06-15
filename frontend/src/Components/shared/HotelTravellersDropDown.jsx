import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Tooltip,
  Menu,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HotelIcon from "@mui/icons-material/Hotel";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeTravellers } from "../Slices/HotelTravellersddSlice";
const HotelTravellersDropDown = ({ anchorEl, handleClose }) => {
  const maxAdults = 5;
  const minAdults = 1;
  const maxChildren = 5;
  const minChildren = 0;
  const maxRooms = 5;
  const minRooms = 1;

  const dispatch = useDispatch();

  const { rooms, adults, children, childAges } = useSelector(
    (state) => state.hotelTravellers
  );
  const disabledStyle = {
    color: "#999",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  useEffect(() => {
    if (childAges.length < children) {
      const diff = children - childAges.length;
      const newAges = [...childAges];
      for (let i = 0; i < diff; i++) {
        newAges.push(0);
      }
      dispatch(handleChangeTravellers({ childAges: newAges }));
    } else if (childAges.length > children) {
      const newAges = [...childAges].slice(0, children);
      dispatch(handleChangeTravellers({ childAges: newAges }));
    }
  }, [children]);

  const handleDone = () => {
    handleClose();
  };

  const handlePlusAdult = () => {
    if (adults < maxAdults) {
      dispatch(handleChangeTravellers({ adults: adults + 1 }));
    }
  };

  const handleMinusAdult = () => {
    if (adults > minAdults) {
      dispatch(handleChangeTravellers({ adults: adults - 1 }));
    }
  };

  const handlePlusChild = () => {
    if (children < maxChildren) {
      dispatch(handleChangeTravellers({ children: children + 1 }));
    }
  };

  const handleMinusChild = () => {
    if (children > minChildren) {
      dispatch(handleChangeTravellers({ children: children - 1 }));
    }
  };

  const handlePlusRoom = () => {
    if (rooms < maxRooms) {
      dispatch(handleChangeTravellers({ rooms: rooms + 1 }));
    }
  };

  const handleMinusRoom = () => {
    if (rooms > minRooms) {
      dispatch(handleChangeTravellers({ rooms: rooms - 1 }));
    }
  };

  const handleChildAgeChange = (index, newValue) => {
    const newAges = [...childAges];
    newAges[index] = newValue;
    dispatch(handleChangeTravellers({ childAges: newAges }));
  };

  const childAgeOptions = Array.from({ length: 18 }, (_, i) => ({
    value: i,
    label: i === 0 ? "<1 year old" : `${i} years old`,
  }));

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      slotProps={{
        paper: {
          sx: {
            "&.MuiPaper-root": {
              width: "380px",
              mt: "3px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              padding: 2,
              zIndex: 9999,
              color: "#000",
            },
          },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <BoyIcon sx={{ mr: 1, fontSize: 32 }} />
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>
          Adults
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={adults === minAdults ? "Can't go lower" : ""}
            placement='top'
          >
            <IconButton
              onClick={handleMinusAdult}
              sx={adults === minAdults ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>
            {adults}
          </Typography>
          <Tooltip
            title={adults === maxAdults ? "Max 5 adults" : ""}
            placement='top'
          >
            <IconButton
              onClick={handlePlusAdult}
              sx={adults === maxAdults ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <BoyIcon sx={{ mr: 1, fontSize: 24 }} />
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>
          Children
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={children === minChildren ? "Can't go lower" : ""}
            placement='top'
          >
            <IconButton
              onClick={handleMinusChild}
              sx={children === minChildren ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>
            {children}
          </Typography>
          <Tooltip
            title={children === maxChildren ? "Max 5 children" : ""}
            placement='top'
          >
            <IconButton
              onClick={handlePlusChild}
              sx={children === maxChildren ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {children > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 2,
            rowGap: 2,
            mb: 2,
          }}
        >
          {childAges.map((age, index) => (
            <Box key={index}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
                Child {index + 1} Age
              </Typography>
              <Select
                size='small'
                value={age}
                disablePortal
                onChange={(e) => handleChildAgeChange(index, e.target.value)}
                sx={{ width: "100%", color: "black" }}
                MenuProps={{
                  disablePortal: true,

                  anchorOrigin: { vertical: "top", horizontal: "left" },
                  transformOrigin: { vertical: "bottom", horizontal: "left" },
                  PaperProps: { style: { maxHeight: 250 } },
                }}
              >
                {childAgeOptions.map((opt) => (
                  <MenuItem
                    sx={{ color: "black" }}
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ))}
        </Box>
      )}
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <HotelIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>
          Rooms
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={rooms === minRooms ? "Can't go lower" : ""}
            placement='top'
          >
            <IconButton
              onClick={handleMinusRoom}
              sx={rooms === minRooms ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>
            {rooms}
          </Typography>
          <Tooltip
            title={rooms === maxRooms ? "Max 5 rooms" : ""}
            placement='top'
          >
            <IconButton
              onClick={handlePlusRoom}
              sx={rooms === maxRooms ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography
          sx={{
            display: "inline",
            marginTop: "30px",
            color: "#0666e4",
            fontSize: "15px",
            ":hover": {
              textDecoration: "underline",
              textDecorationColor: "#0666e4",
            },
            cursor: "pointer",
          }}
          onClick={handleDone}
        >
          Done
        </Typography>
      </Box>
    </Menu>
  );
};

export default HotelTravellersDropDown;
