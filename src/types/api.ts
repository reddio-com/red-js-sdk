import {
  PageParams,
  SignatureLike,
  SignParams,
  StarkKeyParams,
} from './common';
import { BigNumber } from 'ethers';

/**
 * Balance
 */
export interface BalanceParams extends StarkKeyParams {
  assetId?: string;
}

export type BalancesParams = StarkKeyParams & Partial<PageParams>;

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
  sequenceId?: number;
}
export type RecordsParams = StarkKeyParams & Partial<PageParams>;
export interface RecordResponse {
  stark_key: string;
  sequence_id: number;
  reason: string;
  status: number;
  extra_data: {
    token_id: string;
  };
}

/**
 * Contract
 */
export interface ContractInfoParams {
  type: string;
  contractAddress: string;
}
export interface ContractInfoResponse {
  quantum: number;
  count: number;
  type: string;
  decimals: string;
  symbol: string;
  total_supply: string;
  asset_type: string;
  asset_info: string;
  id: number;
  belongs_to: string;
  contract_uuid: string;
  chain_status: string;
  contract_address: string;
}

/**
 * Deposit
 */
export interface DepositParams {
  starkKey: string;
  assetType: string;
  vaultId: string;
  quantizedAmount: number | string;
}

export interface Deposit721Params {
  starkKey: string;
  assetType: string;
  vaultId: string;
  tokenId: number;
}

export interface LogDeposit {
  depositorEthKey: string;
  starkKey: BigNumber;
  vaultId: BigNumber;
  assetType: BigNumber;
  nonQuantizedAmount: BigNumber;
  quantizedAmount: BigNumber;
  raw: Record<string, any>;
}

/**
 * Nonce
 */
export interface NonceResponse {
  nonce: number;
}

/**
 * Transfer
 */

export interface TransferRequestParams extends Partial<SignParams> {
  nonce: number;
  signature: SignatureLike;
}

export interface TransferResponse {
  sequence_id: number;
}

/**
 * Vault
 */
export interface VaultParams {
  assetId: string;
  starkKeys: string | string[];
}

export interface VaultResponse {
  vault_ids: string[];
}

/**
 * Withdraw
 */
export interface WithdrawalParams extends SignParams {
  contractAddress?: string;
  tokenId?: string | number;
}

export interface WithdrawalResponse {
  sequence_id: number;
}

/**
 * Starkex
 */
export interface ContractsAddressResponse {
  mainnet: string;
  testnet: string;
}
