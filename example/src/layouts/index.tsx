import { Outlet } from 'umi';
import 'tdesign-react/es/style/index.css';
import './reset.css';
import './theme.css';
import styles from './index.less';
import AccountHeader from '@/components/account/accountHeader';
import ConnectDialog from '@/components/dialog/connect';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NftProvider } from 'use-nft';
import { getDefaultProvider } from 'ethers';
import { initReddio, reddio } from '@/utils/config';
import { addStarkKey } from '@/utils/store';

const queryClient = new QueryClient();
const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

export default function Layout() {
  const [isFirst, setFirst] = useState(
    !Boolean(window.localStorage.getItem('isFirst')),
  );

  const handleSuccess = useCallback(() => {
    setFirst(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      initReddio();
      const { publicKey } = await reddio.keypair.generateFromEthSignature();
      addStarkKey(publicKey);
    };
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NftProvider fetcher={['ethers', ethersConfig]}>
        <div className={styles.layout}>
          <header>
            <img src={require('@/assets/logo.png')} alt="" height={24} />
          </header>
          <div className={styles.container}>
            {isFirst ? (
              <ConnectDialog onSuccess={handleSuccess} />
            ) : (
              <>
                <div className={styles.contentWrapper}>
                  <AccountHeader />
                  <Outlet />
                </div>
              </>
            )}
          </div>
        </div>
      </NftProvider>
    </QueryClientProvider>
  );
}