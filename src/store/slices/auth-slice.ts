import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '../store';
import authApi from '../../api/auth-api';
import { setAccessToken, setRefreshToken } from './storage-slice';
import { showSnackbar } from './snackbar-slice';
import { Snackbar } from '../../core/interfaces/snackbar.interface';

export interface AuthenticationState {
  isLoggedIn: boolean;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'authentication/login',
  async ({ email, password }: { email: string; password: string }, { dispatch }) =>
    authApi
      .login(email, password)
      .then((response) => {
        dispatch(setAccessToken(response.token));
        dispatch(setRefreshToken(response.refreshToken));

        return response;
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const snackbarState: Snackbar = {
          message: err.response?.data?.error ?? err.message,
          type: 'error',
        };
        dispatch(showSnackbar(snackbarState));

        return {
          result: 'Not-authorized',
          token: '',
          refreshToken: '',
        };
      })
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.result === 'Authorized';
    });
  },
});

export const selectAuth = (state: RootState): AuthenticationState => state.authentication;

export default authSlice.reducer;
