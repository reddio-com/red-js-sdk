import { useState } from 'react';
import { Text, Spacer, Button, Loading } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../utils/config';
import { ethers } from 'ethers';

const Process2 = () => {
  const [registerHash, setRegisterHash] = useState(
    '0x3364f0cb41c0c53e81c8b85319acbce69c6dd103c3a0040d682384928e85b6d6'
  );
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const { data } = await reddio.apis.registerToken({
      address: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
      type: 'ERC20M',
    });
    setLoading(false);
    setRegisterHash(data.data.tx_hash);
  };
  const deposit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const assetType = reddio.utils.getAssetType(
      'ERC20',
      '0x60b2d64dd6f00c9cae947587ee97de72fb5a2f4c',
      1
    );
    const tokenId = reddio.utils.getAssetID(
      'ERC20',
      '0x60b2d64dd6f00c9cae947587ee97de72fb5a2f4c',
      1,
      1
    );
    const { data } = await reddio.apis.getVaultID({
      address: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
      tokenId,
    });
    await reddio.apis.depositERC20({
      starkKey: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      assetType,
      vaultId: data.data.vault_id,
      quantizedAmount: 1,
    });
  };
  return (
    <div className={styles.container}>
      <Text h3>1. Create a new ERC20 token</Text>
      <Spacer y={1} />
      <Text>
        Fake token contract address: 0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1
      </Text>
      <Spacer y={1} />
      <Text h3>2. Register the ERC20 token to starkex</Text>
      <Spacer y={1} />
      <Button onClick={register} disabled={loading && !registerHash}>
        {loading && !registerHash ? (
          <Loading color="currentColor" size="sm" />
        ) : null}
        Register
      </Button>
      <Spacer y={1} />
      {registerHash ? <Text>Hash: {registerHash}</Text> : null}
      <Spacer y={1} />
      <Text h3>3. Deposit the ERC20 token to starkex</Text>
      <Spacer y={1} />
      <Button onClick={deposit}>Deposit</Button>
      <Spacer y={1} />
    </div>
  );
};

export default Process2;
