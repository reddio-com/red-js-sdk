import { Button, Spacer, Text } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

const tokenAddress = '0xbe1150a592a9a8810f620ddf3ae73017da137344';

const starkKey =
  '0x6ce5b6485e9e2257d81975cac66f900fcd928a6c69dbcd586f207d0b0caf5cf';

const Process3 = () => {
  const approve = async () => {
    let transaction = await reddio.erc721.approve({
      tokenAddress,
      tokenId: 47,
    });
    await transaction.wait();
  };
  const deposit = async () => {
    const { assetType, assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId: 47,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: starkKey,
      assetId,
    });
    await reddio.apis.depositERC721({
      starkKey,
      assetType,
      vaultId: data.data.vault_ids[0],
      tokenId: 47,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId: 47,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
    });
  };
  const withdraw = async () => {
    const { assetId, assetType } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId: 47,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey:
        'd4447b09a57d9441d1ff5f080318a1859e6d4bba82fe5fd32adbac825eac7e',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
      contractAddress: tokenAddress,
    });
    await reddio.apis.withdrawalFromL1({
      starkKey,
      assetType,
      tokenId: 47,
      type: 'ERC721',
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>该流程需要使用正确的 TokenId</Text>
        <Text h3>1. Create a new ERC721 token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          {tokenAddress}
        </Text>
        <Spacer y={1} />
        <Text h3>3. Deposit the ERC721 token to starkex</Text>
        <Spacer y={1} />
        <Button onClick={approve}>Approve</Button>
        <Spacer y={1} />
        <Button onClick={deposit}>Deposit</Button>
        <Spacer y={1} />
        <Text h3>
          4. Transfer the ERC721 token between two starkex accounts
        </Text>
        <Spacer y={1} />
        <Button onClick={transfer}>Transfer</Button>
        <Spacer y={1} />
        <Text h3>5. Withdraw the ERC721 from L2</Text>
        <Spacer y={1} />
        <Button onClick={withdraw}>Withdraw</Button>
      </div>
    </Layout>
  );
};

export default Process3;
