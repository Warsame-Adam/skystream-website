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
  Collapse,
} from '@mui/material';
import { FavoriteBorder, ExpandMore, ExpandLess, Flight, ArrowForward } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

const FlightSearchResults = () => {
  const [sortBy, setSortBy] = useState('best');
  const [stops, setStops] = useState(['direct', 'oneStop']);
  const [selectedAirlines, setSelectedAirlines] = useState(['WizzAir', 'EasyJet', 'British Airways', 'Airline Combinations']);
  const [departureTime, setDepartureTime] = useState([0, 24]);
  const [returnTime, setReturnTime] = useState([0, 24]);
  const [journeyDuration, setJourneyDuration] = useState([3, 13]);
  const [expandedSections, setExpandedSections] = useState({
    stops: true,
    departureTimes: true,
    journeyDuration: true,
    airlines: true,
  });
  const showInputs = useSelector((state) => state.flightSearch.showInputs);

  const flights = [
    {
      id: 1,
      outboundAirline: 'WizzAir',
      returnAirline: 'WizzAir',
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
      outboundAirline: 'EasyJet',
      returnAirline: 'EasyJet',
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
      outboundAirline: 'British Airways',
      returnAirline: 'British Airways',
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
      outboundAirline: 'British Airways',
      returnAirline: 'British Airways',
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
      outboundAirline: 'WizzAir',
      returnAirline: 'WizzAir',
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
    },
  ];

  const handleToggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

    const isAirlineCombination = flight.outboundAirline !== flight.returnAirline;
    const matchesAirlineSelection = selectedAirlines.some((airline) => {
      if (airline === 'Airline Combinations') {
        return isAirlineCombination;
      } else {
        return (
          flight.outboundAirline.includes(airline) ||
          flight.returnAirline.includes(airline)
        );
      }
    });

    return (
      stops.includes(flight.direct ? 'direct' : 'oneStop') &&
      matchesAirlineSelection &&
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
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2, marginTop: showInputs ? "220px": "50px", marginLeft: '200px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {/* Filters */}
          <Card>
            <CardContent>
              {/* Stops Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom color="black">
                  Stops
                </Typography>
                <IconButton onClick={() => handleToggleSection('stops')}>
                  {expandedSections.stops ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Collapse in={expandedSections.stops} timeout="auto" unmountOnExit>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stops.includes('direct')}
                        onChange={() => handleStopsChange('direct')}
                        sx={{ color: '#626971', marginRight: "10px", marginLeft:"12px", marginBottom:"30px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }}
                      />
                    }
                    label={<Typography sx={{color:"black", marginBottom:"30px", fontSize:"14px"}}>Direct</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stops.includes('oneStop')}
                        onChange={() => handleStopsChange('oneStop')}
                        sx={{ color: '#626971', marginRight: "10px", marginLeft:"12px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }}
                      />
                    }
                    label={<Typography sx={{color:"black", fontSize:"14px"}}>One stop</Typography>}
                  />
                </Box>
              </Collapse>

              <Divider sx={{ my: 2 }} />

              {/* Departure Times Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography  gutterBottom sx={{color:"black", fontSize:"20px", fontWeight:"bold", marginBottom:"20px"}}>
                  Departure times
                </Typography>
                <IconButton onClick={() => handleToggleSection('departureTimes')}>
                  {expandedSections.departureTimes ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Collapse in={expandedSections.departureTimes} timeout="auto" unmountOnExit>
                <Typography gutterBottom sx={{color:"black", fontSize:"16px"}}>
                  Outbound
                </Typography>
                <Typography sx={{color:"black", fontSize:"16px"}}>
                {departureTime[0]}:00 - {departureTime[1]}:00
                </Typography>
                <Slider
                  value={departureTime}
                  onChange={handleDepartureTimeChange}
                  min={0}
                  max={24}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}:00`}
                  sx={{color:"#0062e3"}}
                />

                <Typography  gutterBottom sx={{ mt: 2, color:"black", fontSize:"16px" }} >
                  Return
                </Typography>
                <Typography sx={{color:"black", fontSize:"16px"}}>
                {returnTime[0]}:00 - {returnTime[1]}:00

                </Typography>
                <Slider
                  value={returnTime}
                  onChange={handleReturnTimeChange}
                  min={0}
                  max={24}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}:00`}
                  sx={{color:"#0062e3"}}
                />
              </Collapse>

              <Divider sx={{ my: 2 }} />

              {/* Journey Duration Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography  gutterBottom sx={{color:"black", fontSize:"20px", fontWeight:"bold"}}>
                  Journey duration
                </Typography>
                <IconButton onClick={() => handleToggleSection('journeyDuration')}>
                  {expandedSections.journeyDuration ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Collapse in={expandedSections.journeyDuration} timeout="auto" unmountOnExit>
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
                  sx={{color:"#0062e3"}}
                />
              </Collapse>

              <Divider sx={{ my: 2 }} />

              {/* Airlines Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography gutterBottom sx={{color:"black", fontSize:"20px", fontWeight:"bold"}}>
                  Airlines
                </Typography>
                <IconButton onClick={() => handleToggleSection('airlines')}>
                  {expandedSections.airlines ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Collapse in={expandedSections.airlines} timeout="auto" unmountOnExit>
                <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '200px', overflow: 'auto' }}>
                  {['WizzAir', 'EasyJet', 'British Airways', 'Airline Combinations'].map((airline) => (
                    <FormControlLabel sx={{overflow: "hidden"}}
                      key={airline}
                      control={
                        <Checkbox
                          checked={selectedAirlines.includes(airline)}
                          onChange={() => handleAirlineChange(airline)}
                          sx={{ color: '#626971', marginRight: "10px", marginLeft:"12px", marginBottom:"30px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }}
                        />
                      }
                      label={<Typography sx={{color:"black", marginBottom:"30px", fontSize:"14px"}}>{airline}</Typography>}
                    />
                  ))}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* Sort dropdown */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="black">
              {sortedFlights.length} results
            </Typography>
            <FormControl size="small">
              <Select
                value={sortBy}
                onChange={handleSortChange}
                sx={{ minWidth: 200, color: "black" }}
              >
                <MenuItem sx={{ color: "black" }} value="best">Best</MenuItem>
                <MenuItem sx={{ color: "black" }} value="cheapest">Cheapest first</MenuItem>
                <MenuItem sx={{ color: "black" }} value="fastest">Fastest first</MenuItem>
                <MenuItem sx={{ color: "black" }} value="outbound">Outbound: Shortest time</MenuItem>
                <MenuItem sx={{ color: "black" }} value="return">Return: Shortest time</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {sortedFlights.length > 0 ? (
            sortedFlights.map((flight) => (
              <Card key={flight.id} sx={{ mb: 2, padding: 1, cursor:"pointer", height: '170px', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: "30px" }}>
                      <Typography variant="subtitle1" color="black" sx={{ textAlign: 'left', mt: -2, mb: 5, whiteSpace: 'nowrap' }}>
                        {flight.outboundAirline}
                      </Typography>
                      <Typography variant="subtitle1" color="black" sx={{ textAlign: 'left', mb: 1, whiteSpace: 'nowrap' }}>
                        {flight.returnAirline}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{ position: 'relative' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative', color:"#697279" }}>
                        <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="h6">
                          {flight.departureTime}
                        </Typography>
                        <Typography>
                          {flight.departureAirport}
                        </Typography>
                        </Box>
                        <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc', position: 'relative', width: '70%' }}>
                          {flight.oneStop?.outbound && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '55%',
                                top: '-4px',
                                transform: 'translateX(-50%)',

                                backgroundColor: '#c6007e',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                
                              }}
                            />
                          )}
                        </Box>
                        <Flight sx={{ fontSize: "17px", marginleft:"10px", marginRight:"5px", transform: 'rotate(90deg)', color:"#697279" }} />
                        <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="h6">
                          {flight.arrivalTime}
                        </Typography>
                        <Typography>
                          {flight.arrivalAirport}
                        </Typography>
                        </Box>
                      </Box>
                      <Typography   sx={{ textAlign: 'center', mb: 3, mt: -3, color:"#0c838a", fontSize:"12px" }}>
                        {flight.oneStop?.outbound
                          ? `1 stop at ${flight.oneStop.outboundStop}`
                          : 'Direct'}
                      </Typography>
                      <Typography variant="body2" color="black" sx={{ textAlign: 'center', mb:2, position: 'absolute', top: '20px', left: '52%', transform: 'translateX(-50%)' }}>
                        {flight.outboundDuration}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="h6" sx={{color:"#697279"}} >
                          {flight.returnDepartureTime}
                        </Typography>
                        <Typography sx={{color:"#697279"}}>
                          {flight.arrivalAirport}
                        </Typography>
                        </Box>
                        <Box sx={{ mx: 1, flex: 1, borderTop: '1px solid #ccc', position: 'relative', width: '70%' }}>
                          {flight.oneStop?.return && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '55%',
                                top: '-4px',
                                transform: 'translateX(-52%)',
                                backgroundColor: '#c6007e',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                
                              }}
                            />
                          )}
                        </Box>
                        <Flight sx={{ fontSize: "17px", marginleft:"10px", marginRight:"5px", transform: 'rotate(90deg)', color:"#697279" }} />
                        <Box>
                        <Typography variant="h6" sx={{color:"#697279"}} >
                          {flight.returnArrivalTime}
                        </Typography>
                        <Typography sx={{color:"#697279"}}>
                          {flight.departureAirport}
                        </Typography>
                        </Box>
                      </Box>
                      <Typography   sx={{ textAlign: 'center',mb: 2, mt: -3, color:"#0c838a", fontSize:"12px" }}>
                        {flight.oneStop?.return
                          ? `1 stop at ${flight.oneStop.returnStop}`
                          : 'Direct'}
                      </Typography>
                      <Typography variant="body2" color="black" sx={{ textAlign: 'center',marginTop:"20px", position: 'absolute', top: '80px', left: '52%', transform: 'translateX(-50%)' }}>
                        {flight.returnDuration}
                      </Typography>

                     
                    </Grid>

                        <Box
      sx={{
        borderLeft: '3px solid #ccc',
        ml: 2,
        height: '100%',
        alignSelf: 'stretch', 
      }}
    />

                    

                   

                   
                   
                    <Grid item xs={3} sx={{ textAlign: 'right', position: 'relative' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection:"column" }}>
                        <IconButton size="small" sx={{position: 'absolute', top: 0, right: 0 }}>
                          <FavoriteBorder />
                        </IconButton>
                        <Box sx={{ ml: 2, marginTop:"20px" }}>
                          <Typography sx={{color:"grey", fontSize:"13px", textAlign:"center"}}>
                            X deals from
                          </Typography>
                          <Typography variant="h6" gutterBottom sx={{color:"black", textAlign:"center"}}>
                            £{flight.price}
                          </Typography>
                          <Box sx={{display:"flex", backgroundColor:"#05203c", padding:"8px 20px", borderRadius:"5px", ":hover": {backgroundColor:"#154679"}}}>
                            <Typography sx={{color:"white"}}> Select </Typography>
                            <ArrowForward sx={{fontSize:"20px"}} />
                            
                          </Box>
                        </Box>
                      
                      {(flight.oneStop && flight.selfTransfer) && (
                        <Typography variant="body2"  sx={{ mt: 1, color:"#c6007e" }}>
                          🚨 Self transfer
                        </Typography>
                        
                      )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )
 : (
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

