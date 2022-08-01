import { Text, Spacer, Button } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

let starkKey = '';
if (typeof window !== 'undefined' && window.publicKey) {
  starkKey = window.publicKey;
}

const Process1 = () => {
  const deposit = async () => {
    const { assetType, assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: starkKey,
      assetId,
    });
    await reddio.apis.depositETH({
      starkKey,
      assetType,
      vaultId: data.data.vault_ids.toString(),
      quantizedAmount: 0.001,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey: window.privateKey,
      assetId,
      amount: 0.0001,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
    });
  };
  const withdraw = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey: window.privateKey,
      assetId,
      amount: 0.0001,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>2. Deposit the ETH to starkex</Text>
        <Spacer y={1} />
        <Button onClick={deposit}>Deposit 0.001 ETH</Button>
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
