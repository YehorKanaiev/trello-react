import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Snackbar } from '../../core/interfaces/snackbar.interface';

export interface SnackbarState {
  snackbar: Snackbar | null;
}

const initialState: SnackbarState = {
  snackbar: null,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: { payload: Snackbar }) => ({
      ...state,
      snackbar: action.payload,
    }),
    hideSnackbar: (state) => ({
      ...state,
      snackbar: null,
    }),
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState): SnackbarState => state.snackbar;

export default snackbarSlice.reducer;
