import {Types} from "../utils";

export interface Asset {
    type: `${Types}`,
    // ETH 可不传
    tokenAddress?: string,
    tokenId?: number | string,
    quantum?: number | string,
    blob?: string
}
