import { AxiosInstance } from 'axios';
import {
  Response,
  BalanceResponse,
  BalanceParams,
  BalancesParams,
  PaginateResponse,
  BalancesV2Response,
  BalancesV3Response,
} from '../types';
import { parseParams } from '../utils/common';

export async function getBalance(
  request: AxiosInstance,
  params: BalanceParams
) {
  return request.get<Response<BalanceResponse>>('/v1/balance', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getBalances(
  request: AxiosInstance,
  params: BalancesParams
) {
  return request.get<PaginateResponse<BalanceResponse[]>>('/v1/balances', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getBalancesV2(
  request: AxiosInstance,
  params: BalancesParams
) {
  return request.get<Response<BalancesV2Response[]>>('/v2/balances', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getBalancesV3(
  request: AxiosInstance,
  params: BalancesParams
) {
  return request.get<Response<BalancesV3Response[]>>('/v3/balances', {
    params: {
      ...parseParams(params),
    },
  });
}
