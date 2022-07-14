import { useState } from 'react';
import { Button, Loading, Spacer, Text } from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';

const tokenAddress = '0xbe1150a592a9a8810f620ddf3ae73017da137344';

const starkKey =
  '0x7d459f9c3ff9fda3073a4f793f809e1edcb6e4ef27a9a385f7e2b414d5d8e41';

const Process3 = () => {
  const [registerHash, setRegisterHash] = useState('');
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setLoading(true);
    const { data } = await reddio.apis.registerToken({
      contract_address: tokenAddress,
      type: 'ERC721',
    });
    setLoading(false);
    setRegisterHash(data.data.tx_hash);
  };
  const approve = async () => {
    let transaction = await reddio.erc721.approve({
      tokenAddress,
      tokenId: 40,
    });
    await transaction.wait();
    console.log(transaction);
  };
  const deposit = async () => {
    const { assetType, assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId: 39,
    });
    const { data } = await reddio.apis.getVaultID({
      contract_address: tokenAddress,
      starkKeys: starkKey,
      assetId,
      type: 'ERC721',
    });
    await reddio.apis.depositERC721({
      starkKey,
      assetType,
      vaultId: data.data.vault_ids.toString(),
      quantizedAmount: 1,
    });
  };
  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress,
      tokenId: 39,
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
      tokenId: 39,
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
        <Text h3>1. Create a new ERC721 token</Text>
        <Spacer y={1} />
        <Text>
          Fake token contract address:
          {tokenAddress}
        </Text>
        <Spacer y={1} />
        <Text h3>2. Register the ERC721 token to starkex</Text>
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
