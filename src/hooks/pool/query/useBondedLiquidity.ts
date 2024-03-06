import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { type TPool } from "utils/tokens/pools"

export const useBondedLiquidity = ({ pool }: { pool: TPool }) => {
	const { isWalletConnected, address, getSigningCosmWasmClient } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const { FuzioStakingQueryClient } = contracts.FuzioStaking

	const { data, isLoading } = useQuery<{
		bondedBalances: Array<{ address: string; balance: BigNumber }>
		token1: string
		token2: string
		totalBondedAmount: BigNumber
	}>(
		[
			`@fuzio/bondedTokens/${pool.liquidity.token1.denom}+${pool.liquidity.token2.denom}/${address}`
		],
		async () => {
			const client = await getSigningCosmWasmClient()

			const { bondingPeriods } = pool
			const bondedBalances: Array<{ address: string; balance: BigNumber }> = []
			let totalBondedAmount = BigNumber(0)

			for (const bondingPeriod of bondingPeriods) {
				const queryService = new FuzioStakingQueryClient(client, bondingPeriod.address)
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const { bond_amount } = await queryService.stakerInfo({
					staker: address!
				})

				bondedBalances.push({
					address: bondingPeriod.address,
					balance: BigNumber(bond_amount)
				})

				totalBondedAmount = totalBondedAmount.plus(BigNumber(bond_amount))
			}

			return {
				bondedBalances,
				token1: pool.liquidity.token1.denom,
				token2: pool.liquidity.token2.denom,
				totalBondedAmount
			}
		},
		{
			enabled: Boolean(isWalletConnected && address && pool),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching bonded tokens")
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
