import { Dialog, Button, message } from 'tdesign-react';
import Text from '@/components/typography';
import styles from './index.less';
import { useQuery } from '@tanstack/react-query';
import { reddio } from '@/utils/config';
import { useSnapshot } from 'valtio';
import { store } from '@/utils/store';
import { useCallback, useState } from 'react';
import type {
  RecordResponse,
  WithdrawalStatusResponse,
  WithdrawalFromL1Params,
} from '@reddio.com/js';
import { getEthAddress } from '@/utils/util';
import { ERC20Address, ERC721Address } from '@/utils/common';

interface IWithdrawalProps {
  onClose: () => void;
}

const items = ['GoerliETH', 'ERC20', 'ERC721'];

const Withdrawal = ({ onClose }: IWithdrawalProps) => {
  const snap = useSnapshot(store);

  const [status, setStatus] = useState<WithdrawalStatusResponse[]>([]);

  const withdrawalStatusQuery = useQuery(
    ['withdrawalStatus', snap.starkKey],
    async () => {
      return reddio.apis.withdrawalStatus({
        ethaddress: await getEthAddress(),
        stage: 'withdrawarea',
      });
    },
    {
      onSuccess: ({ data }) => {
        const array = data.data
          .filter((item) => item.contract_address === 'eth')
          .concat(
            data.data.filter(
              (item) => item.contract_address === ERC20Address.toLowerCase(),
            ),
          )
          .concat(
            data.data.filter(
              (item) => item.contract_address === ERC721Address.toLowerCase(),
            ),
          );
        setStatus(array);
      },
    },
  );

  const getText = useCallback((item: WithdrawalStatusResponse) => {
    if (item.type === 'ERC721') {
      return `TokenId: ${item.token_id}`;
    }
    return `${item.display_value} ${item.type}`;
  }, []);

  const handleWithdrawal = useCallback(
    async (item: WithdrawalStatusResponse) => {
      const params: any = {
        ethAddress: await getEthAddress(),
        type: item.type,
      };
      if (item.type === 'ERC721') {
        const assetType = await reddio.utils.getAssetTypeAndId({
          type: item.type,
          tokenAddress: item.contract_address,
          tokenId: Number(item.token_id),
        });
        params.assetType = assetType;
        params.tokenId = Number(item.token_id);
      } else {
        const assetType = await reddio.utils.getAssetTypeAndId({
          type: item.type,
          tokenAddress: item.contract_address,
        });
        params.assetType = assetType;
      }
      await reddio.apis.withdrawalFromL1({
        ethAddress: await getEthAddress(),
        type: item.type,
        tokenId: Number(item.token_id),
        assetType: item.asset_type,
      });
      withdrawalStatusQuery.refetch();
      message.success('Withdrawal success');
    },
    [],
  );

  return (
    <Dialog
      closeBtn
      closeOnOverlayClick
      destroyOnClose={false}
      draggable={false}
      footer={false}
      header={false}
      mode="modal"
      onClose={onClose}
      placement="top"
      preventScrollThrough
      showInAttachedElement={false}
      showOverlay
      theme="default"
      visible
    >
      <div className={styles.withdrawalDialogContent}>
        <div>
          <Text type="bold">withdrawal area</Text>
        </div>
        <div>
          {status.map((item, index) => {
            return (
              <div key={index}>
                <Text color="#2C2C2C">{getText(item)}</Text>
                <Button shape="round" onClick={() => handleWithdrawal(item)}>
                  Withdrawal
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default Withdrawal;
