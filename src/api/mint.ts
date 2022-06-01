import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';

interface MintParams extends RequestCommonParams {
  amount: number;
}

interface MintResponse {
  txid: number;
}

export const mintERC20 = async (data: MintParams) => {
  const { address, starkKey, amount } = data;
  return reddio.request.post<Response<MintResponse>>('/api/v1/mint', {
    address,
    amount,
    stark_key: starkKey,
  });
};
