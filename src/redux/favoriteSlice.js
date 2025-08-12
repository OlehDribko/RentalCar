// src/redux/favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getJSON } from "../utils/storage";

const KEY = "favCarIds";
const initialState = { ids: getJSON(KEY, []) };

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = String(action.payload);
      const i = state.ids.indexOf(id);
      if (i >= 0) state.ids.splice(i, 1);
      else state.ids.push(id);
    },
    addFavorite: (state, action) => {
      const id = String(action.payload);
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    removeFavorite: (state, action) => {
      const id = String(action.payload);
      const i = state.ids.indexOf(id);
      if (i >= 0) state.ids.splice(i, 1);
    },
    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export const favoritesReducer = favoriteSlice.reducer;

export const selectFavoriteIds = (state) => state.favorites.ids;
export const makeSelectIsFavorite = (id) => (state) =>
  state.favorites.ids.includes(String(id));
