import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setDepartureDate, setReturnDate, setShowInputs } from './Slices/FlightSearchUI.js';
import { Container, Box, Typography, Button, Input, Checkbox, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const inputStyle = {
    backgroundColor: "background.paper",
    color: "black",
    margin: "2px",
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },
};

const FlightSearchUI = () => {
    const dispatch = useDispatch();
    const showInputs = useSelector((state) => state.flightSearch.showInputs);
    const departureDate = useSelector((state) => state.flightSearch.departureDate);
    const returnDate = useSelector((state) => state.flightSearch.returnDate);


    useEffect(() => {
        const currentDate = new Date();
        const departure = new Date(currentDate.setDate(currentDate.getDate() + 7)); 
        dispatch(setDepartureDate(departure.toDateString()));

        const returnD = new Date(departure)
        returnD.setDate(departure.getDate() + 7); 
        dispatch(setReturnDate(returnD.toDateString()));
    }, [dispatch]);

    const handleDateChange = (type, step) => {
        let newDate;
        if (type === 'departure') {
            newDate = new Date(departureDate);
            newDate.setDate(newDate.getDate() + step);
            dispatch(setDepartureDate(newDate.toDateString()));
        } else if (type === 'return') {
            newDate = new Date(returnDate);
            newDate.setDate(newDate.getDate() + step);
            dispatch(setReturnDate(newDate.toDateString()));
        }
    };

    return (
        <Container sx={{ marginTop: "-70px", marginLeft: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                <Box
                    sx={{
                        width: "970px",
                        height: "50px",
                        backgroundColor: "#1e3750",
                        "&:hover": { backgroundColor: "#010913" },
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "10px",
                        flexShrink: 0,
                        cursor: "pointer"
                    }}
                    onClick={() => dispatch(setShowInputs(!showInputs))}
                >
                    <Box
                        sx={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#0062e3",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "10px",
                            borderRadius: "5px",
                            "&:hover": { backgroundColor: "#024daf" },
                        }}
                    >
                        <SearchIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                                color: "white",
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            color: "white",
                            marginLeft: "20px",
                            flexGrow: 1
                            textAlign: "center", 
                        }}
                    >
                        {departureDate ? `Departure date: ${departureDate}` : 'testing 123'}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        width: "250px",
                        marginLeft: "10px", 
                        flexShrink: 0, 
                    }}
                >
                    {/* Left Arrow Box */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('departure', -1)}
                    >
                        <ArrowBackIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>

                    {/* Typography for Date */}
                    <Typography sx={{ color: "white", margin: "0 20px" }}>
                        {departureDate ? departureDate : 'Departure date'}
                    </Typography>

                    {/* Right Arrow Box */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDateChange('departure', 1)}
                    >
                        <ArrowForwardIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        width: "250px",
                        marginLeft: "10px"
                        flexShrink: 0, 
                    }}
                >
                    {/* Left Arrow Box */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('return', -1)}
                    >
                        <ArrowBackIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>

                    {/* Typography for Date */}
                    <Typography sx={{ color: "white", margin: "0 20px" }}>
                        {returnDate ? returnDate : 'Return date'}
                    </Typography>

                    {/* Right Arrow Box */}
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('return', 1)}
                    >
                        <ArrowForwardIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>
                </Box>
            </Box>

            {showInputs && (
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "20px", backgroundColor: "#1e3750" }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', alignItems: "center" }}>
                        <Input placeholder="From" disableUnderline sx={{ ...inputStyle, borderRadius: "10px 0px 0px 10px" }} />
                        <Input placeholder="To" disableUnderline sx={{ ...inputStyle }} />
                        <Input placeholder="Depart Add date" value={departureDate} disableUnderline sx={{ ...inputStyle }} />
                        <Input placeholder="Return Add date" value={returnDate} disableUnderline sx={{ ...inputStyle }} />
                        <Input placeholder="Travellers and cabin class" disableUnderline sx={{ ...inputStyle, borderRadius: "0px 10px 10px 0px", marginRight: "15px" }} />
                        <Button variant="contained" sx={{ marginLeft: "10px", padding: "25px 20px", backgroundColor: "#0062e3", textTransform: "none", borderRadius: "10px", '&:hover': { backgroundColor: "#024daf" } }}>Search</Button>
                    </Box>

                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 0.2fr)",
                        gap: "5px",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Add nearby airports" componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
                        <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Direct flights only" componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
                        <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Other option" sx={{ display: "inline-flex" }} componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default FlightSearchUI;
