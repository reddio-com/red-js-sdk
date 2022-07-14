import { AxiosInstance } from 'axios';
import { Response, MintResponse, MintOneParams, MintParams } from '../types';
import { parseParams } from '../utils';

export async function mintOne(request: AxiosInstance, params: MintOneParams) {
  return request.post<Response<MintResponse>>('/api/v1/mint', {
    amount: '1',
    ...parseParams(params),
  });
}

export async function mint(request: AxiosInstance, params: MintParams) {
  return request.post<Response<MintResponse>>('/api/v1/mint', {
    ...parseParams(params),
  });
}
