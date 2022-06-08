import { RequestCommonParams, SignatureLike } from './common';
import { Types } from '../utils/enum';

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
  tx_hash: number;
}

/**
 * Transfer
 */
export interface TransferParams {
  starkKey: string;
  tokenId: string;
  amount: number;
  nonce: number;
  vaultId: number;
  receiver: string;
  receiverVaultId: number;
  expirationTimestamp: number;
  signature: SignatureLike;
}

export interface TransferResponse {
  transaction_id: number;
}

/**
 * Vault
 */
export interface VaultParams extends RequestCommonParams {
  tokenId?: string;
}

export interface VaultResponse {
  vault_id: number;
}

/**
 * Withdraw
 */
export interface WithdrawParams extends RequestCommonParams {
  amount: number;
  tokenId: string;
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
