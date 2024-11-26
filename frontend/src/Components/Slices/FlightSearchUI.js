import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    departureDate: null,
    returnDate: null,
    showInputs: false,
};

const FlightSearchUI = createSlice({
    name: 'flightSearch',
    initialState,
    reducers: {
        setDepartureDate: (state, action) => {
            state.departureDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.returnDate = action.payload;
        },
        setShowInputs: (state, action) => {
            state.showInputs = action.payload;
        },
    },
});

export const { setDepartureDate, setReturnDate, setShowInputs } = FlightSearchUI.actions;

export default FlightSearchUI.reducer;