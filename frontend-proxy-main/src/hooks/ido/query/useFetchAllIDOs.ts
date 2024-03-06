import { useChain } from "@cosmos-kit/react"
import { cosmwasm } from "@fuzio/sei-rpc"
import { useQuery } from "@tanstack/react-query"

export const useFetchAllIDOs = () => {
	const { getRpcEndpoint } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const {
		ClientFactory: { createRPCQueryClient }
	} = cosmwasm

	const { data = [], isLoading } = useQuery<string[]>(
		[`@fuzio/ido/all/contracts`],
		async () => {
			const queryClient = await createRPCQueryClient({
				rpcEndpoint: await getRpcEndpoint()
			})

			let allIDOContracts: string[] = []

			const getIDOsPaginated = async () => {
				const offset = BigInt(allIDOContracts.length)

				try {
					const { contracts, pagination } = await queryClient.cosmwasm.wasm.v1.contractsByCode({
						codeId: 579n,
						pagination: {
							countTotal: true,
							key: new Uint8Array(),
							limit: 5n,
							offset
						}
					})
					allIDOContracts = [...allIDOContracts, ...contracts]
					if (BigInt(allIDOContracts.length) < (pagination?.total ?? 0n)) {
						await getIDOsPaginated()
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error("An error occurred:", error)
					throw error
				}
			}

			try {
				await getIDOsPaginated()
				return allIDOContracts
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error("An error occurred:", error)
				throw error
			}
		},
		{
			enabled: true,
			notifyOnChangeProps: ["data", "error"],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				throw new Error("Error fetching all ido contracts:" + error.message)
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
