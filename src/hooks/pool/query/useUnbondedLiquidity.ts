// eslint-disable-next-line import/no-extraneous-dependencies
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { type TPool } from "utils/tokens/pools"

export const useUnbondedLiquidity = ({ pool }: { pool: TPool }) => {
	const { isWalletConnected, address, getSigningCosmWasmClient } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const { FuzioPoolQueryClient } = contracts.FuzioPool

	const { data = BigNumber(0), isLoading } = useQuery<BigNumber>(
		[
			`@fuzio/unbondedTokens/${pool.liquidity.token1.denom}/${pool.liquidity.token2.denom}/${address}`
		],
		async () => {
			const client = await getSigningCosmWasmClient()

			const queryService = new FuzioPoolQueryClient(client, pool.lpTokenAddress)

			const balanceQuery = await queryService.balance({ address: address! })
			let balance = BigNumber(balanceQuery.balance)

			balance = balance.isNaN() ? BigNumber(0) : balance

			return balance
		},
		{
			enabled: Boolean(isWalletConnected && address),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching unbonded tokens")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false,
			staleTime: 6_000
		}
	)

	return [data, isLoading] as const
}
