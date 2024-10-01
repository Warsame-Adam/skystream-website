import React from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import peopleBeach from   "../../Components/Assets/peopleBeach.png"
import { useSelector, useDispatch } from 'react-redux';
import ReturnSearchBar from '../SearchBar/ReturnSearchBar';
import MultiCitySearchBar from '../SearchBar/MultiCitySearchBar';
import { setSearchType } from '../Slices/SearchBarSlice';








const HeroFlights = () => {

  const searchType = useSelector((state) => state.search.searchType);
    const dispatch = useDispatch();

    const renderSearchBar = () => {
        switch (searchType) {
            case 'return':
                return <ReturnSearchBar />;
            case 'oneway':
                return <ReturnSearchBar />;
            case 'multiCity':
                return <MultiCitySearchBar />;
            default:
                return <ReturnSearchBar />;
        }
    };

  




    return (






      <Box sx={{ position: "relative"}}>


      <Box sx={{
        height: '700px',
        overflow: 'hidden',
      }}>
          <img
              src={peopleBeach}
              alt="Hero"
              style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
              }}
          />
      </Box>





      
      <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1200px',
          backgroundColor: '#002540',
          padding: '20px',
          borderRadius: '8px',
      }}>
                

          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <RadioGroup
                  row
                  value={searchType}
                  onChange={(e) => dispatch(setSearchType(e.target.value))}
              >
                  <FormControlLabel value="return" control={<Radio color="primary" />} label="Return" />
                  <FormControlLabel value="oneway" control={<Radio color="primary" />} label="One Way" />
                  <FormControlLabel value="multiCity" control={<Radio color="primary" />} label="Multi-City" />
              </RadioGroup>
          </Box>

          {renderSearchBar()}
      </Box>
  </Box>
);

      

      




        

        
    
}



export default HeroFlights;