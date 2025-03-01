import React, { useContext, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { handleChangeTravellers } from "./Slices/HomeTravellersddSlice";
import { GlobalContext } from "../context/GlobalContext";

const HomeTravellersDropDown = ({ anchorEl, handleClose }) => {
  const { classes } = useContext(GlobalContext);
  const maxAdults = 5;
  const minAdults = 1;
  const maxChildren = 5;
  const minChildren = 0;

  const disabledStyle = {
    color: "#999",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  const dispatch = useDispatch();
  const origin = useSelector((state) => state.flightSearch.from);
  const destination = useSelector((state) => state.flightSearch.to);

  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);

  const { cabinClass, adults, children, childAges } = useSelector(
    (state) => state.travellers
  );

  useEffect(() => {
    if (childAges.length < children) {
      const diff = children - childAges.length;
      const newAges = [...childAges];
      for (let i = 0; i < diff; i++) {
        newAges.push(0);
      }
      dispatch(
        handleChangeTravellers({ adults, children, childAges: newAges })
      );
    } else if (childAges.length > children) {
      const newAges = [...childAges].slice(0, children);
      dispatch(
        handleChangeTravellers({ adults, children, childAges: newAges })
      );
    }
  }, [children]);

  const handlePlusAdult = () => {
    if (adults < maxAdults) {
      dispatch(
        handleChangeTravellers({ adults: adults + 1, children, childAges })
      );
    }
  };

  const handleMinusAdult = () => {
    if (adults > minAdults) {
      dispatch(
        handleChangeTravellers({ adults: adults - 1, children, childAges })
      );
    }
  };

  const handlePlusChild = () => {
    if (children < maxChildren) {
      dispatch(
        handleChangeTravellers({ adults, children: children + 1, childAges })
      );
    }
  };

  const handleMinusChild = () => {
    if (children > minChildren) {
      dispatch(
        handleChangeTravellers({ adults, children: children - 1, childAges })
      );
    }
  };

  const handleChildAgeChange = (index, newValue) => {
    const newAges = [...childAges];
    newAges[index] = newValue;
    dispatch(handleChangeTravellers({ adults, children, childAges: newAges }));
  };

  const handleCabinClassChange = (newValue) => {
    dispatch(handleChangeTravellers({ cabinClass: newValue }));
  };
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
              width: "300px",
              mt: "3px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              padding: 2,
              zIndex: 9999,
            },
          },
        },
      }}
    >
      <Typography
        sx={{ color: "#000", fontWeight: 600, fontSize: "15px", mb: 0.5 }}
      >
        Cabin class
      </Typography>
      {origin && destination && departureDate && returnDate ? (
        <Select
          variant='outlined'
          fullWidth
          size='small'
          value={cabinClass}
          onChange={(e) => handleCabinClassChange(e.target.value)}
          sx={{
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#161616",
              },
            },
          }}
        >
          {classes.map((c) => (
            <MenuItem key={c.id} value={c.type}>
              {c.type}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography sx={{ color: "#000", fontSize: "13px", color: "#5a5a5a" }}>
          We can only show {cabinClass} prices for this search.
          <br />
          To see Business, Premium Economy, and First Class options, please tell
          us your travel dates and destination.
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

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
            placement='top'
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
          <Typography sx={{ color: "#161616", width: 20, textAlign: "center" }}>
            {adults}
          </Typography>
          <Tooltip
            title={adults === maxAdults ? "Max 5 adults" : ""}
            placement='top'
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
            placement='top'
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
          <Typography sx={{ color: "#161616", width: 20, textAlign: "center" }}>
            {children}
          </Typography>
          <Tooltip
            title={children === maxChildren ? "Max 5 children" : ""}
            placement='top'
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
          <Typography
            sx={{
              color: "#5a5a5a",
              fontSize: "13px",
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            Age of child {index + 1}
          </Typography>
          <Select
            size='small'
            value={childAges[index] || 0}
            onChange={(e) => handleChildAgeChange(index, e.target.value)}
            sx={{
              width: "100%",
              color: "black",

              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#161616",
                },
              },
            }}
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
              <MenuItem key={age} value={age} sx={{ color: "black" }}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ))}
    </Menu>
  );
};

export default HomeTravellersDropDown;
