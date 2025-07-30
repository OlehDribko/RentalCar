import { configureStore } from "@reduxjs/toolkit";
import carsSlice from "./carsSlice";
const initialState = {
  cars: { items: [] },
  filters: {
    statis: "all",
  },
};

export const store = configureStore({
  reducer: {
    cars: carsSlice,
  },
});
