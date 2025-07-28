import { createSlice } from "@reduxjs/toolkit";
import { fetchCar } from "./operations";

const carsSlice = createSlice({
  name: "car",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraRedusers: (builder) => {
    builder.addCase(fetchCar.pending, (state, action) => {
      state.isLoadin = true;
    });
    addCase(fetchCar.fulfilled, (state, action) => {
      state.isLoadin = false;
      state.items = action.payload;
    });
    addCase(fetchCar.rejected, (state, action) => {
      state.isLoadin = false;
      state.error = action.payload;
    });
  },
});
export default carsSlice.reduser;
