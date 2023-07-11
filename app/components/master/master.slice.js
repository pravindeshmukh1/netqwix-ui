import { getMasterData } from "../master/master.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  status: "pending",
  masterData: null,
};

export const getMasterDataAsync = createAsyncThunk("master/get", async () => {
  try {
    const response = await getMasterData();
    return response;
  } catch (err) {
    console.log(err);
    // throw err;
  }
});

export const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    master: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMasterDataAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMasterDataAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.masterData = action.payload.data.data[0];
        console.log("action.payload.data", action.payload.data.data[0]);
      });
  },
});

export default masterSlice.reducer;
export const masterState = (state) => state;
export const masterAction = masterSlice.actions;
