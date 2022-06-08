import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { BalanceResponse } from '../types/api';

export async function getBalance(request: AxiosInstance) {
  return request.get<Response<BalanceResponse>>('/api/v1/balance');
}
