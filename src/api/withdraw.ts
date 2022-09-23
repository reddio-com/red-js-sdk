import { AxiosInstance } from 'axios';
import { Response, SignTransferParams, WithdrawalStatusParams, WithdrawalStatusResponse } from '../types';
import { parseParams } from '../utils/common';
import { WithdrawalResponse } from '../types';
import { getTransferParams } from './transfer';

export const withdrawalFromL2 = async (
  request: AxiosInstance,
  data: SignTransferParams
) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<WithdrawalResponse>>('/v1/withdrawalto', {
    ...parseParams(params),
  });
};

export const withdrawalStatus = async (
  request: AxiosInstance,
  params: WithdrawalStatusParams
) => {
  return request.get<Response<WithdrawalStatusResponse[]>>('/v1/withdrawal/status', {
    params: {
      ...parseParams(params),
    },
  });
};
