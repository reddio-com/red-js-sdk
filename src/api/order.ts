import { AxiosInstance } from 'axios';
import {
  Response,
  OrderInfoResponse,
  OrderRequestParams,
  OrderResponse,
  OrderInfoRequestParams,
  OrderListRequestParams,
  OrderListResponse,
} from '../types';
import { parseParams } from '../utils/common';

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

export async function orderList(
  request: AxiosInstance,
  params: OrderListRequestParams
) {
  return request.get<Response<OrderListResponse[]>>('/v1/orders', {
    params: {
      ...parseParams(params),
    },
  });
}