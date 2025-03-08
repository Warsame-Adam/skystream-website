import React, { useContext } from "react";
import {
  Menu,
  IconButton,
  Avatar,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Button,
  Backdrop,
  InputAdornment,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { GlobalContext } from "../context/GlobalContext";

const RSMenu = ({ open, onClose }) => {
  const { visitorData } = useContext(GlobalContext);
  return (
    <>
      {/* Backdrop to dim the background */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{ zIndex: 1200, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      />

      {/* Modal (Pop-up) Box */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1300,
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          minWidth: "350px",
          maxWidth: "95vw",
          maxHeight: "95vh",
          overflowY: "auto",
        }}
      >
        {/* Header with Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant='h6' sx={{ color: "black" }}>
            Regional Settings
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Language Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <Typography sx={{ color: "black" }}>Language</Typography>
        </Box>
        <TextField
          size='small'
          value={`${visitorData?.language}(${visitorData?.languageCode})`}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ pr: "16px" }}>
                <LanguageIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          fullWidth
          disabled
        />

        {/* Country / Region Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            mt: "16px",
            mb: "8px",
          }}
        >
          <Typography sx={{ color: "black" }}>Country / Region</Typography>
        </Box>
        <TextField
          size='small'
          value={`${visitorData?.country}(${visitorData.countryCode})`}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ pr: "16px" }}>
                <PublicIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          disabled
        />

        {/* Currency Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            mt: "16px",
            mb: "8px",
          }}
        >
          <Typography sx={{ color: "black" }}>Currency</Typography>
        </Box>
        <TextField
          size='small'
          value={`${visitorData?.currency?.code}(${visitorData?.currency?.symbol})`}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ pr: "16px" }}>
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          fullWidth
          disabled
        />

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button variant='contained' color='secondary' onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RSMenu;
