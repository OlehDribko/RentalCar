import { configureStore } from "@reduxjs/toolkit";
import { favoritesPersistMiddleware } from "../middleware/persistMiddleware.js";
import carsReducer from "./carsSlice.js";
import filtersReducer from "./filterSlice.js";
import { favoritesReducer } from "./favoriteSlice.js";

// const initialState = {
//   cars: { items: [] },
//   filters: {
//     statis: "all",
//   },
// };

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(favoritesPersistMiddleware),
});
