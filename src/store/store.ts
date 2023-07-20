import { configureStore } from '@reduxjs/toolkit';
import LoaderReducer from './slices/loader-slice';

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
