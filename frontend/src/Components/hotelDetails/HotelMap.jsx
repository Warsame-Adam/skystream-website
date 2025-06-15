import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Container } from "@mui/material";

import HotelLocationIcon from "../Assets/hotel-location-icon.png";


const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID          = "YOUR_MAP_ID";       
const MAP_LIBRARIES   = ["marker"];


export default function HotelMap({ hotel }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries:       MAP_LIBRARIES,
    mapIds:          [MAP_ID],
  });
  const mapRef = useRef(null);

  const hotelLocation = {
    lat: hotel.location.coordinates[1],
    lng: hotel.location.coordinates[0],
  };

 
  const makeIconContent = (url, sizePx) => {
    const img = document.createElement("img");
    img.src     = url;
    img.width   = sizePx;
    img.height  = sizePx;
    
    img.style.setProperty("--gm-marker-background",       "transparent");
    img.style.setProperty("--gm-marker-border-color",     "transparent");
    return img;
  };

  const onMapLoad = async (map) => {
    mapRef.current = map;
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

    
    const marker = new AdvancedMarkerElement({
      map,
      position: hotelLocation,
      title:    hotel.name,
      content:  makeIconContent(HotelLocationIcon, 40),
    });

    
    marker.addListener("gmp-click", () => {
      new window.google.maps.InfoWindow({
        position: hotelLocation,
        content: `
          <div style="line-height:1.4">
            <strong>${hotel.name}</strong><br>
            ${hotel.address || ""}
          </div>
        `,
      }).open(map);
    });
  };

  if (loadError) return <p>Error loading map.</p>;
  if (!isLoaded)  return <p>Loading map…</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ width: "100%", height: 400 }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={hotelLocation}
          zoom={14}
          options={{
            mapId:             MAP_ID,
            mapTypeControl:    false,
            zoomControl:       true,
            streetViewControl: false,
            fullscreenControl: true,
          }}
          onLoad={onMapLoad}
        />
      </Box>
    </Container>
  );
}