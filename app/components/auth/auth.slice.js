import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgetPassword,
  getMe,
  googleLogin,
  login,
  signup,
  verifiedForgetPassword,
} from "./auth.api";
import { toast } from "react-toastify";
import {
  LOCAL_STORAGE_KEYS,
  SuccessMsgs,
  leftSideBarOptions,
} from "../../common/constants";

const initialState = {
  status: "idle",
  userAccType: "",
  isUserLoggedIn: false,
  authToken: "",
  userInfo: {},
  showGoogleRegistrationForm: {
    isFromGoogle: false,
    email: null,
  },
  sidebarActiveTab: leftSideBarOptions.HOME,
};

export const signupAsync = createAsyncThunk("signup", async (payload) => {
  try {
    const response = await signup(payload);
    return response;
  } catch (err) {
    toast.error(err.response.data.error);
    throw err;
  }
});

export const loginAsync = createAsyncThunk("login", async (payload) => {
  try {
    const response = await login(payload);
    return response;
  } catch (err) {
    toast.error(err.response.data.error);
    throw err;
  }
});

export const getMeAsync = createAsyncThunk("get/me", async () => {
  try {
    const response = await getMe();
    return response;
  } catch (err) {
    toast.error(err.response.data.error);
    throw err;
  }
});

export const googleLoginAsync = createAsyncThunk(
  "googleLogin",
  async (payload) => {
    try {
      const response = await googleLogin(payload);
      return response;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

export const forgetPasswordAsync = createAsyncThunk(
  "forgetPassword",
  async (payload) => {
    try {
      const res = await forgetPassword(payload);
      return res;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

export const verifiedForgetPasswordAsync = createAsyncThunk(
  "verifiedForgetPassword",
  async (payload) => {
    try {
      const res = await verifiedForgetPassword(payload);
      return res;
    } catch (err) {
      toast.error(err.response.data.error);
      throw err;
    }
  }
);

const setupLogin = (action) => {
  toast.success(action.payload.msg);
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
    action.payload.result.data.access_token
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.ACC_TYPE,
    action.payload.result.data.account_type
  );
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state) => {
      return state;
    },
    updateIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = false;
      state.sidebarActiveTab = "";
    },
    setActiveTab: (state, action) => {
      state.sidebarActiveTab = action.payload;
    },
    updateIsGoogleForm: (state) => {
      state.showGoogleRegistrationForm.isFromGoogle = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        toast.success(SuccessMsgs.signUp.success);
      })
      .addCase(signupAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getMeAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.status = "fulfilled";
      })
      .addCase(getMeAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(loginAsync.pending, (state) => {
        state.authToken = "";
        state.status = "loading";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isUserLoggedIn = true;
        if (action.payload) {
          state.authToken = action.payload.result.data.access_token;
          setupLogin(action);
        }
        state.sidebarActiveTab = leftSideBarOptions.HOME;
      })
      .addCase(googleLoginAsync.pending, (state) => {
        state.showGoogleRegistrationForm.isFromGoogle = false;
        state.status = "loading";
      })
      .addCase(googleLoginAsync.rejected, (state) => {
        state.showGoogleRegistrationForm.isFromGoogle = false;
        state.status = "rejected";
      })
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (action.payload) {
          // user needs to register
          if (
            action.payload &&
            action.payload.data &&
            !action.payload.data.isRegistered
          ) {
            toast.success(action.payload.msg);
            state.showGoogleRegistrationForm.isFromGoogle = true;
            state.showGoogleRegistrationForm.email = action.payload.data.email;
          } else {
            state.isUserLoggedIn = true;
            // user can do login
            setupLogin(action);
          }
        }
      })
      .addCase(forgetPasswordAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        toast.success(action.payload.msg);
      })
      .addCase(forgetPasswordAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(verifiedForgetPasswordAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(verifiedForgetPasswordAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        toast.success(action.payload.msg);
      })
      .addCase(verifiedForgetPasswordAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default authSlice.reducer;
export const authState = (state) => state.auth;
export const authAction = authSlice.actions;
