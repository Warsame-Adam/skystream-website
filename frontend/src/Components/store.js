import {
  configureStore,
  combineReducers,
  
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import monthsReducer from "./Slices/monthsSlice";
import calendarVisibility from "./Slices/calendarVisible";
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


const rootReducer = combineReducers({
  months: monthsReducer,
  visible: calendarVisibility,
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
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dates", "hotelTravellers"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;