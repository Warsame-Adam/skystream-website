import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

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

// Combine all reducers
const rootReducer = combineReducers({
  months: monthsReducer,
  visible: calendarVisibilty,
  dates: dateSelector,                // persist this
  faqVisible: faqVisibility,
  search: SearchBarReducer,
  hotels: hotelSelectionReducer,
  flightSearchui: flightSearchUI,
  CalendarVisible: ReusableCalendar,
  singleMonth: singleMonthReducer,
  flightSearch: flightSearchSlice,
  hotelSearch: hotelSearchSlice,
  travellers: HomeTravellersddSlice,
  hotelTravellers: HotelTravellersddSlice, // persist this
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dates", "hotelTravellers"], // Only these slices will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor for use in the app
export const persistor = persistStore(store);

export default store;