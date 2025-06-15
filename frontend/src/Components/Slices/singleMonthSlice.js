import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // store as an ISO string, not a Date object
  currentMonth: new Date().toISOString(),
};

const singleMonthSlice = createSlice({
  name: "singleMonth",
  initialState,
  reducers: {
    setCurrentMonth: (state, action) => {
      // allow either a Date or an ISO string
      state.currentMonth = typeof action.payload === "string"
        ? action.payload
        : action.payload.toISOString();
    },
    updateMonth: (state, action) => {
      const monthChange = action.payload;
      
      const newMonth = new Date(state.currentMonth);
      newMonth.setMonth(newMonth.getMonth() + monthChange);
      
      state.currentMonth = newMonth.toISOString();
    },
  },
});

export const { setCurrentMonth, updateMonth } = singleMonthSlice.actions;
export default singleMonthSlice.reducer;