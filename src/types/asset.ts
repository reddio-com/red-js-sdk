import { Types } from '../utils';

export interface Asset {
  type: `${Types}`;
  tokenAddress?: string;
  tokenId?: number | string;
  quantum?: number | string;
  tokenUri?: string;
}
