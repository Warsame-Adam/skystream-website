import React from "react";
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
import { toggleFAQ } from "./Slices/FAQVisible";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const IndividualHotelFAQ = ({ hotel }) => {
  const dispatch = useDispatch();
  const IndividualHotelFaqData = [
    {
      hotelName: hotel.name,
      faq: [
        {
          question: `Does ${hotel.name} have a restaurant?`,
          answer: `${hotel.amenities?.restaurant ? "Yes" : "No"}, ${
            hotel.name
          } does ${
            hotel.amenities?.restaurant ? "" : "not"
          } have a restaurant.`,
        },

        {
          question: `What time is check-in and check-out at ${hotel.name}?`,
          answer: `At ${hotel.name} you can check in from ${hotel.policies.checkIn}, and you'll need to check out before ${hotel.policies.checkOut}.`,
        },

        {
          question: `Does ${hotel.name} have parking?`,
          answer: `${hotel.amenities?.parking ? "Yes" : "No"}, there ${
            hotel.amenities?.parking ? "is" : "isn't any"
          } parking available at ${
            hotel.name
          }. If you're looking for a hotel with space to park, simply filter by properties which have 'Parking' under 'Amenities' in the search results.`,
        },

        // {
        //   question: `How far away from London city centre is ${hotel.name}?`,
        //   answer: `${hotel.name} is 1.0 miles away from London city centre.`,
        // },
      ],
    },
  ];
  const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);

  const handleToggleFAQ = (index) => {
    dispatch(toggleFAQ(index));
  };

  return (
    <Container className='container' sx={{ pt: { md: "96px", xs: "60px" } }}>
      {IndividualHotelFaqData.map((hotel, hotelIndex) => (
        <Box key={hotelIndex}>
          <Typography
            variant='h4'
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "700",
              fontSize: { md: "40px", xs: "20px" },
              color: "#161616",

              lineHeight: "24px",
              flex: 1,
            }}
          >
            {hotel.hotelName}: FAQs
          </Typography>

          {hotel.faq.map((faqItem, faqIndex) => (
            <Box key={faqIndex} sx={{ mt: "16px" }}>
              <Box
                onClick={() => handleToggleFAQ(faqIndex)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  // borderBottom: "1px solid grey",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    fontFamily: "sans-serif",
                    fontWeight: "700",
                    fontSize: "20px",
                    lineHeight: "24px",
                    flex: 1,
                    color: "#161616",
                  }}
                >
                  {faqItem.question}
                </Typography>
                <IconButton
                  sx={{
                    color: "black",
                    transform: visibleFAQs[faqIndex]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              {visibleFAQs[faqIndex] && (
                <Box sx={{ padding: "10px 0" }}>
                  <Typography sx={{ fontSize: "16px", color: "black" }}>
                    {faqItem.answer}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default IndividualHotelFAQ;
