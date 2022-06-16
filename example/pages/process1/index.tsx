import { useState } from 'react';
import { Text, Spacer, Button, Loading } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

const tokenAddress = '0x66Cd45449B36f1102FD368Aad9223fcAE30E4dB5';

const starkKey =
  '0x7d459f9c3ff9fda3073a4f793f809e1edcb6e4ef27a9a385f7e2b414d5d8e41';

const Process1 = () => {
  const [registerHash, setRegisterHash] = useState('');
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const { data } = await reddio.apis.registerToken({
      type: 'ETH',
    });
    setLoading(false);
    setRegisterHash(data.data.tx_hash);
  };
  const deposit = async () => {
    const { assetType } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKey,
      type: 'ETH',
    });
    await reddio.apis.depositETH({
      starkKey,
      assetType,
      vaultId: data.data.vault_id,
      quantizedAmount: 0.01,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKey,
      type: 'ETH',
    });
    const { data: receiverData } = await reddio.apis.getVaultID({
      starkKey: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      type: 'ETH',
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 0.01,
      vaultId: data.data.vault_id,
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: receiverData.data.vault_id,
      expirationTimestamp: 4194303,
    });
  };
  const withdraw = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress,
    });
    const { data } = await reddio.apis.getVaultID({
      address: tokenAddress,
      starkKey,
      assetId,
      type: 'ERC20',
    });
    const { data: receiverData } = await reddio.apis.getVaultID({
      address: tokenAddress,
      starkKey: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      assetId,
      type: 'ERC20',
    });
    await reddio.apis.withdraw({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 1,
      vaultId: data.data.vault_id,
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: receiverData.data.vault_id,
      expirationTimestamp: 4194303,
      address: tokenAddress,
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>1. Register the ETH to starkex</Text>
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
        <Text h3>2. Deposit the ETH to starkex</Text>
        <Spacer y={1} />
        <Button onClick={deposit}>Deposit 0.1 ETH</Button>
        <Spacer y={1} />
        <Text h3>3. Transfer ETH between two starkex accounts</Text>
        <Spacer y={1} />
        <Button onClick={transfer}>Transfer</Button>
        <Spacer y={1} />
        <Text h3>4. Withdraw the ETH from L2</Text>
        <Spacer y={1} />
        <Button onClick={withdraw}>Withdraw</Button>
      </div>
    </Layout>
  );
};

export default Process1;
