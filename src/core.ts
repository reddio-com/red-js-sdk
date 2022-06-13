import axios, { AxiosInstance } from 'axios';
import config from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  depositERC20,
  getBalance,
  getContractAddress,
  getNonce,
  getVaultID,
  mintERC20,
  registerToken,
  transfer,
  withdraw,
} from './api';
import { allowance, approve } from './contract';
import { generateFromEthSignature } from './utils/keypair';
import {
  DepositERC20Params,
  MintParams,
  NonceParams,
  RegisterParams,
  TransferParams,
  VaultParams,
  WithdrawParams,
} from './types/api';
import { ApproveErc20Params, Erc20CommonParams } from './types/erc20';
import { Env } from './utils/enum';
import { getAssetTypeAndId } from './utils/asset';
import { Asset } from './types/asset';

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
    mintERC20: (args: MintParams) => {
      return mintERC20(this.request, args);
    },
    getNonce: (args: NonceParams) => {
      return getNonce(this.request, args);
    },
    registerToken: (args: RegisterParams) => {
      return registerToken(this.request, args);
    },
    transfer: (args: TransferParams) => {
      return transfer(this.request, args);
    },
    getVaultID: (args: VaultParams) => {
      return getVaultID(this.request, args);
    },
    withdraw: (args: WithdrawParams) => {
      return withdraw(this.request, args);
    },
    depositERC20: async (args: DepositERC20Params) => {
      await this.getContractAddress();
      return depositERC20(this.provider, this.contractAddress!, args);
    },
    getBalance: async () => {
      return getBalance(this.request);
    },
  };

  public readonly erc20 = {
    approve: async (args: ApproveErc20Params) => {
      await this.getContractAddress();
      return approve(this.provider, this.contractAddress!, args);
    },
    allowance: async (args: Erc20CommonParams) => {
      await this.getContractAddress();
      return allowance(this.provider, this.contractAddress!, args);
    },
  };

  public readonly keypair = {
    generateFromEthSignature: (msgParams: any) => {
      return generateFromEthSignature(this.provider, msgParams);
    },
  };

  public readonly utils = {
    getAssetTypeAndId: (args: Asset) => {
      return getAssetTypeAndId(args);
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
