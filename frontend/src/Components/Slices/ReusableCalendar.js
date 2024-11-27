import { createSlice} from "@reduxjs/toolkit";

const initialState = {

    isCalendarVisible: false,
    activeInput: "depart",

}

const ReusableCalendar = createSlice({
    name: "CalendarVisible",
    initialState, 
    

    reducers: {
        calendarShow: (state) => {
            state.isCalendarVisible = true
        },

        calendarHide: (state) => {
            state.isCalendarVisible = false
        },

        setActiveInput: (state, action) => {
            state.activeInput = action.payload
        }


    }


    
})

export const {calendarShow, calendarHide, setActiveInput} = ReusableCalendar.actions

export default ReusableCalendar.reducer


