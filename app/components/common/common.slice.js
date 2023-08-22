import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addRating,
  getScheduledMeetingDetails,
  updateBookedSessionScheduledMeeting,
} from "./common.api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  scheduledMeetingDetails: [],
  addRatingModel: { _id: null, isOpen: false },
};

export const addRatingAsync = createAsyncThunk(
  "add/rating",
  async (payload) => {
    try {
      const res = await addRating(payload);
      return res;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

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
    addRating: (state, action) => {
      state.addRatingModel = action.payload;
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
      )
      .addCase(addRatingAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addRatingAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.addRatingModel = { _id: null, isOpen: false };
        toast.success(action.payload.message, { type: "success" });
      })
      .addCase(addRatingAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default bookingsSlice.reducer;
export const bookingsState = (state) => state.bookings;
export const bookingsAction = bookingsSlice.actions;
