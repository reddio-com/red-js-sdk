import {
  Button,
  Spacer,
  Text,
  Input,
  Row,
  Card,
  Dropdown,
} from '@nextui-org/react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import gen from '../../utils/gen';
import { ethers } from 'ethers';
import getErc721Balance from '../../utils/list';

let starkKey = '';
let privateKey = '';

const Process3 = () => {
  const [contractAddress, setContractAddress] = useState(
    '0xA21B04B6dbd1174155E242434B3Df2EeD74BaFb2'
  );
  const [tokenId, setTokenId] = useState(-1);
  const [ids, setIds] = useState<number[]>([]);
  const [balance, setBalance] = useState('0');
  const [transferAddress, setTransferAddress] = useState(
    '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'
  );
  const [transferId, setTransferId] = useState<number | null>(null);
  const [transferStatus, setTransferStatus] = useState<number | null>(null);
  const [withdrawalAddress, setWithdrawalAddress] = useState(
    '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'
  );
  const [withdrawalId, setWithdrawalId] = useState<number | null>(null);

  useEffect(() => {
    getKey();
  }, []);

  const getKey = async () => {
    if (!starkKey) {
      await gen();
      starkKey = window.publicKey;
      privateKey = window.privateKey;
    }
  };

  useEffect(() => {
    getErc721Ids();
  }, [contractAddress]);

  const getErc721Ids = async () => {
    const list = await getErc721Balance(contractAddress);
    setIds(list);
  };

  const approve = async () => {
    let transaction = await reddio.erc721.approve({
      tokenAddress: contractAddress,
      tokenId,
    });
    await transaction.wait();
  };

  const deposit = async () => {
    const { assetType, assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress: contractAddress,
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

  const getBalance = async () => {
    const { data } = await reddio.apis.getBalances({
      starkKey,
    });
    const item = data.data.find(item => item.type === 'ERC721');
    item && setBalance(item.display_value);
  };

  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress: contractAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, transferAddress],
      assetId,
    });
    const { data: res } = await reddio.apis.transfer({
      starkKey,
      privateKey,
      assetId,
      vaultId: data.data.vault_ids[0],
      receiver: transferAddress,
      receiverVaultId: data.data.vault_ids[1],
    });
    setTransferId(res.data.sequence_id);
  };

  const getRecord = async () => {
    const { data } = await reddio.apis.getRecord({
      starkKey: starkKey,
      sequenceId: transferId!,
    });
    setTransferStatus(data.data.status);
    if (data.data.status === 1) getBalance();
  };

  const withdraw = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress: contractAddress,
      tokenId,
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, withdrawalAddress],
      assetId,
    });
    const { data: res } = await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey: window.privateKey,
      assetId,
      vaultId: data.data.vault_ids[0],
      receiver: withdrawalAddress,
      receiverVaultId: data.data.vault_ids[1],
      contractAddress,
      tokenId: tokenId.toString(),
    });
    setWithdrawalId(res.data.sequence_id);
  };

  const withdrawfromL1 = async () => {
    const { assetType } = await reddio.utils.getAssetTypeAndId({
      type: 'ERC721',
      tokenAddress: contractAddress,
      tokenId,
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const ethAddress = await signer.getAddress();
    await reddio.apis.withdrawalFromL1({
      ethAddress,
      assetType,
      type: 'ERC721',
      tokenId,
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Row css={{ flexDirection: 'column', width: 600 }}>
          <Spacer y={2} />
          <Text h1>Process 3</Text>
          <Spacer y={2} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>1. Create a new ERC721 token</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="Contract Address"
                aria-label="Contract Address"
                value={contractAddress}
                onChange={e => setContractAddress(e.target.value)}
              ></Input>
              <Spacer y={1} />
              <Row align="center">
                <Text>ERC721 tokenId:</Text>
                <Spacer x={1} />
                <Dropdown disableAnimation>
                  <Dropdown.Button flat>
                    {tokenId > -1 ? tokenId : 'Choose'}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    css={{ maxHeight: 200 }}
                    onAction={key => setTokenId(Number(key))}
                  >
                    {ids.map(item => (
                      <Dropdown.Item key={item}>{item}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>2. Deposit the ERC721 token to starkex</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Button css={{ width: 80 }} onClick={approve}>
                Approve Token
              </Button>
              <Spacer y={1} />
              <Text h3>Wait a moment for approve</Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={deposit}>
                Deposit
              </Button>
              <Spacer y={1} />
              <Text>Starkex ERC721 Token Balance：{balance}</Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={getBalance}>
                Get Balance
              </Button>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>
                3. Transfer the ERC721 token between two starkex accounts
              </Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="To Stark Address"
                aria-label="To"
                value={transferAddress}
                onChange={e => setTransferAddress(e.target.value)}
              ></Input>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={transfer}>
                Transfer
              </Button>
              <Spacer y={1} />
              <Text>
                Status：
                {transferStatus === 1
                  ? 'Success'
                  : transferStatus === 0
                  ? 'Pending'
                  : !transferStatus
                  ? ''
                  : 'Failed'}
              </Text>
              <Spacer y={1} />
              <Button
                css={{ width: 80 }}
                onClick={getRecord}
                disabled={!transferId}
              >
                Get Record
              </Button>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>4. Withdraw the ERC721 from L2</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="To Stark Address"
                aria-label="To"
                value={withdrawalAddress}
                onChange={e => setWithdrawalAddress(e.target.value)}
              ></Input>
              <Spacer y={1} />
              <Button onClick={withdraw}>
                Funds Move to the Withdrawal Area
              </Button>
              <Spacer y={1} />
              <Text>Withdrawal Id：{withdrawalId}</Text>
              <Spacer y={1} />
              <Text h3>
                Wait approximately 4 hours for funds move to the withdrawal area
              </Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={withdrawfromL1}>
                Withdraw
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Layout>
  );
};

export default Process3;
