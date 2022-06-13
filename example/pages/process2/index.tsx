import { useState } from 'react';
import { Text, Spacer, Button, Loading } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../utils/config';
import Layout from '../../components/layout';

const Process2 = () => {
  const [registerHash, setRegisterHash] = useState(
    '0x3364f0cb41c0c53e81c8b85319acbce69c6dd103c3a0040d682384928e85b6d6'
  );
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const { data } = await reddio.apis.registerToken({
      address: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
      type: 'ERC20',
    });
    setLoading(false);
    setRegisterHash(data.data.tx_hash);
  };
  const deposit = async () => {
    await reddio.erc20.approve({
      tokenAddress: '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1',
      amount: 30,
    });
    const { assetType, assetId } = reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      quantum: 1,
    });
    const { data } = await reddio.apis.getVaultID({
      address: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
      assetId,
    });
    await reddio.apis.depositERC20({
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
      assetType,
      vaultId: data.data.vault_id,
      quantizedAmount: 1,
    });
  };
  const transfer = async () => {
    const { assetId } = reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress: '0x4240e8b8c0b6E6464a13F555F6395BbfE1c4bdf1',
      quantum: 1,
    });
    await reddio.apis.transfer({
      starkKey:
        '0x761f1709a72a7e1d9a503faf2a1067686f315acdc825a804e1281fbd39accda',
      assetId,
      amount: 1,
      receiver: '',
      receiverVaultId: '',
      expirationTimestamp: 1,
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>1. Create a new ERC20 token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1
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
        <Text h3>4. Transfer the ERC20 token between two starkex accounts</Text>
        <Spacer y={1} />
        <Button onClick={transfer}>Deposit</Button>
        <Spacer y={1} />
      </div>
    </Layout>
  );
};

export default Process2;
