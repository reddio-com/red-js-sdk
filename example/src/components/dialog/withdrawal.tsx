import { Dialog, Button } from 'tdesign-react';
import Text from '@/components/typography';
import styles from './index.less';
import { useQuery } from '@tanstack/react-query';
import { reddio } from '@/utils/config';
import { useSnapshot } from 'valtio';
import { store } from '@/utils/store';
import { useState } from 'react';
import type { RecordResponse } from '@reddio.com/js';

interface IWithdrawalProps {
  onClose: () => void;
}

const items = ['GoerliETH', 'ERC20', 'ERC721'];

const Withdrawal = ({ onClose }: IWithdrawalProps) => {
  const snap = useSnapshot(store);

  const [status, setStatus] = useState<RecordResponse[]>([]);

  useQuery(
    ['getRecords', snap.starkKey],
    () => {
      console.log(123123);
      return reddio.apis.withdrawalStatus({
        starkKey: store.starkKey,
        stage: 'withdrawarea',
      });
    },
    {
      onSuccess: ({ data }) => {
        console.log(data.data);
      },
    },
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
          {items.map((item) => {
            return (
              <div key={item}>
                <Text color="#2C2C2C">1 {item}</Text>
                <Button shape="round" disabled>
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
