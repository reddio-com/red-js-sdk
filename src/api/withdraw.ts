import { AxiosInstance } from 'axios';
import { Response, WithdrawalParams } from '../types';
import { parseParams } from '../utils';
import { WithdrawalResponse } from '../types';
import { getTransferParams } from './transfer';

export const withdrawalFromL2 = async (
  request: AxiosInstance,
  data: WithdrawalParams
) => {
  const params = await getTransferParams(request, data);
  return request.post<Response<WithdrawalResponse>>('/v1/withdrawalto', {
    ...parseParams(params),
  });
};
