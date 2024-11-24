import React from "react"
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, Container } from '@mui/material';
import ThreeStarImage  from "../Components/Assets/3StarImage.png";
import FourStarImage  from "../Components/Assets/4StarImage.png";
import FiveStarImage  from "../Components/Assets/5StarImage.png";

const StarRatingsData = [
    { image:ThreeStarImage, starRating:"3-star hotels" , properties:"5", PPN: "50"},
    { image:FourStarImage, starRating:"4-star hotels" , properties:"5", PPN: "50"},
    { image:FiveStarImage, starRating:"5-star hotels" , properties:"5", PPN: "50"}
]





const CityHotelStarRatings = () => {


    return (

        <Container sx={{transform: 'translateX(-45px)',}}>

            <Box sx={{paddingLeft:"10px"}}>

            <Typography sx={{fontSize:"32px", fontWeight:"bold"}}>
            Luxury stay or budget getaway?
            </Typography>

            <Typography sx={{fontSize:"15px"}}>
            Whether you're after 5-star comfort or ease on your wallet, we do the searching so you can sleep easy during your stay in Amsterdam.
            </Typography>

            </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", width:"100%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",}}  >
   {StarRatingsData.map((rating, index) => (
        <Card
        key={index}
        sx={{
          flex: 1,
          margin: 1,
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor:"pointer"
        }}
      >
        <CardMedia
          component="img"
          height="190px"
          image={rating.image}
          alt={rating.name}
        />
        <CardContent
          sx={{
            padding: "8px",
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
              sx={{
                color: "black",
                fontSize: "19px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              {rating.starRating}
            </Typography>

            <Typography
              sx={{
                color: "black",
                fontSize: "11px",
                marginBottom: "8px",
              }}
            >
              5 properties
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
              sx={{ color: "black", fontSize: "15px", fontWeight: "bold" }}
            >
              {rating.PPN}
            </Typography>
            <Typography sx={{ color: "grey", fontSize: "11px" }}>
              per night
            </Typography>
          </Box>
        </CardContent>
      </Card>
      ))}

      </Box>

      </Container>


    )
}




export default CityHotelStarRatings;