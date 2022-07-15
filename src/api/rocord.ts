import { AxiosInstance } from 'axios';
import {
  Response,
  StarkKeyParams,
  RecordResponse,
  RecordParams,
} from '../types';
import { parseParams } from '../utils';

export async function getRecord(request: AxiosInstance, params: RecordParams) {
  return request.get<Response<RecordResponse>>('/v1/record', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getRecords(
  request: AxiosInstance,
  params: StarkKeyParams
) {
  return request.get<Response<RecordResponse[]>>('/v1/records', {
    params: {
      ...parseParams(params),
    },
  });
}
