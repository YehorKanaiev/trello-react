import instance from './reqest';
import { AuthorizationResult } from '../core/interfaces/authorization-result.interface';

const authApi = {
  login(email: string, password: string): Promise<AuthorizationResult> {
    return instance.post<AuthorizationResult>('login', { email, password }).then((res) => res.data);
  },
};

export default authApi;
