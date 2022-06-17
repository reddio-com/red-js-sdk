export interface ErcCommonParams {
  tokenAddress: string;
}
/**
 * Approve
 */
export interface ApproveErc20Params extends ErcCommonParams {
  amount: string | number;
}

export interface ApproveErc721Params extends ErcCommonParams {
  tokenId: string | number;
}
