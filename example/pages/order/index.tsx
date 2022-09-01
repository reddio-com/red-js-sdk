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
import getErc721Balance from '../../utils/list';
import { BalanceResponse } from '@reddio.com/js';

let starkKey = '';
let privateKey = '';

const Process3 = () => {
  const [contractAddress, setContractAddress] = useState(
    '0xA21B04B6dbd1174155E242434B3Df2EeD74BaFb2'
  );
  const [tokenId, setTokenId] = useState(-1);
  const [starkTokenId, setStarkTokenId] = useState(-1);
  const [ids, setIds] = useState<number[]>([]);
  const [balance, setBalance] = useState<BalanceResponse[]>([]);
  const [sellPrice, setSellPrice] = useState('0.001');
  const [sellSequenceId, setSellSequenceId] = useState(-1);
  const [sellStatus, setSellStatus] = useState<number | null>(null);

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
    const balance = data.data.filter(
      item =>
        item.contract_address === contractAddress.toLowerCase() &&
        item.balance_available
    );
    balance && setBalance(balance);
  };

  const sell = async () => {
    if (starkTokenId === -1) {
      alert('choose starkex tokenId');
      return;
    }
    const params = await reddio.utils.getOrderParams({
      keypair: {
        privateKey,
        publicKey: starkKey,
      },
      amount: '1',
      tokenAddress: contractAddress,
      tokenId: starkTokenId,
      orderType: 'sell',
      tokenType: 'ERC721',
      price: sellPrice,
    });
    const { data } = await reddio.apis.order(params);
    setSellSequenceId(data.data.sequence_id);
  };

  const buy = async () => {
    if (starkTokenId === -1) {
      alert('choose starkex tokenId');
      return;
    }
    const params = await reddio.utils.getOrderParams({
      keypair: {
        privateKey:
          '28608afd7ec65c262f5c45a00ec63b4ee2dd9fa3c7cea5d755696056aed4f02',
        publicKey:
          '0x3d2161b60487fb223760e586efaf70004ddc018b53b8cdb39cb75ef4b4e25f7',
      },
      amount: '1',
      tokenAddress: contractAddress,
      tokenId: starkTokenId,
      orderType: 'buy',
      tokenType: 'ERC721',
      price: sellPrice,
    });
    const { data } = await reddio.apis.order(params);
    setSellSequenceId(data.data.sequence_id);
  };

  const getRecord = async () => {
    if (sellSequenceId === -1) return;
    const { data } = await reddio.apis.getRecord({
      starkKey,
      sequenceId: sellSequenceId,
    });
    setSellStatus(data.data.status);
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
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>3. Sell and buy token</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Row align="center">
                <Text>Starkex ERC721 balance:</Text>
                <Spacer x={1} />
                <Dropdown disableAnimation>
                  <Dropdown.Button flat>
                    {starkTokenId > -1 ? starkTokenId : 'Choose'}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    css={{ maxHeight: 200 }}
                    onAction={key => setStarkTokenId(Number(key))}
                  >
                    {balance.map(item => (
                      <Dropdown.Item key={item.token_id}>
                        {item.token_id}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={getBalance}>
                Get Balance
              </Button>
              <Spacer y={1} />
              <Input
                label="Price"
                aria-label="Price"
                value={sellPrice}
                onChange={e => setSellPrice(e.target.value)}
              ></Input>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={sell}>
                Sell
              </Button>
              <Spacer y={1} />
              <Text>
                Sell Status：
                {sellStatus === 1
                  ? 'Success'
                  : sellStatus === 0
                  ? 'Wait Sell'
                  : !sellStatus
                  ? ''
                  : 'Failed'}
              </Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={getRecord}>
                Get Sell Status
              </Button>
              <Spacer y={1} />
              <Text>
                Account of buy:
                0x3d2161b60487fb223760e586efaf70004ddc018b53b8cdb39cb75ef4b4e25f7{' '}
              </Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={buy}>
                Buy
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Layout>
  );
};

export default Process3;
