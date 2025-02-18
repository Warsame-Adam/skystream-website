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
import { toggleFAQ } from "../Slices/FAQVisible";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "How can I find the best flight deals?",
    answer:
      "To find the cheapest flights, start your search without entering a specific departure date. Instead, select ‘Whole month’ and then choose ‘Cheapest month’ to see which dates offer the best fares for flights from the United Kingdom. If you’re open to traveling anywhere, use the Everywhere Search option, which will show you the best deals available from your departure location. Just input your starting city or airport, select your dates, and hit ‘Everywhere’ to explore your options.",
  },
  {
    question: "How can I find the best last minute flight deals?",
    answer:
      "Booking at the last minute can sometimes get you cheaper flights, though it’s not guaranteed. If you're flexible and want to travel soon, try searching for flights to ‘Everywhere’ to see the latest deals available for spontaneous trips. If you have a destination in mind, use the ‘whole month’ option to explore the cheapest flights within the next few weeks by selecting the upcoming month to find the best travel days.",
  },
  {
    question: "What happens after I've booked my flight?",
    answer:
      "Once you've chosen your flight, you'll complete your booking with one of our airline or travel partners, often on their website. Your confirmation email and all booking details will be sent directly from them. If you’ve booked directly through our site, we’ll send your confirmation via email as well. You can always check your account on our website or app for your booking details or contact our Customer Support team for assistance.",
  },
  {
    question: "Where should I book a flight to right now?",
    answer:
      "New York is currently one of the most popular destinations among travelers. If you’re looking for more travel inspiration, use the Everywhere search to uncover great flight deals to a variety of exciting destinations.",
  },
];

const FlightFAQ = () => {
  const dispatch = useDispatch();

  const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);

  const handleToggleFAQ = (index) => {
    dispatch(toggleFAQ(index));
  };

  return (
    <Container className='container' sx={{ pt: "40px" }}>
      <Typography
        sx={{ fontWeight: "bold", paddingBottom: "10px", fontSize: "32px" }}
      >
        Finding flight deals: frequently asked questions
      </Typography>

      <Box sx={{ width: { md: "65%", xs: "100%" } }}>
        {faqData.map((faq, index) => (
          <Box>
            <Box
              onClick={() => handleToggleFAQ(index)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingBottom: "5px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  borderBottom: "0.5px solid grey",
                  paddingBottom: "5px",
                  flexGrow: 1,
                  fontWeight: "bold",
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
              <Typography sx={{ marginTop: "10px", fontSize: "16px" }}>
                {faq.answer}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FlightFAQ;
