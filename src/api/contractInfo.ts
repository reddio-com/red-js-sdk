import { AxiosInstance } from 'axios';
import { Response, ContractInfoParams, ContractInfoResponse } from '../types';
import { parseParams } from '../utils/common';

export async function getContractInfo(
  request: AxiosInstance,
  params: ContractInfoParams
) {
  return request.get<Response<ContractInfoResponse>>(
    'https://reddifi.reddio.com/api/v1/contract_info',
    {
      params: parseParams(params),
    }
  );
}
