import {RequestCommonParams, SignatureLike, SignParams} from './common';
import { Types } from '../utils';

/**
 * Balance
 */
export interface BalanceResponse {
  address: string;
  balance: number;
  currency: string;
  symbol: string;
  type: `${Types}`;
  website: string;
  logo: string;
}

/**
 * Deposit
 */
export interface DepositERC20Params {
  starkKey: string;
  assetType: string;
  vaultId: string;
  quantizedAmount: number | string;
}

/**
 * Mint
 */
export interface MintParams extends RequestCommonParams {
  amount: number;
}

export interface MintResponse {
  transaction_id: number;
}

/**
 * Nonce
 */
export type NonceParams = Pick<RequestCommonParams, 'starkKey'>;

export interface NonceResponse {
  nonce: number;
}

/**
 * Token
 */
export interface RegisterParams {
  address: string;
  type: keyof typeof Types;
}

export interface TokenResponse {
  tx_hash: string;
}

/**
 * Transfer
 */

export interface TransferRequestParams extends Partial<SignParams> {
  nonce: number;
  signature: SignatureLike
}

export interface TransferResponse {
  transaction_id: number;
}

/**
 * Vault
 */
export interface VaultParams extends RequestCommonParams {
  assetId?: string;
}

export interface VaultResponse {
  vault_id: string;
}

/**
 * Withdraw
 */
export interface WithdrawParams extends RequestCommonParams {
  amount: number;
  assetId: string;
}

export interface WithdrawResponse {
  transaction_id: number;
}

/**
 * Starkex
 */
export interface ContractsAddressResponse {
  mainnet: string;
  testnet: string;
}
