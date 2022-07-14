import { AxiosInstance } from 'axios';
import {
  Response,
  BalanceResponse,
  BalanceParams,
  RequestCommonParams,
} from '../types';
import { parseParams } from '../utils';

export async function getBalance(
  request: AxiosInstance,
  params: Pick<RequestCommonParams, 'starkKey'>
) {
  return request.get<Response<BalanceResponse>>('/api/v1/balance', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getBalances(
  request: AxiosInstance,
  params: BalanceParams
) {
  return request.get<Response<BalanceResponse[]>>('/api/v1/balances', {
    params: {
      ...parseParams(params),
    },
  });
}
