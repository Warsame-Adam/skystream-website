import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    visibleFAQs: [], // Array to track visibility for each FAQ
  };
  
  const faqVisible = createSlice({
    name: 'faqVisible',
    initialState,
    reducers: {
      toggleFAQ: (state, action) => {
        const index = action.payload; // The index of the FAQ being toggled
        state.visibleFAQs[index] = !state.visibleFAQs[index]; // Toggle the visibility for this specific FAQ
      },
    },
  });
  
  export const { toggleFAQ } = faqVisible.actions;
  export default faqVisible.reducer;
  
