import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkSlot } from "./common.api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  isSlotAvailable: null,
};

export const checkSlotAsync = createAsyncThunk("checkSlot", async (payload) => {
  try {
    const response = await checkSlot(payload);
    return response;
  } catch (err) {
    toast.error(err.response.data.error);
    throw err;
  }
});

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    common: (state) => {
      return state;
    },
    handleTrainerAvailable: (state, action) => {
      state.isSlotAvailable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSlotAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(checkSlotAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isSlotAvailable = action.payload.data.isAvailable;
      })
      .addCase(checkSlotAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export default commonSlice.reducer;
export const commonState = (state) => state.common;
export const commonAction = commonSlice.actions;
