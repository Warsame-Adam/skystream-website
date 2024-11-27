import React, { useEffect, useRef, useState } from "react"
import { AppBar, Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setDepartureDate, setReturnDate } from '../Slices/dateStore';
import { calendarShow, setActiveInput } from "../Slices/ReusableCalendar";
import { format } from 'date-fns';
import ReusableDatePicker from '../ReusableDatePicker'; 

const ReturnSearchBar = () => {
    const dispatch = useDispatch();
    const departureDate = useSelector((state) => state.dates.departureDate);
    const returnDate = useSelector((state) => state.dates.returnDate);
    const searchType = useSelector((state) => state.search.searchType);
    const isCalendarVisible = useSelector((state) => state.CalendarVisible.isCalendarVisible);
    const activeInput = useSelector((state) => state.CalendarVisible.activeInput);

    const handleClickDepart = () => {
        dispatch(setActiveInput("depart"));
        handleClick();
    }

    const handleClickReturn = () => {
        dispatch(setActiveInput("return"));
        handleClick();
    }

    const handleClick = () => {
        dispatch(calendarShow());
    };

    useEffect(() => {
        const currentDate = new Date();
        const departure = new Date(currentDate.setDate(currentDate.getDate() + 7)); 
        dispatch(setDepartureDate(departure.getTime()));

        const returnD = new Date(departure);
        returnD.setDate(departure.getDate() + 7); 
        dispatch(setReturnDate(returnD.getTime()));
    }, [dispatch]);

    const formattedDepartureDate = departureDate 
        ? format(new Date(departureDate), 'dd/MM/yyyy') 
        : ''; 
  
    const formattedReturnDate = returnDate 
        ? format(new Date(returnDate), 'dd/MM/yyyy') 
        : ''; 

    const departInputRef = useRef(null);
    const returnInputRef = useRef(null);

    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

    const handlePositionCalendar = () => {
        if (activeInput === "depart" && departInputRef.current) {
            const { top, left, height } = departInputRef.current.getBoundingClientRect();
            setCalendarPosition({ top: top + height - 200, left: left - 400 });
        } else if (activeInput === "return" && returnInputRef.current) {
            const { top, left, height } = returnInputRef.current.getBoundingClientRect();
            setCalendarPosition({ top: top + height - 200, left: left - 400 });
        }
    };

    useEffect(() => {
        handlePositionCalendar();
    }, [activeInput]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }} >
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', alignItems: "center" }}>
                <Input placeholder="From" disableUnderline sx={{ ...inputStyle, borderRadius: "10px 0px 0px 10px" }} />
                <Input placeholder="To" disableUnderline sx={{ ...inputStyle }} />
                <Input 
                    placeholder="Depart Add date" 
                    disableUnderline sx={{ ...inputStyle }}
                    value={formattedDepartureDate} 
                    ref={departInputRef} 
                    onClick={handleClickDepart}
                />
                <Input 
                    placeholder="Return Add date" 
                    disableUnderline 
                    sx={{ ...inputStyle }}
                    value={formattedReturnDate}
                    ref={returnInputRef}
                    onClick={handleClickReturn}
                    disabled={searchType === "oneway"} 
                />
                <Input placeholder="Travellers and cabin class" disableUnderline sx={{ ...inputStyle, borderRadius: "0px 10px 10px 0px", marginRight: "15px" }} />
                <Button variant="contained" sx={{ marginLeft: "10px", padding: "25px 20px", backgroundColor: "#0062e3", pointer: "clicker", textTransform: "none", borderRadius: "10px", '&:Hover': { backgroundColor: "#024daf" } }}>Search</Button>
                {isCalendarVisible && (
                    <ReusableDatePicker
                        departInputRef={departInputRef}
                        returnInputRef={returnInputRef}
                        calendarPosition={calendarPosition}
                    />
                )}
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
    );
};

const inputStyle = {
    backgroundColor: "background.paper",
    color: "black",
    margin: "2px",
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },
};

export default ReturnSearchBar;
