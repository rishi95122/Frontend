import { initialTokenSwap } from "@utils/tokens/helpers"
import { atom } from "recoil"
import { type TSwapInfo } from "utils/swap"

export const tokenSwapState = atom<TSwapInfo>({
	default: initialTokenSwap,
	key: "tokenSwapState"
})

export const slippageState = atom<number>({
	default: 0.01,
	key: "slippage"
})
