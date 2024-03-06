import { useChain } from "@cosmos-kit/react"
import { usePoolList } from "@hooks/pool/query/usePoolList"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"

export const useTotalBondedValue = () => {
	const { isWalletConnected, address, getSigningCosmWasmClient } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const [poolsList] = usePoolList()

	const { data = 0, isLoading } = useQuery<number>(
		[`@fuzio/portfolio/${address}/totalBondedValue`],
		async () => {
			const client = await getSigningCosmWasmClient()
			let totalBondedDollarValue = 0

			// eslint-disable-next-line no-unsafe-optional-chaining
			for (const [, pool] of poolsList?.poolsWithAPR.entries()!) {
				const { bondingPeriods } = pool.pool
				const lpUsd = BigNumber(pool.pool.liquidity.usd)
				const lpTokenPrice = lpUsd.dividedBy(pool.pool.lpTokens)

				for (const bondingPeriod of bondingPeriods) {
					const bondedTokens = await client.queryContractSmart(bondingPeriod.address, {
						staker_info: {
							staker: address
						}
					})

					totalBondedDollarValue += Number(bondedTokens.bond_amount * lpTokenPrice.toNumber())
				}
			}

			return totalBondedDollarValue
		},
		{
			enabled: Boolean(poolsList && poolsList.poolsWithAPR.length > 0 && isWalletConnected),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error calculating total bonded value")
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
