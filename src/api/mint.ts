import { AxiosInstance } from 'axios';
import { Response, MintResponse, MintParams } from '../types';
import { parseParams } from '../utils';

export async function mint(request: AxiosInstance, params: MintParams) {
  params.amount = params.amount.toString();
  return request.post<Response<MintResponse>>('/api/v1/mint', {
    ...parseParams(params),
  });
}
