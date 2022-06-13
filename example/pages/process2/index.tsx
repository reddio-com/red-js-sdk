import { useState } from 'react';
import { Text, Spacer, Button, Loading } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../utils/config';
import Layout from '../../components/layout';

const tokenAddress = '0x4240e8b8c0b6e6464a13f555f6395bbfe1c4bdf1';

const starkKey =
  '0x514c761d08a8a8100fcc0a3d1364ede9bef6337927dd5f81e2786ff8302b767';

const Process2 = () => {
  const [registerHash, setRegisterHash] = useState(
    '0x3364f0cb41c0c53e81c8b85319acbce69c6dd103c3a0040d682384928e85b6d6'
  );
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const { data } = await reddio.apis.registerToken({
      address: tokenAddress,
      type: 'ERC20',
    });
    setLoading(false);
    setRegisterHash(data.data.tx_hash);
  };
  const deposit = async () => {
    await reddio.erc20.approve({
      tokenAddress,
      amount: 30,
    });
    const { assetType, assetId } = reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress,
      quantum: 1,
    });
    const { data } = await reddio.apis.getVaultID({
      address: tokenAddress,
      starkKey,
      assetId,
    });
    await reddio.apis.depositERC20({
      starkKey,
      assetType,
      vaultId: data.data.vault_id,
      quantizedAmount: 1,
    });
  };
  const transfer = async () => {
    const { assetId } = reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress,
      quantum: 1,
    });
    const { data } = await reddio.apis.getVaultID({
      address: tokenAddress,
      starkKey,
      assetId,
    });
    const { data: receiverData } = await reddio.apis.getVaultID({
      address: tokenAddress,
      starkKey: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      assetId,
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 1,
      vaultId: data.data.vault_id,
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: receiverData.data.vault_id,
      expirationTimestamp: 4194303,
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>1. Create a new ERC20 token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          {tokenAddress}
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
        <Button onClick={transfer}>Transfer</Button>
        <Spacer y={1} />
      </div>
    </Layout>
  );
};

export default Process2;
