import { AxiosInstance } from 'axios';
import {
  Response,
  RecordParams,
  RecordsParams, TransferRecordResponse, OrderRecordResponse,
} from '../types';
import { parseParams } from '../utils';

export async function getRecord(request: AxiosInstance, params: RecordParams) {
  return request.get<Response<TransferRecordResponse | OrderRecordResponse>>('/v1/record', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getRecords(
  request: AxiosInstance,
  params: RecordsParams
) {
  return request.get<Response<[TransferRecordResponse | OrderRecordResponse]>>('/v1/records', {
    params: {
      ...parseParams(params),
    },
  });
}
