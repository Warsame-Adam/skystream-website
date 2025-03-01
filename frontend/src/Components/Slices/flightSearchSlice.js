import { createSlice } from "@reduxjs/toolkit";

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: {
    from: {
      cityName: "London",
      cityCode: "LHR",
      countryName: "United Kingdom",
      countryCode: "UK",
    },
    to: null,
    otherOptions: {
      direct: false,
      otherOptions: false,
      nearbyAirports: false,
    },
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setOtherOptions: (state, action) => {
      state.otherOptions = action.payload;
    },
  },
});

export const { setFrom, setTo, setOtherOptions } = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
