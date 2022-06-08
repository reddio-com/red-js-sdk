import axios, { AxiosInstance } from 'axios';
import config from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  depositERC20,
  getVaultID,
  getNonce,
  transfer,
  withdraw,
  mintERC20,
  registerToken,
  getContractAddress,
} from './api';
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
import { Env } from "./utils/enum";

interface ReddioCoreOptions {
  env?: `${Env}`;
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
    this.request = axios.create({
      baseURL: config.baseUrl[options.env || 'test'],
    });
    this.provider = options.provider;
  }

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
  };

  public readonly keypair = {
    generateFromEthSignature: (msgParams: any) => {
      return generateFromEthSignature(this.provider, msgParams);
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
