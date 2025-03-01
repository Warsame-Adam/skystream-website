import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cabinClass: "Economy",
  adults: 1,
  children: 0,
  childAges: [],
};

const HomeTravellersddSlice = createSlice({
  name: "travellers",
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
    setCabinClass: (state, action) => {
      state.cabinClass = action.payload;
    },
    handleChangeTravellers: (state, action) => {
      const { cabinClass, adults, children, childAges } = action.payload;
      if (adults) state.adults = adults;
      if (children) state.children = children;
      if (cabinClass) state.cabinClass = cabinClass;
      if (childAges) state.childAges = childAges;
    },
  },
});

export const {
  setTravellersOpen,
  setAdults,
  setChildren,
  setChildAges,
  setCabinClass,
  handleChangeTravellers,
} = HomeTravellersddSlice.actions;

export default HomeTravellersddSlice.reducer;
