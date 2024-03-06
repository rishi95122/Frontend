import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { type FinishedRound } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import { useQuery } from "@tanstack/react-query"

export const useFinishedRound = ({ roundId }: { roundId: string }) => {
	const { getCosmWasmClient } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const { FuzioNativePrediction } = contracts

	const { data, isLoading } = useQuery<FinishedRound>(
		[`@fuzio/prediction/round/${roundId}/finished`],
		async () => {
			const client = await getCosmWasmClient()
			const nativeClient = new FuzioNativePrediction.FuzioNativePredictionQueryClient(
				client,
				"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
			)

			const finishedRound = await nativeClient.finishedRound({ roundId })
			return finishedRound
		},
		{
			enabled: true,
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
