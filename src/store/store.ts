import { configureStore } from '@reduxjs/toolkit';
import LoaderReducer from './slices/loader-slice';
import AuthenticationReducer from './slices/auth-slice';
import { registerInterceptors } from '../api/interceptors';
import storageReducer from './slices/storage-slice';

const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    authentication: AuthenticationReducer,
    storage: storageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

registerInterceptors(store);
