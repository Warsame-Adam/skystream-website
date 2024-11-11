import { createSlice } from '@reduxjs/toolkit';

const SearchBarSlice = createSlice({
  name: 'search',
  initialState: {
    
    searchType: 'return', // Could be 'return', 'oneway', or 'multicity'
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    
  },
});

export const {  setSearchType } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;
