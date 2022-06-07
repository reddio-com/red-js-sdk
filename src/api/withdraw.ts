import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { WithdrawParams, WithdrawResponse } from '../types/api';

export const withdraw = async (
  request: AxiosInstance,
  data: WithdrawParams
) => {
  return request.post<Response<WithdrawResponse>>('/api/v1/withdraw', {
    ...parseParams(data),
  });
};
