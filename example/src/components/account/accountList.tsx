import { Button, Divider, message, Space } from 'tdesign-react';
import {
  ChevronRightIcon,
  GiftIcon,
  LogoutIcon,
  SwapIcon,
  LoginIcon,
} from 'tdesign-icons-react';
import Text from '../typography';
import Back from '../back';
import styles from './index.less';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { initProviderAndSigner, getContractBalance } from '@/utils/util';
import { getErc721Balance } from '@/utils/listERC721';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { history } from 'umi';
import { useSnapshot } from 'valtio';
import { store } from '@/utils/store';
import { reddio } from '@/utils/config';
import Operate from '@/components/dialog/operate';
import { ERC20Address, ERC721Address } from '@/utils/common';

const items = ['GoerliETH', 'ERC20', 'ERC721'];

const AccountList = () => {
  const snap = useSnapshot(store);
  const [l1Balance, setL1Balance] = useState<Record<string, any>>({
    GoerliETH: '',
    ERC20: '',
    ERC721: '',
    tokenIds: [],
  });
  const [l2Balance, setL2Balance] = useState<Record<string, any>>({
    GoerliETH: '',
    ERC20: '',
    ERC721: '',
  });
  const [address, setAddress] = useState('');
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    type: '',
  });
  const [loading, setLoading] = useState({
    l1: true,
    l2: true,
    testAsset: false,
  });

  const testAssetQuery = useQuery(
    ['testAsset', address],
    () => {
      return axios.post('https://faucet.reddio.com/api/v1/mint', {
        new_contract: false,
        to: address,
      });
    },
    {
      enabled: false,
    },
  );
  const getBalancesQuery = useQuery(
    ['getBalances', snap.starkKey],
    () => {
      return reddio.apis.getBalances({
        starkKey: snap.starkKey,
      });
    },
    {
      onSuccess: ({ data }) => {
        if (data.data.length) {
          const ethBalance = data.data.find((item) => item.type === 'ETH');
          const erc20Balance = data.data.find(
            (item) => item.contract_address === ERC20Address.toLowerCase(),
          );
          const erc721Balance = data.data.filter(
            (item) =>
              item.contract_address === ERC721Address.toLowerCase() &&
              item.balance_available,
          );
          setL2Balance({
            GoerliETH: ethBalance?.display_value || '',
            ERC20: erc20Balance?.display_value || '',
            ERC721: erc721Balance.length,
            tokenIds: erc721Balance,
          });
          setLoading((v) => ({
            ...v,
            l2: false,
          }));
        }
      },
    },
  );

  useEffect(() => {
    getL1Balances();
    const timer = setInterval(() => {
      getL1Balances();
      getBalancesQuery.refetch();
    }, 1000 * 60);
    return () => {
      timer && window.clearInterval(timer);
    };
  }, []);

  const getL1Balances = useCallback(async () => {
    try {
      const { signer } = await initProviderAndSigner();
      const address = await signer.getAddress();
      setAddress(address);
      const [eth, erc20, erc721] = await Promise.all([
        getL1Eth(address),
        getErc20Balance(),
        getErc721Balance(ERC721Address),
      ]);
      setL1Balance({
        GoerliETH: eth,
        ERC20: erc20,
        ERC721: erc721.length,
        tokenIds: erc721,
      });
      setLoading((v) => ({
        ...v,
        l1: false,
      }));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getL1Eth = useCallback(async (address: string) => {
    const { provider } = await initProviderAndSigner();
    const balance = await provider.getBalance(address);
    return Number(ethers.utils.formatEther(balance)).toFixed(4);
  }, []);

  const getErc20Balance = useCallback(async () => {
    return getContractBalance(ERC20Address);
  }, []);

  const handleGetTestAsset = useCallback(async () => {
    setLoading((v) => ({
      ...v,
      testAsset: true,
    }));
    await testAssetQuery.refetch();
    await message.success('The test asset was acquired');
    getL1Balances();
    setLoading((v) => ({
      ...v,
      testAsset: false,
    }));
  }, []);

  const handleClick = useCallback((networkType: string, assetType: string) => {
    assetType === 'ERC721' &&
      history.push(`/account/erc721?type=${networkType}`);
  }, []);

  const handleOperate = useCallback((type: string, isClose = false) => {
    if (isClose) {
      setDialogInfo({
        type: '',
        show: false,
      });
      getL1Balances();
      getBalancesQuery.refetch();
    } else {
      setDialogInfo({
        type,
        show: true,
      });
    }
  }, []);

  return (
    <div className={styles.accountListWrapper}>
      {dialogInfo.show ? (
        <Operate
          type={dialogInfo.type}
          ethAddress={address}
          l1Balance={l1Balance}
          l2Balance={l2Balance}
          onClose={() => handleOperate('', true)}
        />
      ) : null}
      <Back>Account</Back>
      <Divider style={{ margin: 0 }} />
      <div className={styles.accountListContent}>
        <div>
          <Text type="bold">L1</Text>
          <div className={styles.listWrapper}>
            {items.map((item) => {
              return (
                <div
                  className={styles.listItem}
                  key={`l1-${item}`}
                  onClick={() => handleClick('l1', item)}
                >
                  <Text color="#2C2C2C">
                    {l1Balance[item]} {item}
                  </Text>
                  {item === 'ERC721' ? <ChevronRightIcon /> : null}
                </div>
              );
            })}
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              theme="default"
              shape="round"
              loading={loading.testAsset}
              icon={<GiftIcon />}
              onClick={handleGetTestAsset}
            >
              Get test assets
            </Button>
          </div>
        </div>
        <div>
          <Text type="bold">L2</Text>
          <div className={styles.listWrapper}>
            {items.map((item) => {
              return (
                <div
                  className={styles.listItem}
                  key={`l2-${item}`}
                  onClick={() => handleClick('l2', item)}
                >
                  <Text color="#2C2C2C">
                    {l2Balance[item]} {item}
                  </Text>
                  {item === 'ERC721' ? <ChevronRightIcon /> : null}
                </div>
              );
            })}
          </div>
          <Space className={styles.buttonWrapper}>
            <Button
              shape="round"
              icon={<LoginIcon />}
              disabled={loading.l1}
              onClick={() => handleOperate('Deposit')}
            >
              Deposit
            </Button>
            <Button
              shape="round"
              icon={<SwapIcon />}
              disabled={loading.l2}
              onClick={() => handleOperate('Transfer')}
            >
              Transfer
            </Button>
            <Button
              shape="round"
              disabled={loading.l2}
              icon={<LogoutIcon />}
              onClick={() => handleOperate('Withdrawal')}
            >
              Withdrawal
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
