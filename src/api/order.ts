import { AxiosInstance } from 'axios';
import {
  Response,
  OrderInfoResponse,
  OrderRequestParams,
  OrderResponse,
} from '../types';

export async function order(
  request: AxiosInstance,
  params: OrderRequestParams
) {
  return request.post<Response<OrderResponse>>('/v1/order', {
    ...params,
  });
}

export async function info(request: AxiosInstance) {
  return request.get<Response<OrderInfoResponse>>('/v1/order/info');
}
