import { AxiosInstance } from 'axios';
import {
  Response,
  OrderInfoResponse,
  OrderRequestParams,
  OrderResponse,
  OrderInfoRequestParams,
  OrderListRequestParams,
  OrderListResponse,
  CancelOrderRequestParams,
  SequenceIdResponse,
  PaginateResponse,
  GetDepthRequestParams,
  GetDepthResponse,
  GetTradesRequestParams,
  GetTradesResponse,
} from '../types';
import { parseParams } from '../utils/common';
import { signCancelOrder } from '../utils/sign';
import assert from 'assert';

export async function order(
  request: AxiosInstance,
  params: OrderRequestParams
) {
  return request.post<Response<OrderResponse>>('/v1/order', {
    ...params,
  });
}

export async function getOrderInfoWithId(request: AxiosInstance, id: number) {
  return request.get<Response<OrderListResponse>>(`/v1/order?order_id=${id}`);
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
  return request.get<PaginateResponse<OrderListResponse[]>>('/v1/orders', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function cancelOrder(
  request: AxiosInstance,
  params: CancelOrderRequestParams
) {
  const signature = signCancelOrder(params);
  return request.post<Response<SequenceIdResponse>>(
    `/v1/orders/${params.orderId}/cancel`,
    {
      ...{
        signature,
        stark_key: params.starkKey,
      },
    }
  );
}

export async function getDepth(
  request: AxiosInstance,
  params: GetDepthRequestParams
) {
  return request.get<Response<GetDepthResponse>>('/v1/depth', {
    params: {
      ...parseParams(params),
    },
  });
}

export async function getTrades(
  request: AxiosInstance,
  params: GetTradesRequestParams
) {
  if (params.baseTokenContractAddr || params.quoteTokenContractAddr) {
    assert(
      params.baseTokenContractAddr && params.quoteTokenContractAddr,
      'baseTokenContractAddr and quoteTokenContractAddr is required'
    );
  } else {
    assert(
      params.orderId || params.starkKey,
      'orderId or starkKey is required'
    );
  }
  return request.get<PaginateResponse<GetTradesResponse>>('/v1/trades', {
    params: {
      ...parseParams(params),
    },
  });
}
