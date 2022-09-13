import axios, { AxiosInstance } from 'axios';
import config from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  depositERC20,
  depositETH,
  depositERC721,
  getBalance,
  getContractAddress,
  getVaultID,
  transfer,
  withdrawalFromL2,
  getBalances,
  order,
} from './api';
import {
  erc20Approve,
  erc20Allowance,
  erc721Approve,
  withdrawalFromL1,
} from './contract';
import {
  DepositParams,
  Deposit721Params,
  StarkKeyParams,
  SignTransferParams,
  VaultParams,
  ApproveErc20Params,
  ErcCommonParams,
  Asset,
  WithdrawalParams,
  ApproveErc721Params,
  WithdrawalFromL1Params,
  BalanceParams,
  RecordParams,
  BalancesParams,
  OrderParams,
  OrderRequestParams,
} from './types';
import {
  Env,
  getAssetTypeAndId,
  generateFromEthSignature,
  getOrderParams,
} from './utils';
import { getRecord, getRecords } from './api/rocord';

interface ReddioCoreOptions {
  env?: 'test' | 'main';
  provider: JsonRpcProvider;
}

class ReddioCore {
  protected options: ReddioCoreOptions;
  protected request: AxiosInstance;
  protected provider: JsonRpcProvider;
  protected contractAddress: string | undefined;

  constructor(options: ReddioCoreOptions) {
    this.options = options;
    this.provider = options.provider;
    this.request = this.initRequest(options);
  }

  private initRequest = (options: ReddioCoreOptions) => {
    return axios.create({
      baseURL: config.baseUrl[options.env || 'test'],
    });
  };

  public readonly apis = {
    transfer: (args: SignTransferParams) => {
      return transfer(this.request, args);
    },
    getVaultID: (args: VaultParams) => {
      return getVaultID(this.request, args);
    },
    withdrawalFromL2: (args: WithdrawalParams) => {
      return withdrawalFromL2(this.request, args);
    },
    withdrawalFromL1: async (args: WithdrawalFromL1Params) => {
      await this.getContractAddress();
      return withdrawalFromL1(this.provider, this.contractAddress!, args);
    },
    depositERC20: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositERC20(this.provider, this.contractAddress!, args);
    },
    depositETH: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositETH(this.provider, this.contractAddress!, args);
    },
    depositERC721: async (args: Deposit721Params) => {
      await this.getContractAddress();
      return depositERC721(this.provider, this.contractAddress!, args);
    },
    getBalance: async (args: BalanceParams) => {
      return getBalance(this.request, args);
    },
    getBalances: async (args: BalancesParams) => {
      return getBalances(this.request, args);
    },
    getRecord: async (args: RecordParams) => {
      return getRecord(this.request, args);
    },
    getRecords: async (args: StarkKeyParams) => {
      return getRecords(this.request, args);
    },
    order: async (args: OrderRequestParams) => {
      return order(this.request, args);
    },
  };

  public readonly erc20 = {
    approve: async (args: ApproveErc20Params) => {
      await this.getContractAddress();
      return erc20Approve(this.provider, this.contractAddress!, args);
    },
    allowance: async (args: ErcCommonParams) => {
      await this.getContractAddress();
      return erc20Allowance(this.provider, this.contractAddress!, args);
    },
  };

  public readonly erc721 = {
    approve: async (args: ApproveErc721Params) => {
      await this.getContractAddress();
      return erc721Approve(this.provider, this.contractAddress!, args);
    },
  };

  public readonly keypair = {
    generateFromEthSignature: (): Promise<{
      privateKey: string;
      publicKey: string;
    }> => {
      return generateFromEthSignature(this.provider);
    },
  };

  public readonly utils = {
    getAssetTypeAndId: async (
      args: Asset
    ): Promise<{ assetId: string; assetType: string }> => {
      return getAssetTypeAndId(this.request, args);
    },
    getOrderParams: async (args: OrderParams) => {
      return getOrderParams(this.request, args);
    },
  };

  private getContractAddress = async () => {
    if (this.contractAddress) return;
    const { data } = await getContractAddress(this.request);
    this.contractAddress =
      this.options.env === Env.Test ? data.data.testnet : data.data.mainnet;
  };
}

export default ReddioCore;
