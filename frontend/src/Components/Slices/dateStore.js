import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departureDate: null,
  returnDate: null,
  isSelectingDepartDate: true,
};

const dateStore = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setDepartureDate: (state, action) => {
      console.log("Action payload (departure):", action.payload);
      state.departureDate = action.payload
    },
    setReturnDate: (state, action) => {
      console.log("Action payload (return):", action.payload);

      state.returnDate = action.payload
    },
    clearDepartureDate: (state) => {
      state.departureDate = null;
    },
    clearReturnDate: (state) => {
      state.returnDate = null;
    },
    setIsSelectingDepartDate: (state, action) => {
      state.isSelectingDepartDate = action.payload;
    },
  },
});

export const {
  setDepartureDate,
  setReturnDate,
  clearDepartureDate,
  clearReturnDate,
  setIsSelectingDepartDate,
} = dateStore.actions;

export default dateStore.reducer;
