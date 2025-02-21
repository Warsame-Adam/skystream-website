import React from "react";
import { Box, Container, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};

const center = {
  lat: 51.5227,
  lng: -0.125,
};

const CityHotelsMap = () => {
  const params = useParams();

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error(
      "Google Maps API key is missing. Please set REACT_APP_GOOGLE_MAPS_API_KEY."
    );
    return <p>Google Maps API key is missing.</p>;
  }
  return (
    <Container className='container' sx={{ mt: "40px" }}>
      <Typography
        sx={{
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "50px",
          pb: "24px",
        }}
      >
        See all hotels in {params.city || "City"}
      </Typography>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Container>
  );
};

export default CityHotelsMap;
