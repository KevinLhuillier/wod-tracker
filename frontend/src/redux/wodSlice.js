// src/redux/wodSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWods = createAsyncThunk("wods/fetchWods", async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.get(`${apiUrl}/wods`);
  return response.data;
});

export const addWod = createAsyncThunk("wods/addWod", async (wod) => {
  const response = await axios.post("http://localhost:8080/api/wods", wod);
  return response.data;
});

export const updateWod = createAsyncThunk("wods/updateWod", async (wod) => {
  const response = await axios.put(
    `http://localhost:8080/api/wods/${wod.id}`,
    wod
  );
  return response.data;
});

export const deleteWod = createAsyncThunk("wods/deleteWod", async (id) => {
  await axios.delete(`http://localhost:8080/api/wods/${id}`);
  return id;
});

const wodSlice = createSlice({
  name: "wods",
  initialState: {
    wods: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wods = action.payload;
      })
      .addCase(fetchWods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWod.fulfilled, (state, action) => {
        state.wods.push(action.payload);
      })
      .addCase(updateWod.fulfilled, (state, action) => {
        const index = state.wods.findIndex(
          (wod) => wod.id === action.payload.id
        );
        state.wods[index] = action.payload;
      })
      .addCase(deleteWod.fulfilled, (state, action) => {
        state.wods = state.wods.filter((wod) => wod.id !== action.payload);
      });
  },
});

export default wodSlice.reducer;
