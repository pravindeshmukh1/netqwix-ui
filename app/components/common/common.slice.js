import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getScheduledMeetingDetails,
  updateBookedSessionScheduledMeeting,
} from "./common.api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  scheduledMeetingDetails: [],
};

export const getScheduledMeetingDetailsAsync = createAsyncThunk(
  "get/scheduled/meetings",
  async () => {
    try {
      const response = await getScheduledMeetingDetails();
      return response;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

export const updateBookedSessionScheduledMeetingAsync = createAsyncThunk(
  "update/booked/session",
  async (payload, { dispatch }) => {
    try {
      const response = await updateBookedSessionScheduledMeeting(payload);
      //TODO:update redux state not calling get api
      dispatch(getScheduledMeetingDetailsAsync());
      return response;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    bookings: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScheduledMeetingDetailsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getScheduledMeetingDetailsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.scheduledMeetingDetails = action.payload.data;
      })
      .addCase(getScheduledMeetingDetailsAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(
        updateBookedSessionScheduledMeetingAsync.pending,
        (state, action) => {
          state.status = "pending";
        }
      )
      .addCase(
        updateBookedSessionScheduledMeetingAsync.fulfilled,
        (state, action) => {
          state.status = "fulfilled";
          toast.success(action.payload.message);
        }
      )
      .addCase(
        updateBookedSessionScheduledMeetingAsync.rejected,
        (state, action) => {
          state.status = "rejected";
        }
      );
  },
});

export default bookingsSlice.reducer;
export const bookingsState = (state) => state.bookings;
export const bookingsAction = bookingsSlice.actions;
