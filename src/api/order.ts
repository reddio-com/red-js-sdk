import { AxiosInstance } from 'axios';
import {
  Response,
  RecordResponse,
  RecordParams,
  OrderInfoResponse,
} from '../types';
import { parseParams } from '../utils';

export async function sell(request: AxiosInstance, params: RecordParams) {
  return request.get<Response<RecordResponse>>('/v1/record', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function buy(request: AxiosInstance, params: RecordParams) {
  return request.get<Response<RecordResponse>>('/v1/record', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function info(request: AxiosInstance) {
  return request.get<Response<OrderInfoResponse>>('/v1/order/info');
}
