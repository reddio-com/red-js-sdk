import axios, { AxiosInstance } from 'axios';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
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
  cancelOrder,
  getBalancesV2,
  getCollection,
} from './api';
import {
  erc20Approve,
  erc20Allowance,
  erc721Approve,
  withdrawalFromL1,
} from './contract';
import {
  DepositParams,
  DepositERC20Params,
  Deposit721Params,
  StarkKeyParams,
  SignTransferParams,
  VaultParams,
  ApproveErc20Params,
  ErcCommonParams,
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
  provider: JsonRpcProvider;
}

class Reddio {
  protected options: ReddioOptions;

  protected request: AxiosInstance;

  protected provider: JsonRpcProvider;

  protected contractAddress: string | undefined;

  protected cacheSigner: JsonRpcSigner;

  constructor(options: ReddioOptions) {
    this.options = options;
    this.cacheSigner = {} as JsonRpcSigner;
    this.request = this.initRequest(options);
    this.provider = this.initProvider(options);
  }

  private initProvider = (options: ReddioOptions) => {
    const provider = options.provider;
    const tempGetSigner = options.provider.getSigner.bind(options.provider);
    provider.getSigner = () => {
      if (Object.keys(this.cacheSigner).length) {
        return this.cacheSigner;
      }

      const signer = tempGetSigner();

      this.cacheSigner = signer;
      return signer;
    };
    return provider;
  };

  private initRequest = (options: ReddioOptions) => axios.create({
    baseURL: config.baseUrl[options.env || 'test'],
  });

  public readonly apis = {
    transfer: (args: SignTransferParams) => transfer(this.request, args),
    getVaultID: (args: VaultParams) => getVaultID(this.request, args),
    withdrawalFromL2: (args: SignTransferParams) => withdrawalFromL2(this.request, args),
    withdrawalFromL1: async (args: WithdrawalFromL1Params) => {
      await this.getContractAddress();
      return withdrawalFromL1(this.provider, this.contractAddress!, args);
    },
    withdrawalStatus: async (args: WithdrawalStatusParams) => withdrawalStatus(this.request, args),
    depositERC20: async (args: DepositERC20Params) => {
      await this.getContractAddress();
      return depositERC20(
        this.request,
        this.provider,
        this.contractAddress!,
        args,
      );
    },
    depositETH: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositETH(
        this.request,
        this.provider,
        this.contractAddress!,
        args,
      );
    },
    depositERC721: async (args: Deposit721Params) => {
      await this.getContractAddress();
      return depositERC721(
        this.request,
        this.provider,
        this.contractAddress!,
        args,
      );
    },
    getBalance: async (args: BalanceParams) => getBalance(this.request, args),
    getBalances: async (args: BalancesParams) => getBalances(this.request, args),
    getBalancesV2: async (args: BalancesV2Params) => getBalancesV2(this.request, args),
    getRecord: async (args: RecordParams) => getRecord(this.request, args),
    getRecords: async (args: StarkKeyParams) => getRecords(this.request, args),
    order: async (args: OrderRequestParams) => order(this.request, args),
    orderList: async (args: OrderListRequestParams) => orderList(this.request, args),
    cancelOrder: async (args: CancelOrderRequestParams) => cancelOrder(this.request, args),
    getCollection: async (arg: CollectionParams) => getCollection(this.request, arg),
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
    }> => generateFromEthSignature(
      this.provider,
      this.options.env || 'test',
    ),
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
