import { AxiosInstance } from 'axios';
import { Response, WithdrawParams } from '../types';
import { parseParams } from '../utils';
import { WithdrawResponse } from '../types';
import { getTransferParams } from './transfer';

export const withdrawFromL2 = async (
  request: AxiosInstance,
  data: WithdrawParams
) => {
  const params = await getTransferParams(request, data);
  console.log(params);
  return request.post<Response<WithdrawResponse>>('/api/v1/withdrawto', {
    ...parseParams(params),
  });
};
