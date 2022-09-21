import { AxiosInstance } from 'axios';
import { Response, SignTransferParams } from '../types';
import { parseParams } from '../utils';
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
