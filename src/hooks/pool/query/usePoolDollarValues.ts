import { useBondedLiquidity } from "./useBondedLiquidity"
import { useRedeemHistory } from "./useRedeemHistory"
import { useUnbondedLiquidity } from "./useUnbondedLiquidity"
import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"

export const usePoolDollarValues = ({ pool }: { pool: TPool }) => {
	const { isWalletConnected, address } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const [bonded, isLoadingBonded] = useBondedLiquidity({ pool })
	const [unbonded, isLoadingUnbonded] = useUnbondedLiquidity({ pool })
	const [redeem, isLoadingRedeem] = useRedeemHistory({
		limit: 100,
		pool,
		startAfter: 0
	})

	const {
		data = {
			bondingPeriodDollarValues: [],
			totalBondedDollarValue: 0,
			totalRedeemableDollarValue: 0,
			unbondedDollarValue: 0
		},
		isLoading
	} = useQuery<{
		bondingPeriodDollarValues: number[]
		totalBondedDollarValue: number
		totalRedeemableDollarValue: number
		unbondedDollarValue: number
	}>(
		[`@fuzio/portfolio/${pool.poolId}/${address}/totalDollarValue`],
		async () => {
			const lpUsd = BigNumber(pool.liquidity.usd)
			const lpTokenPrice = lpUsd.dividedBy(pool.lpTokens)

			const unbondedDollarValue = convertMicroDenomToDenom(
				unbonded.times(lpTokenPrice),
				6
			).toNumber()

			const totalBondedDollarValue = convertMicroDenomToDenom(
				(bonded?.totalBondedAmount ?? BigNumber(0)).multipliedBy(lpTokenPrice),
				6
			).toNumber()

			const totalRedeemableDollarValue = convertMicroDenomToDenom(
				lpTokenPrice.times(redeem?.redeemableUnbondingAmount!),
				6
			).toNumber()

			const bondingPeriodDollarValues: number[] = []

			for (const bondedAmount of bonded?.bondedBalances ?? []) {
				bondingPeriodDollarValues.push(
					convertMicroDenomToDenom(
						Number(Number(bondedAmount.balance) * lpTokenPrice.toNumber()),
						6
					).toNumber()
				)
			}

			return {
				bondingPeriodDollarValues,
				totalBondedDollarValue,
				totalRedeemableDollarValue,
				unbondedDollarValue
			}
		},
		{
			enabled: Boolean(
				isWalletConnected && pool && !isLoadingBonded && !isLoadingUnbonded && !isLoadingRedeem
			),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching pool dollar values")
			},
			refetchInterval: 10_000,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
