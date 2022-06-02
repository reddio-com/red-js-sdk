import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';
import { parseParams } from '../utils/common';

interface MintParams extends RequestCommonParams {
  amount: number;
}

interface MintResponse {
  transaction_id: number;
}

export const mintERC20 = async (params: MintParams) => {
  return reddio.request.post<Response<MintResponse>>('/api/v1/mint', {
    ...parseParams(params),
  });
};
