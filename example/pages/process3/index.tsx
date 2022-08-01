import { Button, Spacer, Text, Input, Row } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';
import { useState } from 'react';

const tokenAddress = '0xbe1150a592a9a8810f620ddf3ae73017da137344';

let starkKey = '';
if (typeof window !== 'undefined' && window.publicKey) {
  starkKey = window.publicKey;
}

const Process3 = () => {
  const [tokenId, setTokenId] = useState(47);
  const approve = async () => {
    let transaction = await reddio.erc721.approve({
      tokenAddress,
      tokenId,
    });
    await transaction.wait();
  };
  const deposit = async () => {
    const { assetType, assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: starkKey,
      assetId,
    });
    await reddio.apis.depositERC721({
      starkKey,
      assetType,
      vaultId: data.data.vault_ids[0],
      tokenId,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.transfer({
      starkKey,
      privateKey: window.privateKey,
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
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, '0xC664B68aFceD502656Ed8c4adaEFa8E8ffBF65DC'],
      assetId,
    });
    await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey: window.privateKey,
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
      tokenId,
      type: 'ERC721',
    });
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Row align="center" justify="center">
          <Text h3 css={{ marginRight: 10 }}>
            请输入正确的 TokenId
          </Text>
          <Input
            value={tokenId}
            onChange={e => {
              setTokenId(Number(e.target.value));
            }}
          />
        </Row>
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
