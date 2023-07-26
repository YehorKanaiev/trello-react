import { LocalStorageKeys } from './local-storage-keys.enum';

interface AuthenticationState {
  accessToken: string | null;
  refreshToken: string | null;
}

export function getAuthenticationInitState(): AuthenticationState {
  return {
    accessToken: localStorage.getItem(LocalStorageKeys.AccessToken),
    refreshToken: localStorage.getItem(LocalStorageKeys.RefreshToken),
  };
}
