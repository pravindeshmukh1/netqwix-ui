import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkSlot } from "./common.api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  isSlotAvailable: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSlotAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(checkSlotAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.info("inside--");
        console.info(action.payload);
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
