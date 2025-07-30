import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ params = {} }, thinkApi) => {
    try {
      const response = await axios.get("/cars", { params });
      return response.data;
    } catch (error) {
      return thinkApi.rejectWithValue(error.message);
    }
  }
);
