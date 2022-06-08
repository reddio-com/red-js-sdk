import { AxiosInstance } from 'axios';
import { Response } from '../types/common';
import { ContractsAddressResponse } from '../types/api';

export const getContractAddress = (request: AxiosInstance) => {
  return request.get<Response<ContractsAddressResponse>>(
    '/api/v1/starkex/contracts'
  );
};
