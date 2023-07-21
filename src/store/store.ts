import { configureStore } from '@reduxjs/toolkit';
import LoaderReducer, { hideLoader, showLoader } from './slices/loader-slice';
import AuthenticationReducer from './slices/auth-slice';
import instance from '../api/reqest';

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    authentication: AuthenticationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

instance.interceptors.request.use((req) => {
  store.dispatch(showLoader());

  return req;
});

instance.interceptors.response.use(
  (res) => {
    store.dispatch(hideLoader());

    return res;
  },
  (err) => {
    store.dispatch(hideLoader());

    return Promise.reject(err);
  }
);
