import {configureStore} from "@reduxjs/toolkit";
import monthsReducer from "./Slices/monthsSlice";
import calendarVisibilty from "./Slices/calendarVisible";
import dateSelector from "./Slices/dateStore";
import faqVisibility from "./Slices/FAQVisible";
import SearchBarReducer from './Slices/SearchBarSlice';
import hotelSelectionReducer from './Slices/hotelSlice'; 
import flightSearchState from "./Slices/FlightSearchUI";
import ReusableCalendar from "./Slices/ReusableCalendar";
import singleMonthReducer from "./Slices/singleMonthSlice";
import flightSearchSlice from "./Slices/flightSearchSlice";



const store  = configureStore({
    
    reducer:{
        months: monthsReducer,
        visible: calendarVisibilty,
        dates: dateSelector,
        faqVisible: faqVisibility,
        search: SearchBarReducer,
        hotels: hotelSelectionReducer,
        flightSearch: flightSearchState,
        CalendarVisible: ReusableCalendar,
        singleMonth: singleMonthReducer,
        flightSearch: flightSearchSlice,



    }
})


export default store;
