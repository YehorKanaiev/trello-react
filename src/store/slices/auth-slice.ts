import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import authApi from '../../api/auth-api';

export interface AuthenticationState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

export const login = createAsyncThunk(
  'authSlice/login',
  async ({ email, password }: { email: string; password: string }) => authApi.login(email, password)
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});

export const selectAuth = (state: RootState): AuthenticationState => state.authentication;

export default authSlice.reducer;
