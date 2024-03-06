import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { useChain } from "@cosmos-kit/react"
import { seiprotocol } from "@fuzio/sei-rpc"
import { useQuery } from "@tanstack/react-query"
import { convertMicroDenomToDenom } from "@utils/tokens/helpers"

export const useTokenPrice = () => {
	const { getRpcEndpoint } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const {
		seichain: {
			oracle: { QueryExchangeRateRequest }
		}
	} = seiprotocol

	const QueryClientImpl = seiprotocol.seichain.oracle.QueryClientImpl

	const { data = 0, isLoading } = useQuery<number>(
		[`@fuzio/prediction/tokenPrice`],
		async () => {
			const rpcEndpoint = await getRpcEndpoint()
			// eslint-disable-next-line canonical/id-match
			const tmClient = await Tendermint34Client.connect(rpcEndpoint)
			const client = new QueryClient(tmClient)
			const rpc = createProtobufRpcClient(client)
			const queryService = new QueryClientImpl(rpc)

			const request = QueryExchangeRateRequest.fromPartial({ denom: "ubtc" })
			const resp = await queryService.exchangeRate(request)

			const tokenPrice = convertMicroDenomToDenom(resp.oracleExchangeRate?.exchangeRate!, 18)

			return Number(tokenPrice.toFixed(2))
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
