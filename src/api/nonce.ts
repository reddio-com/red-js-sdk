import { AxiosInstance } from 'axios';
import { Response, NonceParams, NonceResponse } from '../types';
import { parseParams } from '../utils';

export const getNonce = async (request: AxiosInstance, params: NonceParams) => {
  return request.get<Response<NonceResponse>>('/api/v1/nonce', {
    params: {
      ...parseParams(params),
    },
  });
};
