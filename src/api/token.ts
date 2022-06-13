import { AxiosInstance } from 'axios';
import { Response, RegisterParams, TokenResponse } from '../types';

export const registerToken = async (
  request: AxiosInstance,
  data: RegisterParams
) => {
  return request.post<Response<TokenResponse>>('/api/v1/token/register', data);
};
