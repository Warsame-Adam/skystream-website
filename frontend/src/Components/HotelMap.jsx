import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, AdvancedMarker, useJsApiLoader } from '@react-google-maps/api';
import { Container } from '@mui/material';

import HotelIcon from "../Components/Assets/hotel_Icon.png";
import PlaneIcon from "../Components/Assets/plane_Icon.png";
import TrainIcon from "../Components/Assets/train_Icon.png";
import MuseumIcon from "../Components/Assets/museum_Icon.png";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const HotelMap = () => {
  const mapRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const hotelLocation = { lat: 51.5204, lng: -0.1255 }; // Example location

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const mapOptions = {
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'], 
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const service = new window.google.maps.places.PlacesService(mapRef.current);

      const request = {
        location: hotelLocation,
        radius: 1000,
        types: ['museum', 'transit_station', 'airport']
      };

      service.nearbySearch(request, (results, status) => {
        console.log("Nearby search status:", status);

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      
      new window.google.maps.marker.AdvancedMarkerView({
        position: hotelLocation,
        map: mapRef.current,
        content: `<img src="${HotelIcon}" style="width:40px; height:40px;" alt="Hotel Icon">`,
      });

      
      places.forEach((place) => {
        const iconUrl = place.types.includes('museum') ? MuseumIcon :
                        place.types.includes('transit_station') ? TrainIcon :
                        place.types.includes('airport') ? PlaneIcon : null;

        if (iconUrl) {
          new window.google.maps.marker.AdvancedMarkerView({
            position: place.geometry.location,
            map: mapRef.current,
            content: `<img src="${iconUrl}" style="width:30px; height:30px;" alt="${place.name} Icon">`,
          });
        }
      });
    }
  }, [isLoaded, places]);

  return (
    <Container>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={hotelLocation}
          zoom={15}
          options={mapOptions}
          onLoad={(map) => { mapRef.current = map; }}
        />
      ) : (
        <div>Loading map...</div>
      )}
    </Container>
  );
  

  
};


export default HotelMap;