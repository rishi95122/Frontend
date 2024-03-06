import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { useQuery } from "@tanstack/react-query"

export const useGetTotalAmountSpend = () => {
	const { getSigningCosmWasmClient, address, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const { FuzioNativePrediction } = contracts

	const { data = 0, isLoading } = useQuery<number>(
		[`@fuzio/prediction/${address}/totalSpend`],
		async () => {
			const client = await getSigningCosmWasmClient()
			const nativeClient = new FuzioNativePrediction.FuzioNativePredictionQueryClient(
				client,
				"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
			)

			const claimInfoByUser = await nativeClient.totalSpent({
				player: address!
			})
			return Number(claimInfoByUser.total_spent)
		},
		{
			enabled: isWalletConnected,
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
