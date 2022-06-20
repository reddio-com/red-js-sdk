import axios, { AxiosInstance } from 'axios';
import config from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  depositERC20,
  depositETH,
  depositERC721,
  getBalance,
  getContractAddress,
  getNonce,
  getVaultID,
  mintOne,
  registerToken,
  transfer,
  withdrawFromL2,
} from './api';
import {
  erc20Approve,
  erc20Allowance,
  erc721Approve,
  withdrawFromL1,
} from './contract';
import {
  DepositParams,
  NonceParams,
  RegisterParams,
  SignParams,
  VaultParams,
  ApproveErc20Params,
  ErcCommonParams,
  Asset,
  WithdrawParams,
  ApproveErc721Params,
  WithdrawFromL1Params,
  MintOneParams,
} from './types';
import { Env, getAssetTypeAndId, generateFromEthSignature } from './utils';

interface ReddioCoreOptions {
  env?: 'test' | 'main';
  provider: JsonRpcProvider;
  network?: string;
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
    mintOne: (args: MintOneParams) => {
      return mintOne(this.request, args);
    },
    getNonce: (args: NonceParams) => {
      return getNonce(this.request, args);
    },
    registerToken: (args: RegisterParams) => {
      return registerToken(this.request, args);
    },
    transfer: (args: SignParams) => {
      return transfer(this.request, args);
    },
    getVaultID: (args: VaultParams) => {
      return getVaultID(this.request, args);
    },
    withdrawFromL2: (args: WithdrawParams) => {
      return withdrawFromL2(this.request, args);
    },
    withdrawFromL1: async (args: WithdrawFromL1Params) => {
      await this.getContractAddress();
      return withdrawFromL1(this.provider, this.contractAddress!, args);
    },
    depositERC20: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositERC20(this.provider, this.contractAddress!, args);
    },
    depositETH: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositETH(this.provider, this.contractAddress!, args);
    },
    depositERC721: async (args: DepositParams) => {
      await this.getContractAddress();
      return depositERC721(this.provider, this.contractAddress!, args);
    },
    getBalance: async () => {
      return getBalance(this.request);
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
    generateFromEthSignature: (msgParams: any) => {
      return generateFromEthSignature(this.provider, msgParams);
    },
  };

  public readonly utils = {
    getAssetTypeAndId: async (args: Asset) => {
      return getAssetTypeAndId(this.request, args);
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
