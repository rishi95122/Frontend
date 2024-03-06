import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"

export const useUnbondingAssets = ({
	amount,
	address,
	index,
	pool
}: {
	address: string
	amount: string
	index: number
	pool: TPool
}) => {
	const { isWalletConnected, getSigningCosmWasmClient } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const { data = { unbondingAssets: [BigNumber(0), BigNumber(0)] }, isLoading } = useQuery<{
		unbondingAssets: [BigNumber, BigNumber]
	}>(
		[`@fuzio/pool/${pool.poolId}/${address}/${index}/unbondingAssets`],
		async () => {
			const client = await getSigningCosmWasmClient()

			const swap = await client.queryContractSmart(pool.swapAddress, {
				info: {}
			})

			const totalReserve: [BigNumber, BigNumber] = [
				BigNumber(swap.token1_reserve),
				BigNumber(swap.token2_reserve)
			]

			const unbondingAssets: [BigNumber, BigNumber] = [
				convertMicroDenomToDenom(
					BigNumber(amount).dividedBy(swap.lp_token_supply).times(totalReserve[0]),
					6
				),
				convertMicroDenomToDenom(
					BigNumber(amount).dividedBy(swap.lp_token_supply).times(totalReserve[1]),
					6
				)
			]

			return { unbondingAssets }
		},
		{
			enabled: Boolean(isWalletConnected && pool),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching pool dollar values")
			},
			refetchInterval: 6_000,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
