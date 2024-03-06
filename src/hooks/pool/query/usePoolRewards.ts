import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { type Denom } from "@fuzio/contracts/types/FuzioStaking.types"
import { useQuery } from "@tanstack/react-query"
import { type TPool } from "utils/tokens/pools"

export const usePoolRewards = ({ pool }: { pool: TPool }) => {
	const { getSigningCosmWasmClient, address, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const {
		FuzioStaking: { FuzioStakingQueryClient }
	} = contracts

	const { data = [], isLoading } = useQuery<
		Array<{
			amount: string
			token: Denom
		}>
	>(
		[`@fuzio/${pool.poolId}/rewards`],
		async () => {
			const client = await getSigningCosmWasmClient()
			const pendingRewards: Array<{
				amount: string
				token: Denom
			}> = []

			for (const bondingPeriod of pool.bondingPeriods) {
				const queryClient = new FuzioStakingQueryClient(client, bondingPeriod.address)

				const stakerInfo = await queryClient.stakerInfo({ staker: address! })

				// eslint-disable-next-line array-callback-return
				stakerInfo.pending_reward.map((reward, index) => {
					pendingRewards.push({
						amount: reward,
						token: bondingPeriod.rewards[index].rewardToken
					})
				})
			}

			return pendingRewards
		},
		{
			enabled: isWalletConnected,
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching pending rewards")
			},
			refetchInterval: 1_000,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
