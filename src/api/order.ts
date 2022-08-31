import { AxiosInstance } from 'axios';
import {
  Response,
  RecordResponse,
  OrderInfoResponse,
  OrderRequestParams,
} from '../types';

export async function order(
  request: AxiosInstance,
  params: OrderRequestParams
) {
  return request.post<Response<RecordResponse>>('/v1/order', {
    params,
  });
}

export async function info(request: AxiosInstance) {
  return request.get<Response<OrderInfoResponse>>('/v1/order/info');
}
