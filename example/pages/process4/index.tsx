import { useState } from 'react';
import { Button, Spacer, Text } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

const tokenAddress = '0xdcedbaa0b6cb4cd75401748c4f7a634a451118ad';

const starkKey =
  '0x7d459f9c3ff9fda3073a4f793f809e1edcb6e4ef27a9a385f7e2b414d5d8e41';

const Process4 = () => {
  const [tokenId, setTokenId] = useState<number>();
  const mint = async () => {
    const { data } = await reddio.apis.mintOne({
      contract_address: tokenAddress,
      starkKey,
    });
    setTokenId(data.data.token_id);
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      contract_address: tokenAddress,
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
      type: 'ERC721',
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
      expirationTimestamp: 4194303,
    });
  };
  const withdraw = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      contract_address: tokenAddress,
      starkKeys: [starkKey, '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
      type: 'ERC721',
    });
    await reddio.apis.withdrawFromL2({
      starkKey,
      privateKey:
        '26b3a29d2fee24b566a74bd6b3dbabdcb371c7f0bf83708ad840af66de91353',
      assetId,
      amount: 1,
      vaultId: data.data.vault_ids[0],
      receiver: '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC',
      receiverVaultId: data.data.vault_ids[1],
      expirationTimestamp: 4194303,
      contract_address: tokenAddress,
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Text h3>该流程需要使用正确的 TokenId</Text>
        <Text h3>1. Create a new ERC721M token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          {tokenAddress}
        </Text>
        <Spacer y={1} />
        <Text h3>2. Mint the ERC721 token on starkex</Text>
        <Spacer y={1} />
        <Button onClick={mint}>Mint</Button>
        <Spacer y={1} />
        <Text h3>
          3. Transfer the ERC721 token between two starkex accounts
        </Text>
        <Spacer y={1} />
        <Button onClick={transfer}>Transfer</Button>
        <Spacer y={1} />
        <Text h3>4. Withdraw the ERC721 from L2</Text>
        <Spacer y={1} />
        <Button onClick={withdraw}>Withdraw</Button>
      </div>
    </Layout>
  );
};

export default Process4;
