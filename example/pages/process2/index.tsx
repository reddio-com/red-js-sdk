import { Text, Spacer, Button } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

const contractAddress = '0x66Cd45449B36f1102FD368Aad9223fcAE30E4dB5';

const starkKey =
  '0x6ce5b6485e9e2257d81975cac66f900fcd928a6c69dbcd586f207d0b0caf5cf';

const Process2 = () => {
  const deposit = async () => {
    await reddio.erc20.approve({
      tokenAddress: contractAddress,
      amount: 30,
    });
    const { assetId, assetType } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress: contractAddress,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: starkKey,
      assetId,
    });
    await reddio.apis.depositERC20({
      starkKey,
      assetType,
      vaultId: data.data.vault_ids[0],
      quantizedAmount: 2,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress: contractAddress,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey:
        'd4447b09a57d9441d1ff5f080318a1859e6d4bba82fe5fd32adbac825eac7e',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
    });
  };
  const withdraw = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC20',
      tokenAddress: contractAddress,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey:
        'd4447b09a57d9441d1ff5f080318a1859e6d4bba82fe5fd32adbac825eac7e',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
      contractAddress,
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>1. Create a new ERC20 token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          {contractAddress}
        </Text>
        <Spacer y={1} />
        <Text h3>3. Deposit the ERC20 token to starkex</Text>
        <Spacer y={1} />
        <Button onClick={deposit}>Deposit</Button>
        <Spacer y={1} />
        <Text h3>4. Transfer the ERC20 token between two starkex accounts</Text>
        <Spacer y={1} />
        <Button onClick={transfer}>Transfer</Button>
        <Spacer y={1} />
        <Text h3>5. Withdraw the ERC20 from L2</Text>
        <Spacer y={1} />
        <Button onClick={withdraw}>Withdraw</Button>
      </div>
    </Layout>
  );
};

export default Process2;
