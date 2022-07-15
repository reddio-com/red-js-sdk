import { AxiosInstance } from 'axios';
import { Response, MintResponse, MintOneParams, MintParams } from '../types';
import { parseParams } from '../utils';

export async function mintOne(request: AxiosInstance, params: MintOneParams) {
  return request.post<Response<MintResponse>>('/v1/mints', {
    amount: '1',
    ...parseParams(params),
  });
}

export async function mints(request: AxiosInstance, params: MintParams) {
  return request.post<Response<MintResponse>>('/v1/mints', {
    ...parseParams(params),
  });
}
