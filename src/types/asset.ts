import {Types} from "../utils/enum";

export interface Asset {
    type: `${Types}`,
    tokenAddress: string,
    quantum: number,
    tokenId?: number,
    blob?: string
}
