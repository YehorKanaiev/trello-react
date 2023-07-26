import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { hideLoader, showLoader } from '../store/slices/loader-slice';
import instance from './reqest';

export function registerInterceptors(store: ToolkitStore): void {
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
}
