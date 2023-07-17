import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getScheduleInventoryData,
  updateSchedulingSlots,
} from "./scheduleInventory.api";

const initialState = {
  status: "pending",
  scheduleInventoryData: {
    monday: [{ start_time: "", end_time: "" }],
    tuesday: [{ start_time: "", end_time: "" }],
    wednesday: [{ start_time: "", end_time: "" }],
    thursday: [{ start_time: "", end_time: "" }],
    friday: [{ start_time: "", end_time: "" }],
  },
};

export const getScheduleInventoryDataAsync = createAsyncThunk(
  "scheduleInventory/get",
  async () => {
    try {
      const response = await getScheduleInventoryData();
      console.log("response", response);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const updateScheduleInventoryAsync = createAsyncThunk(
  "scheduleInventory/update",
  async (payload) => {
    try {
      const res = await updateSchedulingSlots(payload);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const scheduleInventorySlice = createSlice({
  name: "scheduleInventory",
  initialState,
  reducers: {
    scheduleInventory: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScheduleInventoryDataAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getScheduleInventoryDataAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.data &&
          action.payload.data.data.available_slots &&
          action.payload.data.data.available_slots.length
        ) {
          const result = action.payload.data.data.available_slots;
          console.log("result", result);
          let scheduleInventoryObj = {};
          result.forEach((data) => {
            scheduleInventoryObj[data.day] =
              data.slots && data.slots.length
                ? data.slots
                : [{ start_time: "", end_time: "" }];
          });
          console.log("scheduleInventoryObj", scheduleInventoryObj);
          state.scheduleInventoryData = scheduleInventoryObj;
        } else {
          state.scheduleInventoryData = null;
        }
      })
      .addCase(getScheduleInventoryDataAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateScheduleInventoryAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateScheduleInventoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(updateScheduleInventoryAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default scheduleInventorySlice.reducer;
export const scheduleInventoryState = (state) => state.scheduleInventory;
export const scheduleInventoryAction = scheduleInventorySlice.actions;
