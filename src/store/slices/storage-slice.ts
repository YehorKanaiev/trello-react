import { createSlice } from '@reduxjs/toolkit';

interface StorageState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: StorageState = {
  accessToken: null,
  refreshToken: null,
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setAccessToken: (state, action: { payload: string }) => {
      localStorage.setItem('token', action.payload);
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: { payload: string }) => {
      localStorage.setItem('refresh-token', action.payload);
      state.refreshToken = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken } = storageSlice.actions;

export default storageSlice.reducer;
