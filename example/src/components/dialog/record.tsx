import { Dialog, Link } from 'tdesign-react';
import Text from '@/components/typography';
import styles from './index.less';
import { useQuery } from '@tanstack/react-query';
import { reddio } from '@/utils/config';
import { useSnapshot } from 'valtio';
import { store } from '@/utils/store';
import { useState } from 'react';
import type { RecordResponse } from '@reddio.com/js';

interface IRecordProps {
  address: string;
  onClose: () => void;
}

const recordType = [
  'All',
  'Deposit',
  'Mint',
  'TransferFrom',
  'WithDraw',
  'FullWithDraw',
  'TransferAll',
  'ASKOrder',
  'BIDOrder',
  'OrderAll',
];

const recordStatus = [
  'Submitted',
  'Accepted',
  'Failed',
  'Proved',
  'ProvedError',
];

const Record = ({ onClose, address }: IRecordProps) => {
  const snap = useSnapshot(store);

  const [records, setRecords] = useState<RecordResponse[]>([]);

  const recordQuery = useQuery(
    ['getRecords', snap.starkKey],
    () => {
      return reddio.apis.getRecords({
        starkKey: store.starkKey,
      });
    },
    {
      onSuccess: ({ data }) => {
        setRecords(data.data);
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
      style={{ padding: '28px 0' }}
    >
      <div className={styles.recordDialogContent}>
        <div>
          <Text type="bold">Record</Text>
          <Link
            theme="primary"
            href={`https://goerli.etherscan.io/address/${address}`}
            target="_blank"
            hover="color"
          >
            Etherscan
          </Link>
        </div>
        <div>
          {records.map((record) => (
            <div>{record.status}</div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default Record;
