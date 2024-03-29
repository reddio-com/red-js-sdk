import { AxiosInstance } from 'axios';
import { Response, ContractsAddressResponse } from '../types';

export const getContractAddress = (request: AxiosInstance) => request.get<Response<ContractsAddressResponse>>(
  '/v1/starkex/contracts',
);
