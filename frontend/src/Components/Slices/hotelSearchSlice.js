import { createSlice } from "@reduxjs/toolkit";

const hotelSearchSlice = createSlice({
  name: "hotelSearch",
  initialState: {
    destination: null,
    // {
    //   cityName: "",
    //   cityCode: "",
    //   countryName: "",
    //   countryCode: "",
    // },
    otherOptions: {
      freeCancellation: false,
      fourStar: false,
      fiveStar: false,
    },
  },
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setOtherOptions: (state, action) => {
      state.otherOptions = {
        ...state.otherOptions,
        ...action.payload,
      };
    },
  },
});

export const { setDestination, setOtherOptions } = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
