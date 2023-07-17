import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {bookSession, fetchTraineeWithSlots} from './trainee.api';
import { toast } from "react-toastify";


const initialState = {
  status: 'idle',
  getTraineeSlots: [],
};

export const getTraineeWithSlotsAsync = createAsyncThunk (
  'get/trainee/slots',
  async params => {
    try {
      const response = await fetchTraineeWithSlots (params);
      return response;
    } catch (err) {
      toast.error (err.response.data.error);
      throw err;
    }
  }
);

export const bookSessionAsync = createAsyncThunk (
  'add/trainee/book-session',
  async payload => {
    try {
      const response = await bookSession (payload);
      return response;
    } catch (err) {
      toast.error (err.response.data.error);
      throw err;
    }
  }
);
export const traineeSlice = createSlice ({
  name: 'trainee',
  initialState,
  reducers: {
    trainee: state => {
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase (getTraineeWithSlotsAsync.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase (getTraineeWithSlotsAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.getTraineeSlots = action.payload.data;
      })
      .addCase (getTraineeWithSlotsAsync.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase (bookSessionAsync.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase (bookSessionAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const { data } = action.payload;
        toast.success(data.message);

        // state.getTraineeSlots = action.payload.data;
      })
      .addCase (bookSessionAsync.rejected, (state, action) => {
        state.status = 'rejected';
      });
  },
});
export default traineeSlice.reducer;
export const traineeState = state => state.trainee;
export const traineeAction = traineeSlice.actions;
