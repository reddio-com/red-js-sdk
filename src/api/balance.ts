import { AxiosInstance } from 'axios';
import { Response, BalanceResponse } from '../types';

export async function getBalance(request: AxiosInstance) {
  return request.get<Response<BalanceResponse>>('/api/v1/balance');
}
