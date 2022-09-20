import {
  PageParams,
  SignatureLike,
  SignTransferParams,
  StarkKeyParams,
} from './common';
import { BigNumber } from 'ethers';
import {Types} from "../utils";

/**
 * Balance
 */
export interface BalanceParams extends StarkKeyParams {
  assetId?: string;
}

export interface BalancesParams extends StarkKeyParams, Partial<PageParams> {
  type?: string;
  contractAddress?: string;
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
  token_id: string;
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

export interface TransferRequestParams extends Partial<SignTransferParams> {
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
  assetId: string | string[];
  starkKeys: string | string[];
}

export interface VaultResponse {
  vault_ids: string[];
}

/**
 * Withdraw
 */
export interface WithdrawalParams extends SignTransferParams {
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

/**
 * Order
 */
export interface OrderParams {
  keypair: {
    privateKey: string,
    publicKey: string
  };
  price: string;
  amount: string;
  tokenAddress?: string;
  tokenId?: number | string;
  tokenType: `${Types}`;
  orderType: 'buy' | 'sell';
}

export interface OrderRequestParams {
  amount: string;
  amount_buy: string;
  amount_sell: string;
  token_buy: number;
  token_sell: string;
  price: string;
  quote_token: string;
  base_token: number;
  vault_id_buy: string;
  vault_id_sell: string;
  expiration_timestamp: number;
  nonce: number;
  signature: SignatureLike;
  account_id: string;
  direction: number;
  fee_info: {
    fee_limit: number
    token_id: string
    source_vault_id: number
  };
}

export interface OrderInfoRequestParams {
  starkKey: string
  contract1: string
  contract2: string
}

export interface OrderResponse {
  sequenceId: number;
}

export interface OrderInfoResponse {
  fee_rate: string;
  base_token: string;
  fee_token: string;
  lower_limit: number;
  nonce: number;
  contracts: Array<{
    contract_address: string;
    symbol: string;
    decimals: number;
    type: string;
    quantum: number;
    asset_type: string;
  }>;
  asset_ids: string[];
  vault_ids: string[]
}
