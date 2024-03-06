import { useTotalBondedLiquidity } from "./useTotalBondedLiquidity"
import { useTotalUnbondedLiquidity } from "./useTotalUnbondedLiquidity"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"

export const useTotalPoolDollarValues = ({ pool }: { pool: TPool }) => {
	const [bonded, isLoadingBonded] = useTotalBondedLiquidity({ pool })
	const [unbonded, isLoadingUnbonded] = useTotalUnbondedLiquidity({ pool })

	const {
		data = {
			bondingPeriodDollarValues: [],
			totalBondedDollarValue: 0,
			unbondedDollarValue: 0
		},
		isLoading
	} = useQuery<{
		bondingPeriodDollarValues: number[]
		totalBondedDollarValue: number
		unbondedDollarValue: number
	}>(
		[`@fuzio/portfolio/${pool.poolId}/totalDollarValue`],
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
				unbondedDollarValue
			}
		},
		{
			enabled: Boolean(pool && !isLoadingBonded && !isLoadingUnbonded),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching total pool dollar values")
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
