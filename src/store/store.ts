import { configureStore } from '@reduxjs/toolkit';
import LoaderReducer from './reducers/loader/loaderSlice';

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
