import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCar = createAsyncThunk("/cars/fetchAll", () => {
  async (_, thinkApi) => {
    try {
      const response = await axios.get("/cars");
      return response.data;
    } catch (error) {
      return thinkApi.rejectWithValue(error.message);
    }
  };
});
