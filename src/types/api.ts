import { BigNumber } from 'ethers';
import {
  PageParams,
  SignatureLike,
  SignTransferParams,
  StarkKeyParams,
} from './common';
import { Types } from '../utils';

/**
 * Balance
 */
export interface BalanceV1Params extends StarkKeyParams {
  assetId: string;
}

export interface BalancesParams extends StarkKeyParams, Partial<PageParams> {
  type?: `${Types}`;
  contractAddress?: string;
}

export interface BalancesV2Params extends StarkKeyParams {
  type?: string;
  contractAddress?: string;
}

export interface AssetInfo {
  asset_id: string;
  contract_address: string;
  balance_available: number;
  balance_frozen: number;
  withdraw_frozen: number;
  type: `${Types}`;
  decimals: number;
  symbol: string;
  quantum: number;
  display_value: string;
  display_frozen: string;
  display_withdraw: string;
  available: string;
  frozen: string;
  withdraw: string;
  token_id: string;
  base_uri: string;
  token_uri: string;
}

export type BalanceResponse  = AssetInfo;

export interface BalancesV2Response {
  contract_address: string;
  balance_available: number;
  balance_frozen: number;
  decimals: number;
  symbol: string;
  quantum: number;
  display_value: string;
  display_frozen: string;
  type: `${Types}`;
  asset_id: string;
  available_token_ids: number[] | null;
  frozen_token_ids: number[] | null;
  base_uri: string;
}

interface Tokens {
  token_id: string;
  token_uri: string;
  asset_id: string;
}

export interface BalancesV3Response {
  asset_id: string;
  contract_address: string;
  balance_available: number;
  balance_frozen: number;
  withdraw_frozen: number;
  type: `${Types}`;
  decimals: number;
  symbol: string;
  quantum: number;
  available_tokens: Tokens[];
  frozen_tokens: Tokens[];
  base_uri: string;
}

/**
 * Record
 */
export interface RecordParams extends StarkKeyParams {
  sequenceId?: number;
}
export interface RecordsParams extends StarkKeyParams, Partial<PageParams> {
  contractAddress?: string;
  recordType?: number;
}

export interface TransferRecordResponse {
  stark_key: string;
  amount: string;
  asset_id: string;
  asset_type: `${Types}`;
  asset_name: string;
  contract_address: string;
  record_type: number;
  sequence_id: number;
  reason: string;
  status: number;
  time: number;
  display_value: string;
  token_id?: string;
  from?: string;
  to?: string;
  resp?: string;
}

export interface OrderRecordInfoResponse {
  direction: number;
  filled: string;
  volume: string;
  price: string;
  fee_taken: string;
  fee_token_asset: string;
  fee_asset_name: string;
  quote_asset_name: string;
  quote_asset_id: string;
  base_asset_name: string;
  base_asset_id: string;
  base_contract_address: string;
  quote_contract_address: string;
  quote_asset_type: `${Types}`;
  token_id?: string;
  display_price: string;
}

export interface OrderRecordResponse {
  amount: string;
  record_type: number;
  sequence_id: number;
  stark_key: string;
  time: number;
  status: number;
  order: OrderRecordInfoResponse;
  resp?: string;
}

export type RecordResponse = TransferRecordResponse | OrderRecordResponse;

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
  metadata_url: string;
}

/**
 * Deposit
 */
export interface DepositParams {
  starkKey: string;
  quantizedAmount: number | string;
}

export interface DepositERC20Params {
  starkKey: string;
  quantizedAmount: number | string;
  tokenAddress: string;
}

export interface Deposit721Params {
  starkKey: string;
  tokenId: number;
  tokenAddress: string;
  tokenUrl?: string;
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

export interface LogDepositWithTokenId {
  depositorEthKey: string;
  starkKey: BigNumber;
  vaultId: BigNumber;
  assetType: BigNumber;
  tokenId: BigNumber;
  assetId: BigNumber;
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
  vaultId: string;
  assetId: string;
  receiverVaultId: string;
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
export interface WithdrawalStatusParams {
  ethaddress: string;
  stage: 'withdrawarea';
}

export interface WithdrawalResponse {
  sequence_id: number;
}

export interface WithdrawalStatusResponse {
  asset_id: string;
  asset_type: string;
  token_id: string;
  amount: number;
  contract_address: string;
  symbol: string;
  type: `${Types}`;
  display_value: string;
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
    privateKey: string;
    publicKey: string;
  };
  price: string;
  amount: string;
  tokenAddress?: string;
  tokenId?: number | string;
  marketplaceUuid?: string;
  tokenType: `${Types}`;
  orderType: 'buy' | 'sell';
  baseTokenAddress?: string;
  baseTokenType?: `${Types}`;
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
  stark_key: string;
  direction: number;
  fee_info: {
    fee_limit: number;
    token_id: string;
    source_vault_id: number;
  };
  marketplace_uuid: string;
}

export interface OrderInfoRequestParams {
  starkKey: string;
  contract1: string;
  contract2: string;
}

export interface CancelOrderRequestParams {
  starkKey: string;
  privateKey: string;
  orderId: number;
}

export interface OrderListRequestParams extends Partial<PageParams> {
  starkKey?: string;
  contractAddress?: string;
  direction?: number;
  token_ids?: string;
}

export interface OrderResponse {
  sequence_id: number;
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
  vault_ids: string[];
}

export interface OrderSymbol {
  base_token_asset_id: string;
  quote_token_asset_id: string;
  base_token_contract_addr: string;
  quote_token_contract_addr: string;
  base_token_name: string;
  quote_token_name: string;
}

export interface OrderListResponse {
  order_id: number;
  stark_key: string;
  price: string;
  direction: number;
  display_price: string;
  token_id: string;
  token_type: `${Types}`;
  amount: string;
  un_filled: string;
  symbol: OrderSymbol;
  fee_rate: string;
}

export interface CollectionParams {
  quoteContractAddress: string;
  tokenIds: string;
  baseContractAddress: string;
}

export interface CollectionResponse {
  amount: number;
  price: string;
  display_price: string;
  owner: string;
  token_id: string;
  quote_contract_address: string;
  base_contract_address: string;
}
