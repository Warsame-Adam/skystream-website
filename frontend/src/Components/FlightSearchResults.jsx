import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Slider,
  IconButton,
} from '@mui/material';
import { FlightTakeoff, FlightLand, FavoriteBorder, Favorite } from '@mui/icons-material';

const FlightSearchResults = () => {
  const [sortBy, setSortBy] = useState('best');
  const [stops, setStops] = useState(['direct']);
  const [departureTime, setDepartureTime] = useState([0, 24]);

  // Sample flight data - in real app, this would come from props or API
  const flights = [
    {
      id: 1,
      airline: 'WizzAir',
      departureTime: '07:45',
      arrivalTime: '11:15',
      departureAirport: 'LTN',
      arrivalAirport: 'TAT',
      price: 20,
      duration: '2h 40',
      direct: true,
    },
    // Add more flight objects as needed
  ];

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleStopsChange = (stop) => {
    if (stops.includes(stop)) {
      setStops(stops.filter(s => s !== stop));
    } else {
      setStops([...stops, stop]);
    }
  };

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 3 }}>
      {/* Sort and Filter Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {/* Filters */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stops
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={stops.includes('direct')}
                    onChange={() => handleStopsChange('direct')}
                  />
                }
                label="Direct"
              />
              <Typography variant="body2" color="text.secondary">
                from £20
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Departure times
              </Typography>
              <Typography variant="body2" gutterBottom>
                Outbound
              </Typography>
              <Slider
                value={departureTime}
                onChange={handleDepartureTimeChange}
                min={0}
                max={24}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}:00`}
              />

              <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                Return
              </Typography>
              <Slider
                value={departureTime}
                onChange={handleDepartureTimeChange}
                min={0}
                max={24}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}:00`}
              />

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Journey duration
              </Typography>
              <Typography variant="body2">
                3.0 hours - 3.0 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          {/* Sort dropdown */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              {flights.length} result
            </Typography>
            <FormControl size="small">
              <Select
                value={sortBy}
                onChange={handleSortChange}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="best">Best</MenuItem>
                <MenuItem value="cheapest">Cheapest first</MenuItem>
                <MenuItem value="fastest">Fastest first</MenuItem>
                <MenuItem value="outbound">Outbound: Departure time</MenuItem>
                <MenuItem value="return">Return: Departure time</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Flight Cards */}
          {flights.map((flight) => (
            <Card key={flight.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Airline Logo/Name */}
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">
                      {flight.airline}
                    </Typography>
                  </Grid>

                  {/* Flight Details */}
                  <Grid item xs={7}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6">
                        {flight.departureTime}
                      </Typography>
                      <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                        {flight.duration}
                      </Typography>
                      <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc' }} />
                      <Typography variant="h6">
                        {flight.arrivalTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2">
                        {flight.departureAirport}
                      </Typography>
                      <Typography variant="subtitle2">
                        {flight.arrivalAirport}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Price and Select Button */}
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <IconButton size="small">
                        <FavoriteBorder />
                      </IconButton>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          £{flight.price}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Select →
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightSearchResults;
