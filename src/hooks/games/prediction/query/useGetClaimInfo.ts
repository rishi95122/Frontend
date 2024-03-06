import { useChain } from "@cosmos-kit/react"
import { contracts } from "@fuzio/contracts"
import { type ClaimInfo } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import { useQuery } from "@tanstack/react-query"

export const useGetClaimInfo = () => {
	const { getSigningCosmWasmClient, address, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const { FuzioNativePrediction } = contracts

	const { data, isLoading } = useQuery<ClaimInfo[]>(
		[`@fuzio/prediction/${address}/claimInfo`],
		async () => {
			const client = await getSigningCosmWasmClient()
			const nativeClient = new FuzioNativePrediction.FuzioNativePredictionQueryClient(
				client,
				"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
			)

			const claimInfoByUser = await nativeClient.getClaimInfoByUser({
				player: address!
			})
			return claimInfoByUser.claim_info
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
