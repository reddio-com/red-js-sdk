import {Types} from "../utils";

export interface Asset {
    type: `${Types}`,
    tokenAddress: string,
    quantum: number | string,
    tokenId?: number,
    blob?: string
}
