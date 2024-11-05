import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, AdvancedMarker, useJsApiLoader, APIProvider } from '@react-google-maps/api';
import { Container } from '@mui/material';

import HotelIcon from "../Components/Assets/hotel_Icon.png";
import PlaneIcon from "../Components/Assets/plane_Icon.png";
import TrainIcon from "../Components/Assets/train_Icon.png";
import MuseumIcon from "../Components/Assets/museum_Icon.png";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const HotelMap = () => {
  const hotelLocation = { lat: 51.5227, lng: -0.1250 }; 

  const mapOptions = {
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
  };


  return (
    <Container sx={{marginTop:"50px"}}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={hotelLocation}
              zoom={15}
              options={mapOptions}
          >
              {/* Basic Marker */}
              <Marker position={hotelLocation} />
          </GoogleMap>
      </LoadScript>
      </Container>
  );
};





export default HotelMap;