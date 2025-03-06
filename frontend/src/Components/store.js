import { configureStore } from "@reduxjs/toolkit";
import monthsReducer from "./Slices/monthsSlice";
import calendarVisibilty from "./Slices/calendarVisible";
import dateSelector from "./Slices/dateStore";
import faqVisibility from "./Slices/FAQVisible";
import SearchBarReducer from "./Slices/SearchBarSlice";
import hotelSelectionReducer from "./Slices/hotelSlice";
import flightSearchUI from "./Slices/FlightSearchUI";
import ReusableCalendar from "./Slices/ReusableCalendar";
import singleMonthReducer from "./Slices/singleMonthSlice";
import flightSearchSlice from "./Slices/flightSearchSlice";
import hotelSearchSlice from "./Slices/hotelSearchSlice";
import HomeTravellersddSlice from "./Slices/HomeTravellersddSlice";
import HotelTravellersddSlice from "./Slices/HotelTravellersddSlice";

const store = configureStore({
  reducer: {
    months: monthsReducer,
    visible: calendarVisibilty,
    dates: dateSelector,
    faqVisible: faqVisibility,
    search: SearchBarReducer,
    hotels: hotelSelectionReducer,
    flightSearchui: flightSearchUI,
    CalendarVisible: ReusableCalendar,
    singleMonth: singleMonthReducer,
    flightSearch: flightSearchSlice,
    hotelSearch: hotelSearchSlice,
    travellers: HomeTravellersddSlice,
    hotelTravellers: HotelTravellersddSlice,
  },
});

export default store;
