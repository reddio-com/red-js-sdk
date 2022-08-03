import { reddio } from './config';

const gen = async () => {
  const res = await reddio.keypair.generateFromEthSignature('Sign');
  window.publicKey = res.publicKey;
  window.privateKey = res.privateKey;
  return res;
};

export default gen;
