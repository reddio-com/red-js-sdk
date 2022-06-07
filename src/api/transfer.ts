import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { parseParams } from '../utils/common';
import { TransferParams, TransferResponse } from '../types/api';

export const transfer = async (
  request: AxiosInstance,
  data: TransferParams
) => {
  return request.post<Response<TransferResponse>>('/api/v1/transfer', {
    ...parseParams(data),
  });
};
