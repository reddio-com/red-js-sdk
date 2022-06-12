export interface Erc20CommonParams {
  tokenAddress: string;
}
/**
 * Approve
 */
export interface ApproveErc20Params extends Erc20CommonParams {
  amount: string | number;
}
