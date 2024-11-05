import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCity: 0,
    currentIndex: 0,
    currentFabCityIndex: 0,
    recommendedHotels: 0,

}




const hotelSlice = createSlice({
    name:"hotels",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload
        },
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload
        },
        setCurrentFabCityIndex: (state, action) => { 
            state.currentFabCityIndex = action.payload;
          },
        setRecommendedHotels: (state, action) => {
            state.recommendedHotels = action.payload;
        } 

    }
});


export const {setSelectedCity, setCurrentIndex, setCurrentFabCityIndex, setRecommendedHotels} = hotelSlice.actions;

export default hotelSlice.reducer;