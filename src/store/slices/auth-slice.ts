import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import authApi from '../../api/auth-api';
import { setAccessToken, setRefreshToken } from './storage-slice';

export interface AuthenticationState {
  isLoggedIn: boolean;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'authentication/login',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    const authResult = await authApi.login(email, password);
    dispatch(setAccessToken(authResult.token));
    dispatch(setRefreshToken(authResult.refreshToken));

    return authResult;
  }
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
  },
});

export const selectAuth = (state: RootState): AuthenticationState => state.authentication;

export default authSlice.reducer;
