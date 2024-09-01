import React from "react"
import {Menu, IconButton, Avatar, Typography, Box, TextField, MenuItem, FormControlLabel, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';

const RSMenu  = ({ open, onClose}) => {
    
    

    
    return (
      <Box sx={{
        position: 'absolute',         // Fix the box to the viewport
        top: '50%',                // Position it at the middle of the viewport height
        left: '50%',               // Position it at the middle of the viewport width
        transform: 'translate(-50%, -50%)', // Shift it back by half its size to center
        zIndex: 1300,              
      }}>
        <Menu
        sx={{ 
            borderRadius: '12px', // Add rounded corners
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
            padding: '20px', // Add padding inside the menu
            minWidth: '320px', // Ensure the menu has a minimum width
            maxWidth: '95vw', // Set a max width to be responsive
            }}
        open={Boolean(open)}
        onClose={onClose}
        keepMounted>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
      Regional Settings
    </Typography>

    <MenuItem>
      <IconButton>
        <LanguageIcon />
      </IconButton>
      <Typography>Languages</Typography>
    </MenuItem>

    <TextField label="Languages" variant="outlined" fullWidth />

    <MenuItem>
      <IconButton>
        <PublicIcon />
      </IconButton>
      <Typography>Country / Region</Typography>
    </MenuItem>

    <TextField label="Country / Region" variant="outlined" fullWidth />

    <MenuItem>
      <IconButton>
        <AttachMoneyIcon />
      </IconButton>
      <Typography>Currency</Typography>
    </MenuItem>

    <TextField label="Currency" variant="outlined" fullWidth />

    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
      <Button variant="contained">Save</Button>
      <Button variant="contained" color="secondary">
        Cancel
      </Button>
    </Box>
  </Box>
</Menu>
</Box>

    )
}
    
      
    

        

export default RSMenu