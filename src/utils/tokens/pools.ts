import { type Denom } from "@fuzio/contracts/types/FuzioPool.types"
import { type BigNumber } from "bignumber.js"

export type Reward = {
	apr: number
	rewardToken: Denom
}

export type BondingPeriod = {
	address: string
	distributionEnd: number
	distributionStart: number
	lockDuration: number
	rewards: Reward[]
}

export type LiquidityToken = {
	amount: BigNumber
	denom: string
	tokenPrice: BigNumber
}

export type Liquidity = {
	token1: LiquidityToken
	token2: LiquidityToken
	usd: number
}

export type TPool = {
	bondingPeriods: BondingPeriod[]
	highestApr: { highestAprToken: Denom; highestAprValue: number }
	isVerified: boolean
	liquidity: Liquidity
	lpTokenAddress: string
	lpTokens: BigNumber
	poolId: number
	ratio: BigNumber
	swapAddress: string
}

export type TValidPair = {
	pool: TPool
	reverse?: boolean
	subPools?: Array<{
		pool: TPool
		reverse: boolean
	}>
}
