import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getHotels } from "../services/hotel";
import { GlobalContext } from "../context/GlobalContext";
import HotelLocationIcon from "../Components/Assets/hotel-location-icon.png";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};

const CityHotelsMap = () => {
  const { locations } = useContext(GlobalContext);

  const params = useParams();
  const countryParams = params?.country;
  const cityParams = params.city;
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });

  const fetchHotelsWithSearch = async (filters, action) => {
    setLoading({
      active: true,
      action: action,
    });
    const hotelsData = await getHotels(filters);
    if (hotelsData.success) {
      setHotels(hotelsData.data);
    } else {
      setError({
        active: true,
        message: hotelsData.error,
        action: action,
      });
    }
    setLoading({
      active: false,
      action: "",
    });
  };

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }
    let query = {};
    if (countryParams && cityParams) {
      let foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
          loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
      );
      if (foundCity) {
        query.country = countryParams;
        query.city = cityParams;
      }
    }
    fetchHotelsWithSearch(query, "page");
  }, [locations, cityParams, countryParams]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error(
      "Google Maps API key is missing. Please set REACT_APP_GOOGLE_MAPS_API_KEY."
    );
    return <p>Google Maps API key is missing.</p>;
  }

  let foundCity = locations?.find(
    (loc) =>
      loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
      loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
  );

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
  // Set map center to the first hotel or default
  const center =
    hotels.length > 0
      ? {
          lat: hotels[0].location.coordinates[1],
          lng: hotels[0].location.coordinates[0],
        }
      : {
          lat: 51.5227,
          lng: -0.125,
        };

  return (
    <Container
      className='container'
      sx={{
        mt: "40px",
      }}
    >
      <Typography
        sx={{
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "50px",
          pb: "24px",
        }}
      >
        See all hotels in {foundCity?.cityName || "City"}
      </Typography>

      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        <Alert severity='error' sx={{ mt: "20px" }}>
          {error.message}
        </Alert>
      ) : (
        hotels.length > 0 && (
          <Box
            sx={{
              width: "100%",
              "& .gm-ui-hover-effect": {
                display: "none !important",
              },
            }}
          >
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
               zoom={11}
               onClick={() => setSelectedHotel(null)}
               options={{
                streetViewControl: false, // removes the yellow person
                mapTypeControl: false,    // removes "Map" and "Satellite" toggle
                fullscreenControl: false, // optional: removes fullscreen icon
                zoomControl: true,
                rotateControl: false,
                        
              }}

              
              >
                {hotels.map((hotel) => (
                  <Marker
                    key={hotel.id}
                    position={{
                      lat: hotel.location.coordinates[1],
                      lng: hotel.location.coordinates[0],
                    }}
                    onLoad={(marker) => {
                      if (window.google) {
                        marker.setIcon({
                          url: HotelLocationIcon,
                          scaledSize: new window.google.maps.Size(40, 40),
                        });
                      }
                    }}
                    title={hotel.name}
                    onClick={() => setSelectedHotel(hotel)} // Set selected hotel on click
                  />
                ))}

                {/* Show InfoWindow when a marker is clicked */}
                {selectedHotel && (
                  <InfoWindow
                    position={{
                      lat: selectedHotel.location.coordinates[1],
                      lng: selectedHotel.location.coordinates[0],
                    }}

                    // onCloseClick={() => setSelectedHotel(null)} // Close window on click
                  >
                    <div>
                      <h3>{selectedHotel.name}</h3>
                      <img
                        src={selectedHotel.cover}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "150px",
                        }}
                      />
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </Box>
        )
      )}
    </Container>
  );
};

export default CityHotelsMap;
