// @ts-ignore
import { mock } from '@depay/web3-mock';
import reddio from '../src/core';

mock('ethereum');
reddio.create({
  // @ts-ignore
  provider: window.ethereum,
});
