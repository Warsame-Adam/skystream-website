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
      
      state.departureDate = action.payload
    },
    setReturnDate: (state, action) => {
      

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
