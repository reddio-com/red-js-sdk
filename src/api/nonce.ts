import reddio from '../core';
import { RequestCommonParams, Response } from '../types/common';
import { parseParams } from '../utils/common';

type NonceParams = Pick<RequestCommonParams, 'starkKey'>;

interface NonceResponse {
  nonce: number;
}

export const getNonce = async (params: NonceParams) => {
  return reddio.request.get<Response<NonceResponse>>('/api/v1/nonce', {
    params: {
      ...parseParams(params),
    },
  });
};
