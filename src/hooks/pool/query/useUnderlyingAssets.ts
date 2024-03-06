// eslint-disable-next-line import/no-extraneous-dependencies
import { useBondedLiquidity } from "./useBondedLiquidity"
import { useUnbondedLiquidity } from "./useUnbondedLiquidity"
import { useChain } from "@cosmos-kit/react"
import { useTokenInfo } from "@hooks/tokens/query/useTokenInfo"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"

export const useUnderlyingAssets = ({ pool }: { pool: TPool }) => {
	const { isWalletConnected, getSigningCosmWasmClient, address } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const tokenAInfo = useTokenInfo(pool.liquidity.token1.denom)
	const tokenBInfo = useTokenInfo(pool.liquidity.token1.denom)

	const [bonded, isLoadingBonded] = useBondedLiquidity({ pool })
	const [unbonded, isLoadingUnbonded] = useUnbondedLiquidity({ pool })

	const {
		data = {
			bondedTokens: [0, 0],
			bondedTokensPerPeriod: [[0, 0]],
			unbondedTokens: [0, 0]
		},
		isLoading
	} = useQuery<{
		bondedTokens: [number, number]
		bondedTokensPerPeriod: Array<[number, number]>
		unbondedTokens: [number, number]
	}>(
		[`@fuzio/pool/${pool.poolId}/${address}/underlyingAssets`],
		async () => {
			const client = await getSigningCosmWasmClient()

			const swap = await client.queryContractSmart(pool.swapAddress, {
				info: {}
			})

			const totalReserve: [number, number] = [
				Number(swap.token1_reserve),
				Number(swap.token2_reserve)
			]

			const unbondedTokens: [number, number] = [
				convertMicroDenomToDenom(
					unbonded.dividedBy(BigNumber(swap.lp_token_supply)).multipliedBy(totalReserve[0]),
					tokenAInfo?.decimal ?? 6
				).toNumber() ?? 0,
				convertMicroDenomToDenom(
					unbonded.dividedBy(BigNumber(swap.lp_token_supply)).multipliedBy(totalReserve[1]),
					tokenBInfo?.decimal ?? 6
				).toNumber() ?? 0
			]

			const bondedTokens: [number, number] = [
				convertMicroDenomToDenom(
					(bonded?.totalBondedAmount ?? BigNumber(0))
						.dividedBy(BigNumber(swap.lp_token_supply))
						.multipliedBy(totalReserve[0]),
					tokenAInfo?.decimal ?? 6
				).toNumber() ?? 0,
				convertMicroDenomToDenom(
					(bonded?.totalBondedAmount ?? BigNumber(0))
						.dividedBy(BigNumber(swap.lp_token_supply))
						.multipliedBy(totalReserve[1]),
					tokenBInfo?.decimal ?? 6
				).toNumber() ?? 0
			]

			const bondedTokensPerPeriod: Array<[number, number]> = bonded?.bondedBalances
				? bonded?.bondedBalances.map(({ balance }) => {
						const currentPeriodBondedTokens: [number, number] = [
							convertMicroDenomToDenom(
								(balance ?? BigNumber(0))
									.dividedBy(BigNumber(swap.lp_token_supply))
									.multipliedBy(totalReserve[0]),
								tokenAInfo?.decimal ?? 6
							).toNumber() ?? 0,
							convertMicroDenomToDenom(
								(balance ?? BigNumber(0))
									.dividedBy(BigNumber(swap.lp_token_supply))
									.multipliedBy(totalReserve[1]),
								tokenBInfo?.decimal ?? 6
							).toNumber() ?? 0
						]

						return currentPeriodBondedTokens
				  })
				: []

			return { bondedTokens, bondedTokensPerPeriod, unbondedTokens }
		},
		{
			enabled: Boolean(isWalletConnected && pool && !isLoadingBonded && !isLoadingUnbonded),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching pool dollar values")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
