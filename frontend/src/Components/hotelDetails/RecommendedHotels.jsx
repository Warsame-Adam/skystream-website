import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Grid,
  IconButton,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Rating,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { getRecommendedHotels } from "../../services/hotel";
import { Link } from "react-router-dom";



const getMinPrice = (hotel) => {
  if (
    !hotel.deals ||
    hotel.deals.length === 0 ||
    hotel.deals.flatMap((deal) => deal.rooms).length === 0
  )
    return 0;
  return hotel.deals
    .flatMap((deal) => deal.rooms) // Flatten rooms from all deals
    .reduce((min, room) => Math.min(min, room.pricePerNight), Infinity);
};
const RecommendedHotels = ({ hotel }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [data, setData] = useState({
    similarHotelsData: [],
    recommendedHotels: [],
    
  });
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [indices, setIndices] = useState({
    0: 0,
    1: 0,
    
  });

  const hotelDataMap = {
    0: data.similarHotelsData,
    1: data.recommendedHotels,
    
  };

  const handleNext = () => {
    setIndices((prevIndices) => {
      const maxIndex = hotelDataMap[selectedTab].length - 3;
      const newIndices = { ...prevIndices };
      if (prevIndices[selectedTab] < maxIndex) {
        newIndices[selectedTab] += 3;
      }
      return newIndices;
    });
  };

  const handlePrev = () => {
    setIndices((prevIndices) => {
      const newIndices = { ...prevIndices };
      if (prevIndices[selectedTab] > 0) {
        newIndices[selectedTab] -= 3;
      }
      return newIndices;
    });
  };

  const currentHotels = hotelDataMap[selectedTab].slice(
    indices[selectedTab],
    indices[selectedTab] + 3
  );

  const fetchRecommendedHotels = async () => {
    setLoading({
      active: true,
      action: "page",
    });
    const res = await getRecommendedHotels(hotel._id);
    if (res.success) {
      if (res.data) {
        setData({
          similarHotelsData: res.data.similarHotelsData,
          recommendedHotels: res.data.recommendedHotels,
          
        });
      }
    } else {
      setError({
        active: true,
        message: res.error,
        action: "page",
      });
    }

    setLoading({
      active: false,
      action: "",
    });
  };

  useEffect(() => {
    fetchRecommendedHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadingUI = (
    <Box
      minHeight='80px'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress size='30px' />
    </Box>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <Container className='container' sx={{ pt: "30px" }}>
      <Typography
        variant='h3'
        sx={{
          fontSize: { md: "40px", xs: "24px" },
          fontWeight: "500",
          lineHeight: "40px",
        }}
      >
        Other recommended hotels
      </Typography>
      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        <Alert severity='error' sx={{ mt: "20px" }}>
          {error.message}
        </Alert>
      ) : (
        <>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            //TabIndicatorProps={{ style: { display: "none" } }}
            sx={{ borderBottom: "1px solid #d4d8de ", mt: "24px" }}
          >
            <Tab
              label='Similar hotels nearby'
              disableRipple
              sx={{
                color: "grey",
                textTransform: "none",
                fontSize: "16px",
                position: "relative",
                "&.Mui-selected": { color: "#0062e3" },
                "&:hover::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#e0e4e9",
                },
              }}
            />

            <Tab
              label='Top recommended hotels nearby'
              disableRipple
              sx={{
                color: "grey",
                textTransform: "none",
                fontSize: "16px",
                position: "relative",
                "&.Mui-selected": { color: "#0062e3" },
                "&:hover::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#e0e4e9",
                },
              }}
            />


          </Tabs>

          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            gap={1}
            my={1}
          >
            <IconButton
              disabled={indices[selectedTab] === 0}
              onClick={handlePrev}
              sx={{
                backgroundColor: "#e0e4e9",
                borderRadius: "8px",
                p: "6px 10px",
                "&.Mui-disabled": {
                  backgroundColor: "#e0e4e9",
                },
              }}
            >
              <KeyboardArrowLeftOutlinedIcon fontSize='medium' />
            </IconButton>

            <IconButton
              disabled={
                indices[selectedTab] + 3 >= hotelDataMap[selectedTab].length
              }
              onClick={handleNext}
              sx={{
                backgroundColor: "#e0e4e9",
                borderRadius: "8px",
                p: "6px 10px",
                "&.Mui-disabled": {
                  backgroundColor: "#e0e4e9",
                },
              }}
            >
              <KeyboardArrowRightOutlinedIcon fontSize='medium' />
            </IconButton>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              flexWrap: "wrap",
              mt: "20px",
            }}
          >
            {currentHotels.map((hotel, index) => (
              <Grid item md={4} xs={12} key={index}>
                <Link
                  to={`/hotels/${hotel?.city?.countryCode}/${hotel?.city.cityCode}/${hotel.name}/${hotel._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component='img'
                        height='200'
                        src={hotel.cover}
                        alt={hotel.name}
                        sx={{ borderRadius: "12px 12px 0 0" }}
                      />

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant='body1'
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
                          }}
                        >
                          {hotel.name}
                        </Typography>
                        <Rating
                          readOnly
                          value={
                            hotel.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                            ) / hotel.reviews.length
                          }
                        />
                      </Box>
                    </Box>
                    <CardContent
                      sx={{
                        px: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant='subtitle1'
                          sx={{
                            color: "black",
                            fontSize: "19px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {hotel?.city?.cityName}
                        </Typography>

                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "11px",
                            marginBottom: "8px",
                          }}
                        >
                          {hotel?.city?.countryName}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography sx={{ color: "grey", fontSize: "11px" }}>
                          From
                        </Typography>
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          £{getMinPrice(hotel)}
                        </Typography>
                        <Typography sx={{ color: "grey", fontSize: "11px" }}>
                          per night
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default RecommendedHotels;
