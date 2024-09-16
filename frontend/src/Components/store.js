import {configureStore} from "@reduxjs/toolkit";
import monthsReducer from "./Slices/monthsSlice";
import calendarVisibilty from "./Slices/calendarVisible";
import dateSelector from "./Slices/dateStore";
import faqVisibility from "./Slices/FAQVisible";

const store  = configureStore({
    
    reducer:{
        months: monthsReducer,
        visible: calendarVisibilty,
        dates: dateSelector,
        faqVisible: faqVisibility

    }
})


export default store;
