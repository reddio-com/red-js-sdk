import { AxiosInstance } from 'axios';
import { Response, NonceResponse, StarkKeyParams } from '../types';
import { parseParams } from '../utils/common';

export const getNonce = async (
  request: AxiosInstance,
  params: StarkKeyParams,
) => request.get<Response<NonceResponse>>('/v1/nonce', {
  params: {
    ...parseParams(params),
  },
});
