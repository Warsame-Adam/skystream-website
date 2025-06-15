import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  firstMonth: new Date().toISOString(),
  secondMonth: (() => {
    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString();
  })(),
};

const monthsSlice = createSlice({
  name: 'months',
  initialState,
  reducers: {
    setFirstMonth: (state, action) => {
      state.firstMonth = action.payload.toISOString?.() || action.payload;
    },
    setSecondMonth: (state, action) => {
      state.secondMonth = action.payload.toISOString?.() || action.payload;
    },
    updateMonths: (state, action) => {
      const { monthChange } = action.payload;
      const newFirst = new Date(state.firstMonth);
      const newSecond = new Date(state.secondMonth);

      newFirst.setMonth(newFirst.getMonth() + monthChange);
      newSecond.setMonth(newSecond.getMonth() + monthChange);

      if (!isNaN(newFirst) && !isNaN(newSecond)) {
        state.firstMonth = newFirst.toISOString();
        state.secondMonth = newSecond.toISOString();
      }
    },
  },
});

export const { setFirstMonth, setSecondMonth, updateMonths } = monthsSlice.actions;
export default monthsSlice.reducer;