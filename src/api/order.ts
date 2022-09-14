import { AxiosInstance } from 'axios';
import {
  Response,
  OrderInfoResponse,
  OrderRequestParams,
  OrderResponse,
  OrderInfoRequestParams,
} from '../types';
import { parseParams } from '../utils';

export async function order(
  request: AxiosInstance,
  params: OrderRequestParams
) {
  return request.post<Response<OrderResponse>>('/v1/order', {
    ...params,
  });
}

export async function info(
  request: AxiosInstance,
  params: OrderInfoRequestParams
) {
  return request.get<Response<OrderInfoResponse>>('/v1/order/info', {
    params: {
      ...parseParams(params),
    },
  });
}
