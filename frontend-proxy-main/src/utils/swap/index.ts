import { type Token } from "utils/tokens/tokens"

export type TSwapInfo = {
	from: {
		amount: string
		token: Token
	}
	to: {
		amount: string
		token: Token
	}
}

export type TAddLiquidityInfo = {
	tokenA: {
		amount: string
		token: Token
	}
	tokenB: {
		amount: string
		token: Token
	}
}
