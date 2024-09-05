import React from "react"
import {Menu, IconButton, Avatar, Typography, Box, TextField, MenuItem, FormControlLabel, Button, Backdrop } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';


const RSMenu = ({ open, onClose }) => {
  return (
    <>
      {/* Backdrop to dim the background */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{ zIndex: 1200, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      />

      {/* Modal (Pop-up) Box */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1300,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          minWidth: '350px',
          maxWidth: '95vw',
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        {/* Header with Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6" sx={{color:"black"}}>Regional Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Language Field */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <IconButton>
            <LanguageIcon />
          </IconButton>
          <Typography sx={{color:"black"}}>Language</Typography>
        </Box>
        <TextField value="English (United Kingdom)" variant="outlined" fullWidth disabled />

        {/* Country / Region Field */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
          <IconButton>
            <PublicIcon />
          </IconButton>
          <Typography sx={{color:"black"}}>Country / Region</Typography>
        </Box>
        <TextField value="United Kingdom" variant="outlined" fullWidth disabled />

        {/* Currency Field */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <IconButton>
            <AttachMoneyIcon />
          </IconButton>
          <Typography sx={{color:"black"}}>Currency</Typography>
        </Box>
        <TextField value="GBP - £" variant="outlined" fullWidth disabled />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button variant="contained" onClick={onClose}>Save</Button>
          <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </>
  );
};

export default RSMenu;

  



    

    