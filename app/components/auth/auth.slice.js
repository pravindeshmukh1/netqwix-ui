import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {googleLogin, login} from './auth.api';
import {toast} from 'react-toastify';
import {LOCAL_STORAGE_KEYS} from '../../common/constants';

const initialState = {
  status: 'pending',
  userAccType: '',
  isUserLoggedIn: false,
  showGoogleRegistrationForm: {
    isFromGoogle: false,
    email: null,
  },
};

export const signupAsync = createAsyncThunk ('signup', async payload => {
  try {
  } catch (err) {}
});

export const loginAsync = createAsyncThunk ('login', async payload => {
  try {
    const response = await login (payload);
    return response;
  } catch (err) {
    toast.error (err.response.data.error);
  }
});

export const googleLoginAsync = createAsyncThunk (
  'googleLogin',
  async payload => {
    try {
      const response = await googleLogin (payload);
      return response;
    } catch (err) {
      toast.error (err.response.data.error);
    }
  }
);

const setupLogin = action => {
  toast.success (action.payload.msg);
  localStorage.setItem (
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
    action.payload.result.data.access_token
  );
  localStorage.setItem (
    LOCAL_STORAGE_KEYS.ACC_TYPE,
    action.payload.result.data.account_type
  );
};

export const authSlice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {
    auth: state => {
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase (signupAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase (signupAsync.rejected, state => {
        state.status = 'rejected';
      })
      .addCase (signupAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      })
      .addCase (loginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase (loginAsync.rejected, state => {
        state.status = 'rejected';
      })
      .addCase (loginAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isUserLoggedIn = true;
        if (action.payload) {
          setupLogin(action);
        }
      })
      .addCase (googleLoginAsync.pending, state => {
        state.showGoogleRegistrationForm.isFromGoogle = false;
        state.status = 'loading';
      })
      .addCase (googleLoginAsync.rejected, state => {
        state.showGoogleRegistrationForm.isFromGoogle = false;
        state.status = 'rejected';
      })
      .addCase (googleLoginAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          // user needs to register
          if (
            action.payload &&
            action.payload.data &&
            !action.payload.data.isRegistered
          ) {
            toast.success (action.payload.msg);
            state.showGoogleRegistrationForm.isFromGoogle = true;
            state.showGoogleRegistrationForm.email = action.payload.data.email;
          } else {
            state.isUserLoggedIn = true;
            // user can do login
            setupLogin(action);
          }
        }
      });
  },
});

export default authSlice.reducer;
export const authState = state => state.auth;
export const authAction = authSlice.actions;
