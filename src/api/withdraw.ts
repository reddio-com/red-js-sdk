import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';
import { parseParams } from '../utils/common';

interface WithdrawParams extends RequestCommonParams {
  amount: number;
  tokenId: string;
}

interface WithdrawResponse {
  transaction_id: number;
}

export const withdraw = async (data: WithdrawParams) => {
  return reddio.request.post<Response<WithdrawResponse>>('/api/v1/withdraw', {
    ...parseParams(data),
  });
};
