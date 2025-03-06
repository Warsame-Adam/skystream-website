import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setDepartureDate, setReturnDate } from "../Slices/dateStore";

import Hotelimg from "../../Components/Assets/HotelHeroimg.jpg";
import HotelSearchBox from "../SearchBar/HotelSearchBox";
const HeroHotel = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const departure = new Date(currentDate.setDate(currentDate.getDate() + 7));
    dispatch(setDepartureDate(departure.toDateString()));

    const returnD = new Date(departure);
    returnD.setDate(departure.getDate() + 7);
    dispatch(setReturnDate(returnD.toDateString()));
  }, [dispatch]);

  const content = (
    <>
      <Typography
        variant={"h1"}
        sx={{
          fontSize: { md: "64px", xs: "32px" },
          letterSpacing: "-.04em",
          fontWeight: "900",
          lineHeight: { md: "64px", xs: "48px" },
          color: "text.primary",
          pt: "24px",
          textShadow: "1px 1px 2px rgba(0,0,0, 0.25)",
        }}
      >
        Find the right hotel today
      </Typography>

      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          backgroundColor: "common.blue",
          padding: { md: "20px", xs: "20px 0px" },
          borderRadius: { md: "8px", xs: 0 },
          mt: { md: "24px", xs: "10px" },
        }}
      >
        <HotelSearchBox />
      </Box>
    </>
  );
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          height: "550px",
          overflow: "hidden",
        }}
      >
        <img
          src={Hotelimg}
          alt='Hero'
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        className='container'
        sx={{
          boxSizing: "border-box",
          position: { md: "absolute", xs: "unset" },
          top: { md: "50%", xs: 0 },
          left: { md: "50%", xs: 0 },
          transform: { md: "translate(-50%, -50%)", xs: "unset" },
          width: "100%",
          backgroundColor: { md: "unset", xs: "common.blue" },
        }}
      >
        {matchesSM ? (
          <Container className='container'>{content}</Container>
        ) : (
          content
        )}
      </Box>
    </Box>
  );
};

export default HeroHotel;
