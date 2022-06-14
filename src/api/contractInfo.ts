import { AxiosInstance } from 'axios';
import { Response, ContractInfoParams, ContractInfoResponse } from '../types';
import { parseParams } from '../utils';

export async function getContractInfo(
  request: AxiosInstance,
  params: ContractInfoParams
) {
  return request.get<Response<ContractInfoResponse>>(
    'https://reddifi.reddio.com/api/contract_info',
    {
      params: parseParams(params),
    }
  );
}
