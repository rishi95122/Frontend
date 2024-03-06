import { atom } from "recoil"
import { type TAddLiquidityInfo } from "utils/swap"

export const addLiquidityState = atom<TAddLiquidityInfo>({
	default: undefined,
	key: "addLiquidity"
})

export const redeemAvailableState = atom<boolean>({
	default: false,
	key: "redeemAvailable"
})
