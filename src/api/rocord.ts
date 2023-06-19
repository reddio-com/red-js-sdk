import { AxiosInstance } from 'axios';
import {
  Response,
  RecordParams,
  RecordsParams,
  RecordResponse,
  PaginateResponse,
  RecordsBySignatureParams,
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
  params: RecordsParams
) {
  return request.get<PaginateResponse<[RecordResponse]>>('/v1/records', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getRecordsBySignature(
  request: AxiosInstance,
  params: RecordsBySignatureParams
) {
  return request.get<PaginateResponse<RecordResponse>>(
    '/v1/record/by/signature',
    {
      params: {
        ...parseParams(params),
      },
    }
  );
}

export async function getTokenIdBySeqId(request: AxiosInstance, id: number) {
  return request.get<Response<{ token_id: number }>>(`/v1/token?seq_id=${id}`);
}
