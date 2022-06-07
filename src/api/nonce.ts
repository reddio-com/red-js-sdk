import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { NonceParams, NonceResponse } from '../types/api';

export const getNonce = async (request: AxiosInstance, params: NonceParams) => {
  return request.get<Response<NonceResponse>>('/api/v1/nonce', {
    params: {
      ...parseParams(params),
    },
  });
};
