import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { useQuery } from "@tanstack/react-query"

export const useGetWins = () => {
	const { getCosmWasmClient, address, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const { FuzioNativePrediction } = contracts

	const { data, isLoading } = useQuery<Array<[string, string]>>(
		[`@fuzio/prediction/${address}/wins`],
		async () => {
			const client = await getCosmWasmClient()
			const nativeClient = new FuzioNativePrediction.FuzioNativePredictionQueryClient(
				client,
				"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
			)

			const myWinsList = await nativeClient.myPendingRewardRounds({
				player: address!
			})

			return myWinsList.pending_reward_rounds
		},
		{
			enabled: Boolean(isWalletConnected),
			notifyOnChangeProps: ["data", "error"],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				throw new Error("Error fetching round status:" + error.message)
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
