import { AxiosInstance } from 'axios';
import { Response, WithdrawParams } from '../types';
import { parseParams } from '../utils';
import { WithdrawResponse } from '../types';
import { getTransferParams } from './transfer';

export const withdraw = async (
  request: AxiosInstance,
  data: WithdrawParams
) => {
  const params = getTransferParams(request, data);
  return request.post<Response<WithdrawResponse>>('/api/v1/withdrawto', {
    ...parseParams(params),
  });
};
