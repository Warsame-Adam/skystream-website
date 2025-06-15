import React, { useContext } from "react";
import {
  Input,
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GlobalContext } from "../../context/GlobalContext";

const HomeFooter = () => {
  const { visitorData } = useContext(GlobalContext);
  return (
    <Box
      sx={{
        backgroundColor: "common.blue",
        color: "text.primary",
        py: "50px",
        // mt: "2rem",
      }}
    >
      <Container className='container'>
        <Grid
          container
          sx={{
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "space-between",
            marginBottom: "2rem",
            gap: "20px",
          }}
        >
          <Grid md={4} item sx={{ flex: "1" }}>
            {visitorData && (
              <Typography
                variant='subtitle1'
                sx={{ fontSize: "12px", fontWeight: 700 }}
              >
                {`${visitorData?.country} - ${
                  visitorData?.language
                } (${visitorData?.languageCode.toUpperCase()}) • ${
                  visitorData?.currency?.code
                } (${visitorData?.currency?.symbol})`}
              </Typography>
            )}
          </Grid>

          <Box sx={{ flex: "1" }}>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, pb: "8px" }}>
                Help
              </Typography>
            </Link>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, py: "8px" }}>
                Privacy Settings
              </Typography>
            </Link>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, py: "8px" }}>
                Log in
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flex: "1" }}>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, pb: "8px" }}>
                Cookie policy
              </Typography>
            </Link>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, py: "8px" }}>
                Privacy policy
              </Typography>
            </Link>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, py: "8px" }}>
                Terms of service
              </Typography>
            </Link>
            <Link
              href='#'
              color='inherit'
              underline='hover'
              style={{ textDecoration: "none" }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, py: "8px" }}>
                Company Details
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flex: "1" }}>
            <Accordion
              elevation={0}
              sx={{
                mt: "0 !important",

                backgroundColor: "transparent",
                color: "white",
                boxShadow: "none",
                border: "none",
                "&:before": { height: "0px" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize='small'
                    sx={{ color: "text.primary" }}
                  />
                }
                sx={{
                  mb: "18px",
                  mt: "0 !important",
                  minHeight: "unset !important",
                  padding: 0,
                  borderBottom: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiAccordionSummary-content": {
                    m: "0 !important",
                  },
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  Explore
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ py: 0 }}>
                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Domestic flights
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Cities
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Airports
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Flights
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Hotels
                  </Typography>
                </Link>
              </AccordionDetails>
            </Accordion>

            <Accordion
              elevation={0}
              sx={{
                backgroundColor: "transparent",
                color: "text.primary",
                boxShadow: "none",
                border: "none",
                mt: "0 !important",

                "&:before": { height: "0px" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon fontSize='small' sx={{ color: "white" }} />
                }
                sx={{
                  mb: "18px",
                  mt: "0 !important",
                  minHeight: "unset !important",
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiAccordionSummary-content": {
                    m: "0 !important",
                  },
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  Company
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ py: 0 }}>
                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    About us
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Jobs
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Sustainability
                  </Typography>
                </Link>
              </AccordionDetails>
            </Accordion>

            <Accordion
              elevation={0}
              sx={{
                mt: "0 !important",

                backgroundColor: "transparent",
                color: "white",
                boxShadow: "none",
                border: "none",
                "&:before": { height: "0px" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize='small'
                    sx={{ color: "text.primary" }}
                  />
                }
                sx={{
                  mb: "18px",
                  mt: "0 !important",

                  minHeight: "unset !important",
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiAccordionSummary-content": {
                    m: "0 !important",
                  },
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700 }}>
                  Partners
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ py: 0 }}>
                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Work with us
                  </Typography>
                </Link>

                <Link
                  href='#'
                  color='inherit'
                  underline='hover'
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant='body2' sx={{ py: "8px" }}>
                    Travel APIs
                  </Typography>
                </Link>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            padding: "1rem 0",
            borderTop: "1px solid #ffffff40",
          }}
        >
          <Typography variant='caption'>
            Compare and book cheap flights from anywhere, to everywhere
          </Typography>
          <Typography variant='caption' display='block'>
            © SkyStream ltd 2002-2024
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeFooter;
