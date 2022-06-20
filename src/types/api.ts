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
 * Balance
 */
export interface ContractInfoParams {
  contractAddress: string
}
export interface ContractInfoResponse {
  quantum: string
}

/**
 * Deposit
 */
export interface DepositParams {
  starkKey: string;
  assetType: string;
  vaultId: string;
  // 721 可不传
  quantizedAmount: number | string;
}

/**
 * Mint
 */
export interface MintParams extends RequestCommonParams {
  amount: number | string;
}

export interface MintResponse {
  transaction_id: number;
  token_id: number;
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
  // ETH 不需要传
  address?: string;
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
export interface VaultParams extends Omit<RequestCommonParams, 'starkKey'> {
  assetId?: string;
  type: `${Types}`
  starkKeys: string | string[];
}

export interface VaultResponse {
  vault_ids: string | string[];
}

/**
 * Withdraw
 */
export interface WithdrawParams extends SignParams {
  // ETH 不传
  address?: string;
  // erc20 不传
  tokenId?: string;
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
