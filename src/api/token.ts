import { AxiosInstance } from 'axios';
import { Response, RegisterParams, TokenResponse } from '../types';

// dashboard 里用，SDK 里删掉
export const registerToken = async (
  request: AxiosInstance,
  data: RegisterParams
) => {
  return request.post<Response<TokenResponse>>('/api/v1/token/register', data);
};
