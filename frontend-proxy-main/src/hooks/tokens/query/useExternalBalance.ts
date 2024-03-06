import { type StargateClient } from "@cosmjs/stargate"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { useRecoilValue } from "recoil"
import { externalTokenState } from "state/UIState"

export const fetchExternalBalance = async ({
	address,
	client,
	denom
}: {
	address: string
	client: StargateClient
	denom: string
}): Promise<BigNumber> => {
	const coin = await client.getBalance(address, denom)
	const amount = coin ? coin.amount : "0"

	const result = BigNumber(amount)

	return result
}

export const useExternalBalance = (denom: string) => {
	const externalToken = useRecoilValue(externalTokenState)
	const { wallet } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const {
		address: externalAddress,
		getStargateClient,
		isWalletConnected
	} = useChainWallet(externalToken?.chain?.chainName!, wallet?.name!)

	const { data = BigNumber(0), isLoading } = useQuery<BigNumber>(
		[`@fuzio/${externalAddress}/${denom}/balance`],
		async () => {
			const client = await getStargateClient()
			const tokenBalance = await fetchExternalBalance({
				address: externalAddress!,
				client,
				denom
			})
			return tokenBalance
		},
		{
			enabled: Boolean(isWalletConnected && externalAddress),
			notifyOnChangeProps: ["data", "error"],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				throw new Error("Error fetching external token balance:" + error.message)
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false,
			staleTime: 6_000
		}
	)

	return [data, isLoading] as const
}
