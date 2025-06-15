import React, { useContext } from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Container,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleFAQ } from "../Slices/FAQVisible";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";

const CityHotelsFAQs = () => {
  const { locations } = useContext(GlobalContext);

  const dispatch = useDispatch();
  const params = useParams();
  const countryParams = params?.country;
  const cityParams = params.city;

  const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);

  const handleToggleFAQ = (index) => {
    dispatch(toggleFAQ(index));
  };

  let foundCity = locations?.find(
    (loc) =>
      loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
      loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
  );
  const cityName = foundCity?.cityName || "Amsterdam";
  const faqData = [
    {
      question: `What’s the weather like in ${cityName}?`,
      answer: `In ${cityName}, the expected average temperature in November is 7°C. The warmest month is typically August, which averages 21°C. The coolest month is January, with temperatures averaging 1°C. The rainiest month is November, and the driest month is April.`,
    },
    {
      question:
        "Can I cancel or amend my hotel reservation last minute if I need to?",
      answer: `You can always cancel or amend your hotel reservation if you need to, but look out for hotels in ${cityName} with free cancellation or flexible booking options if you want to protect your money. Some hotels allow you to cancel and get your money back if your plans change.`,
    },
    {
      question: `Can I get a last-minute ${cityName} hotel deal?`,
      answer:
        "Of course - the cheapest hotel deal we found within the next seven days is £23 per night. If you need somewhere in the next 24 hours, we've found you somewhere to stay for £24 per night.",
    },
    {
      question: `Is it more expensive to stay in ${cityName} hotels on weekends?`,
      answer:
        "The average price of a hotel during the week is £142 per night, and the average price on weekends is £166. Overall, it looks like the cheapest day to stay in Amsterdam could be Sunday.",
    },
    {
      question: `What airports are the closest to the centre of ${cityName}?`,
      answer: `The nearest airport to ${cityName} is Amsterdam Schiphol Airport (AMS), which is 6.9 miles from the city centre. Other airports include: Rotterdam Airport, which is 34.3 miles from the city centre.`,
    },
    {
      question: `What day is cheapest to stay in hotels in ${cityName}?`,
      answer: `The cheapest day to stay in a hotel in ${cityName} typically depends on the availability and demand. Sunday is often the most affordable day.`,
    },
  ];
  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <Box sx={{ width: { md: "75%", xs: "100%" } }}>
        {faqData.map((faq, index) => (
          <Box key={index}>
            <Box
              onClick={() => handleToggleFAQ(index)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingBottom: "5px",
              }}
            >
              <Typography
                sx={{
                  borderBottom: "0.5px solid grey",
                  paddingBottom: "5px",
                  flexGrow: 1,
                  fontWeight: "bold",
                  FontSize: "25px",
                }}
              >
                {faq.question}
              </Typography>

              <IconButton
                sx={{
                  color: "black",
                  marginLeft: -3.5,
                  transform: visibleFAQs[index]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            {visibleFAQs[index] && (
              <Typography
                sx={{
                  marginTop: "10px",
                  fontSize: "16px",
                  borderBottom: "1px solid #ccd1d8",
                  marginBottom: "10px",
                }}
              >
                {faq.answer}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CityHotelsFAQs;
