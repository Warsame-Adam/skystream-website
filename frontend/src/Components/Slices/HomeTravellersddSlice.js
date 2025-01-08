
import { createSlice} from "@reduxjs/toolkit";

const initialState ={
    travellersOpen: false,
    adults: 1,
    children: 0,
    childAges: [],

}



const HomeTravellersddSlice = createSlice({

    name: "travellers",
    initialState,

    reducers: {


        setTravellersOpen: (state, action) => {
            state.travellersOpen = action.payload
        },



        setAdults: (state, action) => {
            state.adults = action.payload
        },

        setChildren: (state, action) => {
            state.children = action.payload
        },

        setChildAges: (state, action) => {
            state.childAges = action.payload
        },

        handleChangeTravellers: (state, action) => {
            const { adults, children, childAges } = action.payload;
            state.adults = adults;
            state.children = children;
            state.childAges = childAges;
          },
    }



});


export const { setTravellersOpen, setAdults, setChildren, setChildAges, handleChangeTravellers} = HomeTravellersddSlice.actions;


export default HomeTravellersddSlice.reducer