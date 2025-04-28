import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    firstMonth: new Date(),
    secondMonth: (()=> {
        let nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth;
    }) (),
}




const monthsSlice  = createSlice({
    name:'months',
    initialState,
    reducers: {
        setFirstMonth: (state, action) => {
            state.firstMonth = action.payload
        }, 
        setSecondMonth: (state, action) => {
            state.secondMonth = action.payload
        },
        updateMonths: (state, action) => {
            const { monthChange } = action.payload;
        
            let newFirstMonth = new Date(state.firstMonth);
            let newSecondMonth = new Date(state.secondMonth);
        
            
            newFirstMonth.setMonth(newFirstMonth.getMonth() + monthChange);
            newSecondMonth.setMonth(newSecondMonth.getMonth() + monthChange);
        
            
            
        
            if (!isNaN(newFirstMonth.getTime()) && !isNaN(newSecondMonth.getTime())) {
                state.firstMonth = newFirstMonth;
                state.secondMonth = newSecondMonth;
            } else {
                console.error("Generated an invalid date.");
            }
        }
        
        

    },
    
})

export const {setFirstMonth, setSecondMonth, updateMonths} = monthsSlice.actions;


export default monthsSlice.reducer;
