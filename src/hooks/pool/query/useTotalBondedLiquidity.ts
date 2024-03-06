/* eslint-disable canonical/id-match */
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { type FuzioStakingQueryClient } from "@fuzio/contracts/types/FuzioStaking.client"
import { type StakerInfo } from "@fuzio/contracts/types/FuzioStaking.types"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { type TPool } from "utils/tokens/pools"

const FETCH_LIMIT = 20

export const getAllStakers = async (
	queryClient: FuzioStakingQueryClient
): Promise<StakerInfo[]> => {
	let allStakersInfo: StakerInfo[] = []
	const getStakersPaginated = async (startAfter?: string) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { stakers_list } = await queryClient.allStakers({
			limit: FETCH_LIMIT,
			startAfter
		})
		allStakersInfo = [...allStakersInfo, ...stakers_list]
		if (stakers_list.length === FETCH_LIMIT) {
			await getStakersPaginated(stakers_list[FETCH_LIMIT - 1].address)
		}
	}

	try {
		await getStakersPaginated()
		return allStakersInfo
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("An error occurred:", error)
		throw error
	}
}

export const useTotalBondedLiquidity = ({ pool }: { pool: TPool }) => {
	const { getCosmWasmClient } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const { FuzioStakingQueryClient } = contracts.FuzioStaking

	const { data, isLoading } = useQuery<{
		bondedBalances: Array<{ address: string; balance: BigNumber }>
		token1: string
		token2: string
		totalBondedAmount: BigNumber
	}>(
		[`@fuzio/totalBondedTokens/${pool.liquidity.token1.denom}+${pool.liquidity.token2.denom}`],
		async () => {
			const client = await getCosmWasmClient()

			const { bondingPeriods } = pool
			const bondedBalances: Array<{ address: string; balance: BigNumber }> = []
			let totalBondedAmount = BigNumber(0)

			for (const bondingPeriod of bondingPeriods) {
				const queryService = new FuzioStakingQueryClient(client, bondingPeriod.address)
				let bondedAmount = BigNumber(0)

				const allStakers = await getAllStakers(queryService)

				for (const staker of allStakers) {
					totalBondedAmount = totalBondedAmount.plus(staker.bond_amount)
					bondedAmount = bondedAmount.plus(staker.bond_amount)
				}

				bondedBalances.push({
					address: bondingPeriod.address,
					balance: bondedAmount
				})
			}

			// console.log({
			// 	bondedBalances: bondedBalances.toString(),
			// 	totalBondedAmount: totalBondedAmount.toString()
			// })

			return {
				bondedBalances,
				token1: pool.liquidity.token1.denom,
				token2: pool.liquidity.token2.denom,
				totalBondedAmount
			}
		},
		{
			enabled: Boolean(pool),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching total bonded tokens")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
