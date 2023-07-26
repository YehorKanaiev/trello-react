import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageKeys } from '../../core/storage/local-storage-keys.enum';
import { getAuthenticationInitState } from '../../core/storage/get-authentication-init-state';

interface StorageState {
  accessToken: string | null;
  refreshToken: string | null;
}

const { accessToken, refreshToken } = getAuthenticationInitState();

const initialState: StorageState = {
  accessToken,
  refreshToken,
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setAccessToken: (state, action: { payload: string }) => {
      localStorage.setItem(LocalStorageKeys.AccessToken, action.payload);
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: { payload: string }) => {
      localStorage.setItem(LocalStorageKeys.RefreshToken, action.payload);
      state.refreshToken = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken } = storageSlice.actions;

export default storageSlice.reducer;
