import { AxiosInstance } from 'axios';
import { Response, NonceResponse, StarkKeyParams } from '../types';
import { parseParams } from '../utils';

export const getNonce = async (
  request: AxiosInstance,
  params: StarkKeyParams
) => {
  return request.get<Response<NonceResponse>>('/api/v1/nonce', {
    params: {
      ...parseParams(params),
    },
  });
};
