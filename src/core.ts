import axios, { AxiosInstance } from 'axios';
import config from './config';

interface ReddioCoreOptions {
  env?: 'test';
}

class ReddioCore {
  readonly coreOptions: ReddioCoreOptions;
  readonly request: AxiosInstance;

  constructor(options: ReddioCoreOptions) {
    this.coreOptions = options;
    this.request = axios.create({
      baseURL: config.baseUrl[options.env || 'test'],
    });
  }

  create() {}
}

const reddio = new ReddioCore({});

export default reddio;
