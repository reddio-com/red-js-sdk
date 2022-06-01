import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';

type NonceParams = Pick<RequestCommonParams, 'starkKey'>;

interface NonceResponse {
  nonce: number;
}

export const getNonce = async (data: NonceParams) => {
  const { starkKey } = data;
  return reddio.request.get<Response<NonceResponse>>('/api/v1/nonce', {
    params: {
      stark_key: starkKey,
    },
  });
};
