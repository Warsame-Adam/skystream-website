import { createSlice } from '@reduxjs/toolkit';

const SearchBarSlice = createSlice({
  name: 'search',
  initialState: {
    isOneWay: false,
    searchType: 'return', // Could be 'return', 'oneway', or 'multicity'
  },
  reducers: {
    setIsOneWay: (state, action) => {
      state.isOneWay = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
});

export const { setIsOneWay, setSearchType } = SearchBarSlice.actions;
export default SearchBarSlice.reducer;
