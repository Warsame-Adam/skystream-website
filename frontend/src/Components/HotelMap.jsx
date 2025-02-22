import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Container } from "@mui/material";

import HotelIcon from "../Components/Assets/hotel_Icon.jpg";
import MuseumIcon from "../Components/Assets/museum_Icon.jpg";
import TrainIcon from "../Components/Assets/train_Icon.jpg";
import PlaneIcon from "../Components/Assets/plane_Icon.jpg";

const HotelMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const hotelLocation = { lat: 51.5227, lng: -0.125 };
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  const mapOptions = {
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  };

  const placeTypeIcons = {
    museum: MuseumIcon,
    train_station: TrainIcon,
    airport: PlaneIcon,
  };

  const fetchNearbyPlaces = () => {
    if (mapRef.current && isLoaded) {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      service.nearbySearch(
        {
          location: hotelLocation,
          radius: 1000,
          type: ["museum", "train_station", "airport"],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // Map results to include type and icon
            const places = results.map((place) => {
              // Identify the primary type for the place
              const primaryType = place.types.find((type) =>
                ["museum", "train_station", "airport"].includes(type)
              );

              return {
                id: place.place_id,
                name: place.name,
                position: place.geometry.location,
                type: primaryType,
                icon: placeTypeIcons[primaryType] || null,
                address: place.vicinity,
              };
            });

            setNearbyPlaces(places);
          }
        }
      );
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    fetchNearbyPlaces();
  };

  useEffect(() => {
    if (isLoaded) {
      fetchNearbyPlaces();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={hotelLocation}
        zoom={14}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        <Marker
          position={hotelLocation}
          icon={{
            url: HotelIcon,
            scaledSize: { width: 35, height: 35 },
          }}
          title='Kimpton - Fitzroy London'
        />

        {nearbyPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={{
              url: place.icon,
              scaledSize: { width: 35, height: 35 },
            }}
            onClick={() => setSelectedMarker(place)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Container>
  );
};

export default HotelMap;
