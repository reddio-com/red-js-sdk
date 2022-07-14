import { AxiosInstance } from 'axios';
import {
  Response,
  BalanceResponse,
  RequestCommonParams,
  RecordResponse,
  RecordParams,
} from '../types';
import { parseParams } from '../utils';

export async function getRecord(request: AxiosInstance, params: RecordParams) {
  return request.get<Response<BalanceResponse>>('/api/v1/record', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getRecords(
  request: AxiosInstance,
  params: Pick<RequestCommonParams, 'starkKey'>
) {
  return request.get<Response<RecordResponse[]>>('/api/v1/records', {
    params: {
      ...parseParams(params),
    },
  });
}
