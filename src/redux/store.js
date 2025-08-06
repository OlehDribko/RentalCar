import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";
import filtersReducer from "./filterSlice";

const initialState = {
  cars: { items: [] },
  filters: {
    statis: "all",
  },
};

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
  },
});
