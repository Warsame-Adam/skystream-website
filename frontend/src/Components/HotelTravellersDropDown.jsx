import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HotelIcon from "@mui/icons-material/Hotel";
import BoyIcon from '@mui/icons-material/Boy';

const HotelTravellersDropDown = ({
  open,
  anchorEl,
  adults,
  children,
  childAges,
  rooms,
  onChange,
  onClose,
}) => {

  const maxAdults = 5;
  const minAdults = 1;
  const maxChildren = 5;
  const minChildren = 0;
  const maxRooms = 5;
  const minRooms = 1;

  
  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const [tempRooms, setTempRooms] = useState(rooms);
  const [tempChildAges, setTempChildAges] = useState(childAges);

  useEffect(() => {
    
    if (open) {
      setTempAdults(adults);
      setTempChildren(children);
      setTempRooms(rooms);
      setTempChildAges(childAges);
    }
  }, [open, adults, children, childAges, rooms]);

  
  const disabledStyle = {
    color: "#999",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (anchorEl && open) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorEl, open]);

  const handleDone = () => {
    
    onChange({
      adults: tempAdults,
      children: tempChildren,
      childAges: tempChildAges,
      rooms: tempRooms,
    });
    if (onClose) onClose(); 
  };

  
  const handlePlusAdult = () => {
    if (tempAdults < maxAdults) {
      setTempAdults(tempAdults + 1);
    }
  };

  const handleMinusAdult = () => {
    if (tempAdults > minAdults) {
      setTempAdults(tempAdults - 1);
    }
  };

  const handlePlusChild = () => {
    if (tempChildren < maxChildren) {
      setTempChildren(tempChildren + 1);
      setTempChildAges([...tempChildAges, 0]);
    }
  };

  const handleMinusChild = () => {
    if (tempChildren > minChildren) {
      setTempChildren(tempChildren - 1);
      setTempChildAges(tempChildAges.slice(0, -1)); 
    }
  };

  const handlePlusRoom = () => {
    if (tempRooms < maxRooms) {
      setTempRooms(tempRooms + 1);
    }
  };

  const handleMinusRoom = () => {
    if (tempRooms > minRooms) {
      setTempRooms(tempRooms - 1);
    }
  };

  const handleChildAgeChange = (index, newValue) => {
    const newAges = [...tempChildAges];
    newAges[index] = newValue;
    setTempChildAges(newAges);
  };

  const childAgeOptions = Array.from({ length: 18 }, (_, i) => ({
    value: i,
    label: i === 0 ? "<1 year old" : `${i} years old`,
  }));

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: 380,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        p: 2,
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <BoyIcon sx={{ mr: 1, fontSize: 32 }} />
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>Adults</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={tempAdults === minAdults ? "Can't go lower" : ""} placement="top">
            <IconButton
              onClick={handleMinusAdult}
              sx={tempAdults === minAdults ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>{tempAdults}</Typography>
          <Tooltip title={tempAdults === maxAdults ? "Max 5 adults" : ""} placement="top">
            <IconButton
              onClick={handlePlusAdult}
              sx={tempAdults === maxAdults ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />

    
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <BoyIcon sx={{ mr: 1, fontSize: 24 }} />
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>Children</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={tempChildren === minChildren ? "Can't go lower" : ""} placement="top">
            <IconButton
              onClick={handleMinusChild}
              sx={tempChildren === minChildren ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>{tempChildren}</Typography>
          <Tooltip title={tempChildren === maxChildren ? "Max 5 children" : ""} placement="top">
            <IconButton
              onClick={handlePlusChild}
              sx={tempChildren === maxChildren ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {tempChildren > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 2,
            rowGap: 2,
            mb: 2,
          }}
        >
          {tempChildAges.map((age, index) => (
            <Box key={index}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
                Child {index + 1} Age
              </Typography>
              <Select
                size="small"
                value={age}
                disablePortal
                onChange={(e) => handleChildAgeChange(index, e.target.value)}
                sx={{ width: "100%", color:"black",  }}
                MenuProps={{
                  disablePortal: true,
                  

                  anchorOrigin: { vertical: "top", horizontal: "left" },
                  transformOrigin: { vertical: "bottom", horizontal: "left" },
                  PaperProps: { style: { maxHeight: 250,  } },
                }}
              >
                {childAgeOptions.map((opt) => (
                  <MenuItem sx={{color:"black",}} key={opt.value} value={opt.value}>
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
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: "15px" }}>Rooms</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={tempRooms === minRooms ? "Can't go lower" : ""} placement="top">
            <IconButton
              onClick={handleMinusRoom}
              sx={tempRooms === minRooms ? disabledStyle : { color: "#333" }}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>{tempRooms}</Typography>
          <Tooltip title={tempRooms === maxRooms ? "Max 5 rooms" : ""} placement="top">
            <IconButton
              onClick={handlePlusRoom}
              sx={tempRooms === maxRooms ? disabledStyle : { color: "#333" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      
      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ display:"inline", marginTop: "30px", color:"#0666e4", fontSize:"15px", ':hover': {textDecoration:"underline", textDecorationColor: "#0666e4"}, cursor:"pointer" }} onClick={handleDone}>
          Done
        </Typography>
      </Box>
    </Box>
  );
};

export default HotelTravellersDropDown;