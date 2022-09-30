import { Row } from 'tdesign-react';
import styles from './index.less';
import Back from '@/components/back';
import { useEffect, useState } from 'react';
import { getErc721Balance } from '@/utils/listERC721';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { reddio } from '@/utils/config';
import { useSnapshot } from 'valtio';
import { store } from '@/utils/store';
import { ERC721Address } from '@/utils/common';
import NFT from '@/components/nft/nft';
import axios from 'axios';

const NFTList = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const snap = useSnapshot(store);
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const getL1ERC721Query = useQuery(
    ['getErc721Balance'],
    () => {
      return getErc721Balance(ERC721Address);
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setTokenIds(data);
      },
    },
  );

  const getL2BalancesQuery = useQuery(
    ['getBalances', snap.starkKey],
    () => {
      return reddio.apis.getBalances({
        starkKey: snap.starkKey,
        contractAddress: ERC721Address,
      });
    },
    {
      enabled: false,
      onSuccess: async ({ data }) => {
        const ids = data.data
          .filter((item) => item.balance_available)
          .map((item) => item.token_id);
        if (!ids.length) return;
        setTokenIds(ids);
        const { data: urls } = await axios.get(
          `https://metadata.reddio.com/metadata?token_ids=${ids.join(
            ',',
          )}&contract_address=${ERC721Address}`,
        );
        setUrls(urls.data.map((item: any) => item.image));
      },
    },
  );

  useEffect(() => {
    if (type === 'l2') {
      getL2BalancesQuery.refetch();
    } else {
      getL1ERC721Query.refetch();
    }
  }, [store.starkKey]);

  return (
    <div className={styles.nftListWrapper}>
      <Back>ERC721</Back>
      <div style={{ padding: '0 20px' }}>
        <Row gutter={[20, 24]} className={styles.nftListContent}>
          {type === 'l2'
            ? urls.map((item, index) => {
                return (
                  <NFT
                    key={index}
                    image={item}
                    tokenId={tokenIds[index]}
                    type={type}
                  />
                );
              })
            : tokenIds.map((item) => {
                return <NFT key={item} tokenId={item} type={type!} />;
              })}
        </Row>
      </div>
    </div>
  );
};

export default NFTList;
