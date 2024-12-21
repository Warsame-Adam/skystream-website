import { createSlice } from "@reduxjs/toolkit";

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: {
    from: { city: "London", code: "LHR", country: "United Kingdom" }, 
    to: null,
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload; 
    },
    setTo: (state, action) => {
      state.to = action.payload; 
    },
  },
});

export const { setFrom, setTo } = flightSearchSlice.actions;

export default flightSearchSlice.reducer;