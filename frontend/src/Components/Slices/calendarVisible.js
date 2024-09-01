import { createSlice } from "@reduxjs/toolkit"; 


const initialState = {
    isCalendarVisible: false
};


const calendarVisible = createSlice({
    name: "visible",
    initialState,

    reducers: {
        showCalendar: (state) => {
            state.isCalendarVisible = true
        },

        hideCalendar: (state) => {
            state.isCalendarVisible = false
        },
    }
})

export const {showCalendar, hideCalendar} = calendarVisible.actions;

export default calendarVisible.reducer;


