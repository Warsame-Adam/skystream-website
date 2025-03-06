import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import HotelSearchBox from "./HotelSearchBox";

const CityHotelsSearchBar = () => {
  const navigate = useNavigate();
  const { destination } = useSelector((state) => state.hotelSearch);

  console.log(destination);
  if (!destination?.cityName) {
    navigate("/hotels");
  }
  return (
    <Box
      sx={{
        backgroundColor: "common.blue",
        pt: "24px",
        pb: "16px",
      }}
    >
      <Container className='container'>
        <Typography
          variant={"h1"}
          sx={{
            fontSize: { md: "40px", xs: "32px" },
            fontWeight: "700",
            lineHeight: { md: "48px", xs: "32px" },
            color: "text.primary",
          }}
        >
          Hotels in {destination?.cityName}
        </Typography>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "100%",
            backgroundColor: "common.blue",
            borderRadius: { md: "8px", xs: 0 },
            mt: { md: "40px", xs: "10px" },
          }}
        >
          <HotelSearchBox />
        </Box>
      </Container>
    </Box>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  color: "text.primary",
  pb: "8px",
};

const searchButtonStyle = {
  fontWeight: 700,
  fontSize: "16px",
  backgroundColor: "primary.main",
  padding: "10px 16px",
  borderRadius: { md: "10px", xs: "8px" },
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};
const inputStyle = {
  boxSizing: "border-box",
  height: "48px",
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  "&.MuiAutocomplete-input, input": {
    border: "none !important",
    p: "8px 16px !important",
  },
};
export default CityHotelsSearchBar;
