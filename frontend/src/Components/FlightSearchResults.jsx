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
import { FavoriteBorder } from '@mui/icons-material';

const FlightSearchResults = () => {
  const [sortBy, setSortBy] = useState('best');
  const [stops, setStops] = useState(['direct', 'oneStop']);
  const [selectedAirlines, setSelectedAirlines] = useState(['WizzAir', 'EasyJet', 'British Airways', 'Airline Combinations']);
  const [departureTime, setDepartureTime] = useState([0, 24]);
  const [returnTime, setReturnTime] = useState([0, 24]);
  const [journeyDuration, setJourneyDuration] = useState([3, 13]);

  const flights = [
    {
      id: 1,
      airline: 'WizzAir',
      departureTime: '06:10',
      arrivalTime: '10:15',
      returnDepartureTime: '18:00',
      returnArrivalTime: '22:05',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 21,
      outboundDuration: '4h 05',
      returnDuration: '4h 05',
      direct: true,
    },
    {
      id: 2,
      airline: 'EasyJet',
      departureTime: '15:00',
      arrivalTime: '19:10',
      returnDepartureTime: '23:00',
      returnArrivalTime: '03:10',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 25,
      outboundDuration: '4h 10',
      returnDuration: '4h 10',
      direct: true,
    },
    {
      id: 3,
      airline: 'British Airways',
      departureTime: '09:30',
      arrivalTime: '12:50',
      returnDepartureTime: '20:00',
      returnArrivalTime: '23:20',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 35,
      outboundDuration: '3h 20',
      returnDuration: '3h 20',
      direct: true,
    },
    {
      id: 4,
      outboundAirline: 'WizzAir',
      returnAirline: 'Ryanair',
      departureTime: '08:25',
      arrivalTime: '17:15',
      returnDepartureTime: '19:45',
      returnArrivalTime: '08:00',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 47,
      outboundDuration: '7h 50',
      returnDuration: '11h 15',
      direct: false,
      oneStop: {
        outbound: true,
        outboundStop: 'BUD',
      },
      selfTransfer: true,
    },
    {
      id: 5,
      outboundAirline: 'EasyJet',
      returnAirline: 'Ryanair',
      departureTime: '10:30',
      arrivalTime: '14:50',
      returnDepartureTime: '18:15',
      returnArrivalTime: '22:40',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 53,
      outboundDuration: '4h 20',
      returnDuration: '4h 25',
      direct: false,
      oneStop: {
        return: true,
        returnStop: 'FRA',
      },
      selfTransfer: true,
    },
    {
      id: 6,
      airline: 'British Airways',
      departureTime: '07:00',
      arrivalTime: '11:00',
      returnDepartureTime: '20:00',
      returnArrivalTime: '00:15',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 40,
      outboundDuration: '4h 00',
      returnDuration: '4h 15',
      direct: false,
      oneStop: {
        outbound: true,
        outboundStop: 'CDG',
      },
      selfTransfer: false,
    },
    {
      id: 7,
      airline: 'WizzAir',
      departureTime: '06:45',
      arrivalTime: '10:55',
      returnDepartureTime: '19:15',
      returnArrivalTime: '22:45',
      departureAirport: 'LHR',
      arrivalAirport: 'TIA',
      price: 50,
      outboundDuration: '4h 10',
      returnDuration: '3h 30',
      direct: true,
      airlineCombination: true,
    },
  ];

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
  };

  const handleStopsChange = (stop) => {
    if (stops.includes(stop)) {
      setStops(stops.filter((s) => s !== stop));
    } else {
      setStops([...stops, stop]);
    }
  };

  const handleAirlineChange = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  const handleReturnTimeChange = (event, newValue) => {
    setReturnTime(newValue);
  };

  const handleJourneyDurationChange = (event, newValue) => {
    setJourneyDuration(newValue);
  };

  const filteredFlights = flights.filter((flight) => {
    const outboundDeparture = parseInt(flight.departureTime.split(':')[0], 10);
    const returnDeparture = parseInt(flight.returnDepartureTime.split(':')[0], 10);
    const outboundDuration = parseFloat(flight.outboundDuration);
    const returnDuration = parseFloat(flight.returnDuration);

    return (
      stops.includes(flight.direct ? 'direct' : 'oneStop') &&
      selectedAirlines.some((airline) =>
        flight.outboundAirline?.includes(airline) || flight.airline?.includes(airline)
      ) &&
      outboundDeparture >= departureTime[0] &&
      outboundDeparture <= departureTime[1] &&
      returnDeparture >= returnTime[0] &&
      returnDeparture <= returnTime[1] &&
      outboundDuration >= journeyDuration[0] &&
      outboundDuration <= journeyDuration[1]
    );
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'cheapest') {
      return a.price - b.price;
    } else if (sortBy === 'outbound') {
      return parseFloat(a.outboundDuration) - parseFloat(b.outboundDuration);
    } else if (sortBy === 'return') {
      return parseFloat(a.returnDuration) - parseFloat(b.returnDuration);
    } else if (sortBy === 'fastest') {
      return parseFloat(a.outboundDuration + a.returnDuration) - parseFloat(b.outboundDuration + b.returnDuration);
    } else {
      return (a.price * 0.5 + parseFloat(a.outboundDuration + a.returnDuration) * 0.5) - (b.price * 0.5 + parseFloat(b.outboundDuration + b.returnDuration) * 0.5);
    }
  });

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 3 }}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {/* Filters */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="black">
                Stops
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stops.includes('direct')}
                      onChange={() => handleStopsChange('direct')}
                    />
                  }
                  label={<Typography color="black">Direct</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stops.includes('oneStop')}
                      onChange={() => handleStopsChange('oneStop')}
                    />
                  }
                  label={<Typography color="black">One stop</Typography>}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom color="black">
                Departure times
              </Typography>
              <Typography variant="body2" gutterBottom color="black">
                Outbound: {departureTime[0]}:00 - {departureTime[1]}:00
              </Typography>
              <Slider
                value={departureTime}
                onChange={handleDepartureTimeChange}
                min={0}
                max={24}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}:00`}
              />

              <Typography variant="body2" gutterBottom sx={{ mt: 2 }} color="black">
                Return: {returnTime[0]}:00 - {returnTime[1]}:00
              </Typography>
              <Slider
                value={returnTime}
                onChange={handleReturnTimeChange}
                min={0}
                max={24}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}:00`}
              />

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom color="black">
                Journey duration
              </Typography>
              <Typography variant="body2" gutterBottom color="black">
                {journeyDuration[0]} hours - {journeyDuration[1]} hours
              </Typography>
              <Slider
                value={journeyDuration}
                onChange={handleJourneyDurationChange}
                min={3}
                max={13}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} hours`}
              />

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom color="black">
                Airlines
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '200px', overflow: 'auto' }}>
                {['WizzAir', 'EasyJet', 'British Airways', 'Airline Combinations'].map((airline) => (
                  <FormControlLabel
                    key={airline}
                    control={
                      <Checkbox
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => handleAirlineChange(airline)}
                      />
                    }
                    label={<Typography color="black">{airline}</Typography>}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          {/* Sort dropdown */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="black">
              {sortedFlights.length} results
            </Typography>
            <FormControl size="small">
              <Select
                value={sortBy}
                onChange={handleSortChange}
                sx={{ minWidth: 200, color:"black" }}
              
              >
                <MenuItem sx={{color:"black"}} value="best">Best</MenuItem>
                <MenuItem sx={{color:"black"}} value="cheapest">Cheapest first</MenuItem>
                <MenuItem sx={{color:"black"}} value="fastest">Fastest first</MenuItem>
                <MenuItem sx={{color:"black"}} value="outbound">Outbound: Shortest time</MenuItem>
                <MenuItem sx={{color:"black"}} value="return">Return: Shortest time</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {sortedFlights.length > 0 ? (
            sortedFlights.map((flight) => (
              <Card key={flight.id} sx={{ mb: 2, minHeight: '150px' }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography variant="subtitle1" color="black" sx={{ textAlign: 'left',  }}>
                        {flight.outboundAirline || flight.airline}
                      </Typography>
                      <Typography variant="subtitle2" color="black" sx={{ textAlign: 'left', mt: 1 }}>
                        {flight.returnAirline || flight.airline}
                      </Typography>
                    </Grid>

                    <Grid item xs={7} sx={{ position: 'relative' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
                        <Typography variant="h6" color="black">
                          {flight.departureTime}
                        </Typography>
                        <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc', position: 'relative' }}>
                          {flight.oneStop?.outbound && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '-4px',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'pink',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="h6" color="black">
                          {flight.arrivalTime}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                        {flight.oneStop?.outbound
                          ? `1 stop at ${flight.oneStop.outboundStop}`
                          : 'Direct'}
                      </Typography>
                      <Typography variant="body2" color="black" sx={{ textAlign: 'center', mb: 2 }}>
                        {flight.outboundDuration}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Typography variant="h6" color="black">
                          {flight.returnDepartureTime}
                        </Typography>
                        <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc', position: 'relative' }}>
                          {flight.oneStop?.return && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '-4px',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'pink',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="h6" color="black">
                          {flight.returnArrivalTime}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                        {flight.oneStop?.return
                          ? `1 stop at ${flight.oneStop.returnStop}`
                          : 'Direct'}
                      </Typography>
                      <Typography variant="body2" color="black" sx={{ textAlign: 'center' }}>
                        {flight.returnDuration}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sx={{ textAlign: 'right', position: 'relative' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton size="small">
                          <FavoriteBorder />
                        </IconButton>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" gutterBottom color="black">
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
                      {(flight.oneStop && flight.selfTransfer) && (
                        <Typography variant="body2" color="pink" sx={{ mt: 1 }}>
                          🚨 Self transfer
                          </Typography>
                        )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" color="black" gutterBottom>
                  Sorry, there aren't any flights that match your filters.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="No flights match your filters"
                    style={{ width: '150px', height: '150px' }}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setDepartureTime([0, 24]);
                      setReturnTime([0, 24]);
                      setJourneyDuration([3, 13]);
                    }}
                  >
                    Show all {flights.length} results
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightSearchResults;