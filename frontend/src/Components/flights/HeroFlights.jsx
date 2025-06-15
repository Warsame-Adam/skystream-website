import React from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  Input,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import peopleBeach from "../../Components/Assets/peopleBeach.png";
import { useSelector, useDispatch } from "react-redux";
import ReturnSearchBar from "../shared/ReturnSearchBar";
// import MultiCitySearchBar from "../SearchBar/MultiCitySearchBar";
import { setSearchType } from "../Slices/SearchBarSlice";

const HeroFlights = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const searchType = useSelector((state) => state.search.searchType);
  const dispatch = useDispatch();

  const renderSearchBar = () => {
    switch (searchType) {
      case "return":
        return <ReturnSearchBar />;
      case "oneway":
        return <ReturnSearchBar />;
      // case "multiCity":
      //   return <MultiCitySearchBar />;
      default:
        return <ReturnSearchBar />;
    }
  };

  const content = (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <RadioGroup
          row
          value={searchType}
          onChange={(e) => dispatch(setSearchType(e.target.value))}
        >
          <FormControlLabel
            value='return'
            control={
              <Radio
                sx={{
                  color: searchType === "return" ? "#0062e3" : "#52565f",
                  "&.Mui-checked": {
                    color: "#0062e3",
                  },
                }}
              />
            }
            label='Return'
            componentsProps={{
              typography: {
                fontSize: "15px",
                color: "white",
                marginRight: "5px",
              },
            }}
          />

          <FormControlLabel
            value='oneway'
            control={
              <Radio
                sx={{
                  color: searchType === "oneway" ? "#0062e3" : "#52565f",
                  "&.Mui-checked": {
                    color: "#0062e3",
                  },
                }}
              />
            }
            label='One Way'
            componentsProps={{
              typography: {
                fontSize: "15px",
                color: "white",
                marginRight: "5px",
              },
            }}
          />

          {/* <FormControlLabel
            value='multiCity'
            control={
              <Radio
                sx={{
                  color: searchType === "multiCity" ? "#0062e3" : "#52565f",
                  "&.Mui-checked": {
                    color: "#0062e3",
                  },
                }}
              />
            }
            label='Multi-City'
            componentsProps={{
              typography: {
                fontSize: "15px",
                color: "white",
                marginRight: "5px",
              },
            }}
          /> */}
        </RadioGroup>
      </Box>

      {renderSearchBar()}
    </>
  );
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          height: "550px",
          overflow: "hidden",
          display: { md: "flex", xs: "none" },
        }}
      >
        <img
          src={peopleBeach}
          alt='Hero'
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          boxSizing: { md: "unset", xs: "border-box" },
          position: { md: "absolute", xs: "unset" },
          top: { md: "50%", xs: 0 },
          left: { md: "50%", xs: 0 },
          transform: { md: "translate(-50%, -50%)", xs: "unset" },
          width: { md: "90%", xs: "100%" },
          maxWidth: "1170px",
          backgroundColor: "#05203c",
          padding: { md: "20px", xs: "20px 0px" },
          borderRadius: { md: "8px", xs: 0 },
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

export default HeroFlights;
