import { Types } from '../utils';

export interface ErcCommonParams {
  tokenAddress: string;
}
/**
 * Approve
 */
export interface ApproveErc20Params extends ErcCommonParams {
  amount: string | number | 'max';
}

export interface AllowanceErc20Params extends ErcCommonParams {
  ethAddress: string;
}

export interface ApproveErc721Params extends ErcCommonParams {
  tokenId: string | number;
}

export interface WithdrawalFromL1Params {
  ethAddress: string;
  assetType: string;
  type: `${Types}`
  tokenId?: number;
  tokenUrl?: string;
}
