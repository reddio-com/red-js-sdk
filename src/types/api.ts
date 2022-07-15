import {RequestCommonParams, SignatureLike, SignParams, StarkKeyParams} from './common';
import { Types } from '../utils';

/**
 * Balance
 */
export interface BalanceParams extends StarkKeyParams {
  assetId?: string;
}

export interface BalanceResponse {
  asset_id: string;
  contract_address: string;
  balance_available: number;
  type: string;
  decimals: number;
  symbol: string;
  quantum: number;
  display_value: string;
}

/**
 * Record
 */
export interface RecordParams extends StarkKeyParams {
  sequence_id?: number;
}
export interface RecordResponse {
  stark_key: string;
  sequence_id: number;
  reason: string;
  status: number;
}

/**
 * Contract
 */
export interface ContractInfoParams {
  contractAddress: string
}
export interface ContractInfoResponse {
  quantum: number
  count: number
  type: string
  decimals: string
  symbol: string
  total_supply: string
  asset_type: string
  asset_info: string
  id: number
  belongs_to: string
  contract_uuid: string
  chain_status: string
  contract_address: string
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

export type MintOneParams = Omit<MintParams, 'amount'>

export interface MintResponse {
  sequence_id: number;
}

/**
 * Nonce
 */
export interface NonceResponse {
  nonce: number;
}

/**
 * Token
 */
export interface RegisterParams {
  // ETH 不需要传
  contract_address?: string;
  type: keyof typeof Types;
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
  tokenID?: string;
  type: `${Types}`
  starkKeys: string | string[];
}

export interface VaultResponse {
  vault_ids: number[];
}

/**
 * Withdraw
 */
export interface WithdrawParams extends SignParams {
  // ETH 不传
  contractAddress?: string;
  // erc20 不传
  tokenId?: string;
}

export interface WithdrawResponse {
  sequence_id: number;
}

/**
 * Starkex
 */
export interface ContractsAddressResponse {
  mainnet: string;
  testnet: string;
}
