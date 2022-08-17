import { Text, Spacer, Button, Row, Card, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { reddio } from '../../utils/config';
import Layout from '../../components/layout';
import gen from '../../utils/gen';
import { ethers } from 'ethers';

let starkKey = '';
let privateKey = '';

const getKey = async () => {
  if (!starkKey) {
    await gen();
    starkKey = window.publicKey;
    privateKey = window.privateKey;
  }
};

const Process1 = () => {
  const [balance, setBalance] = useState('0');
  const [depositAmount, setDepositAmount] = useState(0.001);
  const [transferAmount, setTransferAmount] = useState(0.0001);
  const [transferAddress, setTransferAddress] = useState(
    '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'
  );
  const [transferId, setTransferId] = useState<number | null>(null);
  const [transferStatus, setTransferStatus] = useState<number | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0.0001);
  const [withdrawalAddress, setWithdrawalAddress] = useState(
    '0xC664B68aFceD392656Ed8c4adaEFa8E8ffBF65DC'
  );
  const [withdrawalId, setWithdrawalId] = useState<number | null>(null);

  useEffect(() => {
    getKey();
  }, []);

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
      quantizedAmount: depositAmount,
    });
  };

  const getBalance = async () => {
    const { data } = await reddio.apis.getBalances({
      starkKey,
    });
    const item = data.data.find(item => item.type === 'ETH');
    item && setBalance(item.display_value);
  };

  const transfer = async () => {
    const { assetId } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, transferAddress],
      assetId,
    });
    const { data: res } = await reddio.apis.transfer({
      starkKey,
      privateKey: window.privateKey,
      assetId,
      amount: transferAmount,
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
      type: 'ETH',
    });
    const { data } = await reddio.apis.getVaultID({
      starkKeys: [starkKey, withdrawalAddress],
      assetId,
    });
    const { data: res } = await reddio.apis.withdrawalFromL2({
      starkKey,
      privateKey,
      assetId,
      amount: withdrawalAmount,
      vaultId: data.data.vault_ids[0],
      receiver: withdrawalAddress,
      receiverVaultId: data.data.vault_ids[1],
    });
    setWithdrawalId(res.data.sequence_id);
  };

  const withdrawfromL1 = async () => {
    const { assetType } = await reddio.utils.getAssetTypeAndId({
      type: 'ETH',
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const ethAddress = await signer.getAddress();
    await reddio.apis.withdrawalFromL1({
      ethAddress,
      assetType,
      type: 'ETH',
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Row css={{ flexDirection: 'column', width: 600 }}>
          <Spacer y={2} />
          <Text h1>Process 1</Text>
          <Spacer y={2} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>1. Deposit the ETH to starkex</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="Amount"
                aria-label="Amount"
                value={depositAmount}
                onChange={e => setDepositAmount(Number(e.target.value))}
              ></Input>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={deposit}>
                Deposit
              </Button>
              <Spacer y={1} />
              <Text>ETH：{balance}</Text>
              <Spacer y={1} />
              <Button css={{ width: 80 }} onClick={getBalance}>
                Get Balance
              </Button>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>2. Transfer ETH between two starkex accounts</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="Amount"
                aria-label="Amount"
                value={transferAmount}
                onChange={e => setTransferAmount(Number(e.target.value))}
              ></Input>
              <Spacer y={1} />
              <Input
                label="To"
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
          <Spacer y={1} />
          <Card variant="bordered">
            <Card.Header css={{ boxSizing: 'border-box' }}>
              <Text h3>3. Withdraw the ETH from L2</Text>
            </Card.Header>
            <Card.Body css={{ boxSizing: 'border-box' }}>
              <Input
                label="Amount"
                aria-label="Amount"
                value={withdrawalAmount}
                onChange={e => setWithdrawalAmount(Number(e.target.value))}
              ></Input>
              <Spacer y={1} />
              <Input
                label="To"
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

export default Process1;
