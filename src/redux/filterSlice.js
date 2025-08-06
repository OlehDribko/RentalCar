import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  price: "",
  minMileage: "",
  maxMileage: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
