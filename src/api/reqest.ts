import axios from 'axios';
import { api } from '../core/constants';
import store from '../store/store';
import { hideLoader, showLoader } from '../store/reducers/loader/loaderSlice';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123',
  },
});

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

export default instance;
