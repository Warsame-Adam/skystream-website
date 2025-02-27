import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import FlagIcon from "@mui/icons-material/Flag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import companyLogo from "../../Components/Assets/company-logo.png";
import RSMenu from "../RSMenu";
import { GlobalContext } from "../../context/GlobalContext";
import LoginModal from "../Login/LoginModal";
import { jwtKey } from "../../data/websiteInfo";
const Navbar = () => {
  const { user: globalUser, setAuth } = useContext(GlobalContext);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const handleOpenLanguageMenu = (event) => {
    console.log("Event Target (anchorEl):", event.currentTarget);
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const pages = [
    { icon: <FlightIcon />, label: "Flights" },
    { icon: <HotelIcon />, label: "Hotels" },
    { icon: <FlagIcon />, label: "Regional settings" },
    { icon: <LocalOfferIcon />, label: "Explore Everywhere" },
    { icon: <HelpOutlineIcon />, label: "Help" },
  ];
  const links = [
    { key: "language", icon: <LanguageIcon /> },
    { key: "favorite", icon: <FavoriteIcon /> },
    { key: "person", icon: <PersonIcon /> },
    { key: "menu", icon: <MenuIcon /> },
  ];
  const iconButtonStyles = {
    color: "white",
    mx: 0.3,
    width: "auto",
    height: "35px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "rgba(74,86,99,255)",
    },
    "&:active": {
      outline: "2px solid rgba(rgba(74,86,99,255))",
      backgroundColor: "rgba(rgba(74,86,99,255))",
    },
  };

  const logoutHandler = async () => {
    try {
      await localStorage.removeItem(jwtKey);
      setAuth(null);
    } catch (e) {
      console.log("faled to logout", e);
    }
  };
  return (
    <AppBar
      position='static'
      sx={{ padding: "0", backgroundColor: "common.blue" }}
    >
      <Container className='container'>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "45px 0px 0px",
            "&.MuiToolbar-root": {
              minHeight: "unset",
            },
          }}
        >
          <Box
            component={Link}
            to='/'
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar src={companyLogo} sx={{ mr: { xs: 1, md: 2 } }} />
            </IconButton>
            <Typography
              variant={matchesSM ? "h6" : "h5"}
              sx={{
                color: "text.primary",
                letterSpacing: ".1rem",
                fontWeight: 700,
              }}
            >
              SkyStream
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {links.slice(0, 2).map((item) => (
              <IconButton
                key={item.key}
                sx={iconButtonStyles}
                onClick={
                  item.key === "language" ? handleOpenLanguageMenu : null
                }
              >
                {item.icon}
              </IconButton>
            ))}
            {links.some((link) => link.key === "language") &&
              anchorElLanguage && (
                <RSMenu
                  open={Boolean(anchorElLanguage)}
                  onClose={handleCloseLanguageMenu}
                />
              )}
            <IconButton
              sx={iconButtonStyles}
              onClick={() => {
                if (globalUser) {
                  logoutHandler();
                } else {
                  setShowLoginDialog(true);
                }
              }}
            >
              <PersonIcon />
              {!matchesSM && (
                <Typography
                  variant='body1'
                  sx={{ mx: 0.2, color: "background.paper" }}
                >
                  {globalUser ? "Logout" : "Log in"}
                </Typography>
              )}
            </IconButton>
            <LoginModal
              open={showLoginDialog}
              handleClose={() => setShowLoginDialog(false)}
            />
            {links.slice(3).map((item, i) => (
              <IconButton
                onClick={handleOpenUserMenu}
                key={item.key}
                sx={{
                  ...iconButtonStyles,

                  mr: links.slice(3).length === i + 1 ? "-8px" : "0.3",
                }}
              >
                {item.icon}
              </IconButton>
            ))}
            <Menu
              sx={{ my: 0.2, ml: -1, borderRadius: "10px" }}
              id='menu-appbar'
              PaperProps={{
                sx: {
                  width: "280px",
                  maxWidth: "none",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseUserMenu}>
                  <IconButton sx={{ color: "#0665e3", mr: 1 }}>
                    {page.icon}
                  </IconButton>

                  <Typography
                    sx={{ color: "black", fontSize: "15px", marginLeft: "5px" }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
