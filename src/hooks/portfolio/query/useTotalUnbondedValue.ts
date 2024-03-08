import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { usePoolList } from "@hooks/pool/query/usePoolList"
import { useMultipleTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { useQuery } from "@tanstack/react-query"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import {
	convertMicroDenomToDenom,
	initialNeutronToken,
	initialUSDCToken
} from "utils/tokens/helpers"

export const useTotalUnbondedValue = ({ tokenList }: { tokenList: Token[] }) => {
	const { isWalletConnected, address, getCosmWasmClient } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const [poolsList] = usePoolList()
	const [tokenListWithBalances] = useMultipleTokenBalance(tokenList)

	const { FuzioPoolQueryClient } = contracts.FuzioPool

	const { data = 0, isLoading } = useQuery<number>(
		[`@fuzio/portfolio/${address}/totalUnbondedValue`],
		async () => {
			const client = await getCosmWasmClient()
			let totalUnbondedDollarValue = 0

			const ElectronUsdcPool = poolsList?.poolsWithAPR.find(
				(liquidity) =>
					liquidity.pool.liquidity.token1.denom === initialNeutronToken.denom &&
					liquidity.pool.liquidity.token2.denom === initialUSDCToken.denom
			)
			const ratio = ElectronUsdcPool?.pool.ratio ?? BigNumber(0)
			const FuzioPrice = BigNumber(ratio)

			// eslint-disable-next-line no-unsafe-optional-chaining
			for (const [, pool] of poolsList?.poolsWithAPR.entries()!) {
				const { lpTokenAddress } = pool.pool
				const lpUsd = BigNumber(pool.pool.liquidity.usd)
				const lpTokenPrice = lpUsd.dividedBy(pool.pool.lpTokens)

				const queryService = new FuzioPoolQueryClient(client, lpTokenAddress)

				const balanceQuery = await queryService.balance({ address: address! })

				totalUnbondedDollarValue += convertMicroDenomToDenom(
					BigNumber(balanceQuery.balance).times(lpTokenPrice),
					6
				).toNumber()
			}

			// eslint-disable-next-line no-unsafe-optional-chaining
			for (const [, tokenWithBalance] of tokenListWithBalances?.entries()!) {
				const { balance, denom, decimal } = tokenWithBalance
				let tokenPrice = BigNumber(0)

				const pool = poolsList?.poolsWithAPR.find(
					(liquidity) =>
						liquidity.pool.liquidity.token1.denom === initialNeutronToken.denom &&
						liquidity.pool.liquidity.token2.denom === denom
				)

				// eslint-disable-next-line no-negated-condition
				if (denom !== initialNeutronToken.denom) {
					const currentRatio = pool?.pool.ratio ?? 0
					tokenPrice = currentRatio ? BigNumber(FuzioPrice.dividedBy(currentRatio)) : BigNumber(0)
				} else {
					tokenPrice = BigNumber(FuzioPrice)
				}

				totalUnbondedDollarValue += convertMicroDenomToDenom(
					balance.times(tokenPrice),
					decimal
				).toNumber()
			}

			return totalUnbondedDollarValue
		},
		{
			enabled: Boolean(
				poolsList &&
					poolsList.poolsWithAPR.length > 0 &&
					tokenListWithBalances &&
					tokenListWithBalances.length > 0 &&
					isWalletConnected
			),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error calculating total unbonded value")
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
