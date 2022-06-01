import reddio from '../core';
import { Types } from '../utils/enum';
import { Response } from '../types/common';

interface RegisterParams {
  address: string;
  type: keyof typeof Types;
}

interface TokenResponse {
  tx_hash: number;
}

export const registerToken = async (data: RegisterParams) => {
  return reddio.request.post<Response<TokenResponse>>(
    '/api/v1/token/register',
    data
  );
};
