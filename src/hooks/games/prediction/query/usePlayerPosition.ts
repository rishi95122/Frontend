/* eslint-disable @typescript-eslint/naming-convention */
import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { type MyCurrentPositionResponse } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import { useQuery } from "@tanstack/react-query"

export const usePlayerPosition = ({ roundId }: { roundId: string }) => {
	const { getCosmWasmClient, address, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const { FuzioNativePrediction } = contracts

	const {
		data = {
			live_bear_amount: "0",
			live_bull_amount: "0",
			next_bear_amount: "0",
			next_bull_amount: "0"
		},
		isLoading
	} = useQuery<MyCurrentPositionResponse>(
		[`@fuzio/prediction/round/${roundId}/${address}`],
		async () => {
			const client = await getCosmWasmClient()
			const nativeClient = new FuzioNativePrediction.FuzioNativePredictionQueryClient(
				client,
				"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
			)

			const { live_bear_amount, next_bull_amount, next_bear_amount, live_bull_amount } =
				await nativeClient.myCurrentPosition({ address: address! })

			return {
				live_bear_amount,
				live_bull_amount,
				next_bear_amount,
				next_bull_amount
			}
		},
		{
			enabled: Boolean(isWalletConnected && address),
			notifyOnChangeProps: ["data", "error"],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				throw new Error("Error fetching player round info:" + error.message)
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
