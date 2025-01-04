import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const HomeTravellersDropDown = ({
  open,
  anchorEl,
  adults,
  children,
  childAges,
  onChange,
  cabinClass = "Economy",
}) => {
  
  const maxAdults = 5;
  const minAdults = 1;
  const maxChildren = 5;
  const minChildren = 0;

  
  const disabledStyle = {
    color: "#999",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (anchorEl && open) {
      const rect = anchorEl.getBoundingClientRect();
      // Slight offset below the input
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [anchorEl, open]);
  
  

  
  useEffect(() => {
    if (childAges.length < children) {
      const diff = children - childAges.length;
      const newAges = [...childAges];
      for (let i = 0; i < diff; i++) {
        newAges.push(0);
      }
      onChange({ adults, children, childAges: newAges });
    } else if (childAges.length > children) {
      const newAges = [...childAges].slice(0, children);
      onChange({ adults, children, childAges: newAges });
    }
    
  }, [children]);

  if (!open) return null;

  
  const handlePlusAdult = () => {
    if (adults < maxAdults) {
      onChange({ adults: adults + 1, children, childAges });
    }
  };
  const handleMinusAdult = () => {
    if (adults > minAdults) {
      onChange({ adults: adults - 1, children, childAges });
    }
  };
  const handlePlusChild = () => {
    if (children < maxChildren) {
      onChange({ adults, children: children + 1, childAges });
    }
  };
  const handleMinusChild = () => {
    if (children > minChildren) {
      onChange({ adults, children: children - 1, childAges });
    }
  };
  const handleChildAgeChange = (index, newValue) => {
    const newAges = [...childAges];
    newAges[index] = newValue;
    onChange({ adults, children, childAges: newAges });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: 300,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        padding: 2,
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      
      <Typography sx={{ fontWeight: 600, fontSize: "15px", mb: 0.5 }}>
        Cabin class
      </Typography>
      <Typography sx={{ fontSize: "13px", color: "#5a5a5a", mb: 2 }}>
        We can only show {cabinClass} prices for this search.
        <br />
        To see Business, Premium Economy, and First Class options, please tell
        us your travel dates and destination.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
            Adults
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#5a5a5a" }}>
            Aged 16+
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={adults === minAdults ? "Can't go lower" : ""}
            placement="top"
          >
            <IconButton
              onClick={handleMinusAdult}
              sx={
                adults === minAdults
                  ? { ...disabledStyle }
                  : { color: "#333", cursor: "pointer" }
              }
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>
            {adults}
          </Typography>
          <Tooltip
            title={adults === maxAdults ? "Max 5 adults" : ""}
            placement="top"
          >
            <IconButton
              onClick={handlePlusAdult}
              sx={
                adults === maxAdults
                  ? { ...disabledStyle }
                  : { color: "#333", cursor: "pointer" }
              }
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

    
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
            Children
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#5a5a5a" }}>
            Aged 0 to 15
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={children === minChildren ? "Can't go lower" : ""}
            placement="top"
          >
            <IconButton
              onClick={handleMinusChild}
              sx={
                children === minChildren
                  ? { ...disabledStyle }
                  : { color: "#333", cursor: "pointer" }
              }
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ width: 20, textAlign: "center" }}>
            {children}
          </Typography>
          <Tooltip
            title={children === maxChildren ? "Max 5 children" : ""}
            placement="top"
          >
            <IconButton
              onClick={handlePlusChild}
              sx={
                children === maxChildren
                  ? { ...disabledStyle }
                  : { color: "#333", cursor: "pointer" }
              }
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      
      {Array.from({ length: children }).map((_, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
            Age of child {index + 1}
          </Typography>
          <Select
            size="small"
            value={childAges[index] || 0}
            onChange={(e) => handleChildAgeChange(index, e.target.value)}
            sx={{ width: "100%", color:"black" }}
            MenuProps={{
              disablePortal: true,
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              transformOrigin: { vertical: "top", horizontal: "left" },
              PaperProps: {
                style: {
                  maxHeight: 250,
                },
              },
            }}
          >
            {Array.from({ length: 16 }).map((_, age) => (
              <MenuItem key={age} value={age} sx={{color:"black"}}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ))}
    </Box>
  );
};

export default HomeTravellersDropDown;