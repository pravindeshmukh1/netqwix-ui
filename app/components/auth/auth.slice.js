import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.api";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";

const initialState = {
  status: "pending",
  userAccType: "",
  isUserLoggedIn: false,
};

export const signupAsync = createAsyncThunk("signup", async (payload) => {
  try {
  } catch (err) {}
});

export const loginAsync = createAsyncThunk("login", async (payload) => {
  try {
    const response = await login(payload);
    return response;
  } catch (err) {
    toast.error(err.response.data.error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isUserLoggedIn = true;
        if (action.payload) {
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
            action.payload.result.data.access_token
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.ACC_TYPE,
            action.payload.result.data.account_type
          );
        }
      });
  },
});

export default authSlice.reducer;
export const authState = (state) => state;
export const authAction = authSlice.actions;
