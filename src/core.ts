import axios, { AxiosInstance } from 'axios';
import config from './config';
import { ethers } from 'ethers';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';

interface ReddioCoreOptions {
  env?: 'test';
  provider: ExternalProvider | JsonRpcFetchFunc;
  network?: string;
}

class ReddioCore {
  request!: AxiosInstance;
  provider!: Web3Provider;

  constructor() {}

  create(options: ReddioCoreOptions) {
    this.request = axios.create({
      baseURL: config.baseUrl[options.env || 'test'],
    });
    this.provider = new ethers.providers.Web3Provider(options.provider);
  }
}

const reddio = new ReddioCore();

export default reddio;
