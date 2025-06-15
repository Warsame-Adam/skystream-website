import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";

import { getHotels } from "../../services/hotel";
import { GlobalContext } from "../../context/GlobalContext";
import HotelLocationIcon from "../Assets/hotel-location-icon.png";


const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID          = "YOUR_MAP_ID";


const containerStyle  = { width: "100%", height: 300, borderRadius: 8 };

export default function CityHotelsMap() {
  /* load Google Maps script once */
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey : GOOGLE_MAPS_KEY,
    ...(MAP_ID && MAP_ID !== "YOUR_MAP_ID" ? { mapIds: [MAP_ID] } : {}),
  });

  /* data */
  const { locations } = useContext(GlobalContext);
  const { country: countryParams, city: cityParams } = useParams();

  const [hotels,        setHotels]   = useState([]);
  const [selectedHotel, setSelected] = useState(null);
  const [loading,       setLoading]  = useState({ active:false, action:"" });
  const [error,         setError]    = useState({ active:false, message:"", action:"" });

  useEffect(() => {
    if (!locations.length) return;
    const q = (countryParams && cityParams)
      ? { country: countryParams, city: cityParams }
      : {};
    (async () => {
      setLoading({ active:true, action:"page" });
      const res = await getHotels(q);
      if (res.success) setHotels(res.data);
      else             setError({ active:true, message:res.error, action:"page" });
      setLoading({ active:false, action:"" });
    })();
  }, [locations, countryParams, cityParams]);

  /* map refs */
  const mapRef     = useRef(null);
  const markersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  
  const drawMarkers = useCallback(() => {
    if (!mapRef.current) return;

    
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    hotels.forEach(hotel => {
      const marker = new window.google.maps.Marker({
        map      : mapRef.current,
        position : {
          lat: hotel.location.coordinates[1],
          lng: hotel.location.coordinates[0],
        },
        title    : hotel.name,
        icon     : {
          url: HotelLocationIcon,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });
      marker.addListener("click", () => setSelected(hotel));
      markersRef.current.push(marker);
    });
  }, [hotels]);

  
  useEffect(() => {
    if (isLoaded && mapReady) drawMarkers();
  }, [isLoaded, mapReady, drawMarkers]);

  
  const centre = hotels.length
    ? { lat: hotels[0].location.coordinates[1], lng: hotels[0].location.coordinates[0] }
    : { lat: 51.5227, lng: -0.125 };

  
  if (loadError)      return <Alert severity="error">Failed to load Google Maps.</Alert>;
  if (!GOOGLE_MAPS_KEY) return <Alert severity="error">Google Maps API key missing.</Alert>;

  const cityObj = locations.find(
    l => l.countryCode?.toLowerCase() === countryParams?.toLowerCase() &&
         l.cityCode?.toLowerCase()    === cityParams?.toLowerCase()
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography sx={{ fontSize: 30, fontWeight: 700, pb: 3 }}>
        See all hotels in {cityObj?.cityName ?? "City"}
      </Typography>

      {loading.active && loading.action === "page" ? (
        <Box minHeight={80} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={30} />
        </Box>
      ) : error.active && error.action === "page" ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>
      ) : (
        hotels.length > 0 && isLoaded && (
          <Box sx={{ "& .gm-ui-hover-effect": { display: "none !important" } }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centre}
              zoom={11}
              options={{
                ...(MAP_ID && MAP_ID !== "YOUR_MAP_ID" ? { mapId: MAP_ID } : {}),
                streetViewControl: false,
                mapTypeControl   : false,
                fullscreenControl: false,
                zoomControl      : true,
                rotateControl    : false,
              }}
              onLoad={map => {
                mapRef.current = map;
                setMapReady(true);
              }}
              onClick={() => setSelected(null)}
            >
              {selectedHotel && (
                <InfoWindow
                  position={{
                    lat: selectedHotel.location.coordinates[1],
                    lng: selectedHotel.location.coordinates[0],
                  }}
                  onCloseClick={() => setSelected(null)}
                >
                  <div>
                    <h3>{selectedHotel.name}</h3>
                    <img
                      src={selectedHotel.cover}
                      alt={selectedHotel.name}
                      style={{ width: "150px", height: "auto" }}
                    />
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </Box>
        )
      )}
    </Container>
  );
}
