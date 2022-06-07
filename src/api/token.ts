import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { RegisterParams, TokenResponse } from '../types/api';

export const registerToken = async (
  request: AxiosInstance,
  data: RegisterParams
) => {
  return request.post<Response<TokenResponse>>('/api/v1/token/register', data);
};
