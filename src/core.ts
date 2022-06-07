import axios, { AxiosInstance } from 'axios';
import config from './config';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  getVaultID,
  getNonce,
  transfer,
  withdraw,
  mintERC20,
  registerToken,
} from './api';
import {
  MintParams,
  NonceParams,
  RegisterParams,
  TransferParams,
  VaultParams,
  WithdrawParams,
} from './types/api';

interface ReddioCoreOptions {
  env?: 'test';
  provider: JsonRpcProvider;
  network?: string;
}

class ReddioCore {
  protected request: AxiosInstance;
  protected provider: JsonRpcProvider;

  constructor(options: ReddioCoreOptions) {
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
  };
}

export default ReddioCore;
