import { useTotalBondedLiquidity } from "./useTotalBondedLiquidity"
import { useQuery } from "@tanstack/react-query"
import { convertDenomToMicroDenom } from "@utils/tokens/helpers"
import { BigNumber } from "bignumber.js"
import { type TPool } from "utils/tokens/pools"

export const useTotalUnbondedLiquidity = ({ pool }: { pool: TPool }) => {
	const [totalBonded, isLoadingTotalBonded] = useTotalBondedLiquidity({ pool })

	const { data = BigNumber(0), isLoading } = useQuery<BigNumber>(
		[`@fuzio/totalUnbondedTokens/${pool.liquidity.token1.denom}/${pool.liquidity.token2.denom}`],
		async () => {
			return pool.lpTokens.isNaN()
				? BigNumber(0)
				: convertDenomToMicroDenom(pool.lpTokens, 6).minus(totalBonded?.totalBondedAmount ?? 0)
		},
		{
			enabled: Boolean(!isLoadingTotalBonded && pool),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching unbonded tokens")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
