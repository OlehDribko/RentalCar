// redux/carsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  totalCars: 0,
  totalPages: 1,
  page: 1,
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;

        const reqPage = action.meta?.arg?.params?.page ?? 1;

        const batch = action.payload?.cars ?? [];

        state.items = reqPage === 1 ? batch : [...state.items, ...batch];

        state.totalPages = action.payload?.totalPages ?? state.totalPages ?? 1;
        state.totalCars =
          action.payload?.totalCars ?? state.totalCars ?? state.items.length;

        state.page = reqPage;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "Request failed";
      });
  },
});

export default carsSlice.reducer;
