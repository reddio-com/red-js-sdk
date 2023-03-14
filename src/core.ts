import axios, { AxiosInstance } from 'axios';
import config from './config';
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
  withdrawalStatus,
  orderList,
  getOrderInfoWithId,
  cancelOrder,
  getBalancesV2,
  getCollection,
} from './api';
import {
  erc20Approve,
  erc721Approve,
  withdrawalFromL1,
} from './contract';
import {
  DepositParams,
  DepositERC20Params,
  Deposit721Params,
  SignTransferParams,
  VaultParams,
  ApproveErc20Params,
  Asset,
  ApproveErc721Params,
  WithdrawalFromL1Params,
  BalanceParams,
  RecordParams,
  BalancesParams,
  BalancesV2Params,
  OrderParams,
  OrderRequestParams,
  WithdrawalStatusParams,
  OrderListRequestParams,
  CancelOrderRequestParams,
  CollectionParams,
  RecordsParams,
  Client,
} from './types';
import {
  Env,
  getAssetTypeAndId,
  generateFromEthSignature,
  getOrderParams,
} from './utils';
import { getRecord, getRecords } from './api/rocord';

interface ReddioOptions {
  env?: 'test' | 'main';
  wagmiClient: Client;
  domain?: string;
}

interface CacheType {
  privateKey: string;
  publicKey: string;
}

class Reddio {
  protected options: ReddioOptions;

  protected request: AxiosInstance;

  protected cache: CacheType;

  protected contractAddress: string | undefined;

  protected client: Client;

  protected domain: string | undefined;

  protected walletAddress: string | undefined;

  constructor(options: ReddioOptions) {
    this.options = options;
    this.request = this.initRequest(options);
    this.cache = {} as CacheType;
    this.client = options.wagmiClient;
    this.domain = options.domain;
  }

  private initRequest = (options: ReddioOptions) => axios.create({
    baseURL: config.baseUrl[options.env || 'test'],
  });

  public readonly apis = {
    transfer: (args: SignTransferParams) => transfer(this.request, args),
    getVaultID: (args: VaultParams) => getVaultID(this.request, args),
    withdrawalFromL2: (args: SignTransferParams) => withdrawalFromL2(this.request, args),
    withdrawalFromL1: async (args: WithdrawalFromL1Params) => {
      await this.getContractAddress();
      return withdrawalFromL1(this.contractAddress!, args);
    },
    withdrawalStatus: async (args: WithdrawalStatusParams) => withdrawalStatus(this.request, args),
    depositERC20: async (args: DepositERC20Params) => {
      await this.getContractAddress();
      return depositERC20(this.request, this.contractAddress!, args);
    },
    depositETH: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositETH(this.request, this.contractAddress!, args);
    },
    depositERC721: async (args: Deposit721Params) => {
      await this.getContractAddress();
      return depositERC721(this.request, this.contractAddress!, args);
    },
    getBalance: async (args: BalanceParams) => getBalance(this.request, args),
    getBalances: async (args: BalancesParams) => getBalances(this.request, args),
    getBalancesV2: async (args: BalancesV2Params) => getBalancesV2(this.request, args),
    getRecord: async (args: RecordParams) => getRecord(this.request, args),
    getRecords: async (args: RecordsParams) => getRecords(this.request, args),
    order: async (args: OrderRequestParams) => order(this.request, args),
    getOrderInfoWithId: async (id: number) => getOrderInfoWithId(this.request, id),
    orderList: async (args: OrderListRequestParams) => orderList(this.request, args),
    cancelOrder: async (args: CancelOrderRequestParams) => cancelOrder(this.request, args),
    getCollection: async (arg: CollectionParams) => getCollection(this.request, arg),
  };

  public readonly erc20 = {
    approve: async (args: ApproveErc20Params) => {
      await this.getContractAddress();
      return erc20Approve(this.contractAddress!, args);
    },
  };

  public readonly erc721 = {
    approve: async (args: ApproveErc721Params) => {
      await this.getContractAddress();
      return erc721Approve(this.contractAddress!, args);
    },
  };

  public readonly keypair = {
    generateFromEthSignature: (): Promise<{
      privateKey: string;
      publicKey: string;
    }> => {
      const address = this.options.wagmiClient.data?.account;
      if (this.walletAddress && address && this.walletAddress === address) {
        if (this.cache.privateKey && this.cache.publicKey) {
          return Promise.resolve({
            privateKey: this.cache.privateKey,
            publicKey: this.cache.publicKey,
          });
        }
      }
      this.walletAddress = address;

      return generateFromEthSignature(
        this.options.env || 'test',
        this.domain,
      ).then((res) => {
        this.cache.privateKey = res.privateKey;
        this.cache.publicKey = res.publicKey;
        return res;
      });
    },
  };

  public readonly utils = {
    getAssetTypeAndId: async (
      args: Asset,
    ): Promise<{ assetId: string; assetType: string }> => getAssetTypeAndId(this.request, args),
    getOrderParams: async (args: OrderParams) => getOrderParams(this.request, args),
  };

  private getContractAddress = async () => {
    if (this.contractAddress) return;
    const { data } = await getContractAddress(this.request);
    this.contractAddress = this.options.env === Env.Test ? data.data.testnet : data.data.mainnet;
  };
}

export default Reddio;
