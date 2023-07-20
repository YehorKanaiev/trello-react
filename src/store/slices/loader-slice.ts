import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => ({
      ...state,
      loading: true,
    }),
    hideLoader: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export const selectLoader = (state: RootState): LoaderState => state.loader;

export default loaderSlice.reducer;
