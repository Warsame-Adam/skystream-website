import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMonth: new Date(),
};

const singleMonthSlice = createSlice({
  name: 'singleMonth',
  initialState,
  reducers: {
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
    updateMonth: (state, action) => {
      const monthChange = action.payload;
      let newMonth = new Date(state.currentMonth);
      newMonth.setMonth(newMonth.getMonth() + monthChange);
       
      state.currentMonth = newMonth;
    }
  },
});

export const { setCurrentMonth, updateMonth } = singleMonthSlice.actions;

export default singleMonthSlice.reducer;
