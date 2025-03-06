import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: 1,
  adults: 1,
  children: 0,
  childAges: [],
};

const HotelTravellersddSlice = createSlice({
  name: "hotelTravellers",
  initialState,
  reducers: {
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
    setChildAges: (state, action) => {
      state.childAges = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    handleChangeTravellers: (state, action) => {
      const { rooms, adults, children, childAges } = action.payload;
      if (adults) state.adults = adults;
      if (children) state.children = children;
      if (rooms) state.rooms = rooms;
      if (childAges) state.childAges = childAges;
    },
  },
});

export const {
  setAdults,
  setChildren,
  setChildAges,
  setRooms,
  handleChangeTravellers,
} = HotelTravellersddSlice.actions;

export default HotelTravellersddSlice.reducer;
