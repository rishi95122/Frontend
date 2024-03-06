import { useTokenList } from "./useTokenList"
import { type CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { useMemo } from "react"
import { type Token, type TokenWithBalance } from "utils/tokens/tokens"

export const fetchTokenBalance = async ({
	address,
	client,
	denom
}: {
	address: string
	client: CosmWasmClient
	denom: string
}): Promise<BigNumber> => {
	const coin = await client.getBalance(address, denom)
	const amount = coin ? coin.amount : "0"
	const result = BigNumber(amount)

	return result
}

export const useTokenBalance = (denom: string) => {
	const { address, getSigningCosmWasmClient, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const { data = BigNumber(0), isLoading } = useQuery<BigNumber>(
		[`@fuzio/${address}/${denom}/balance`],
		async () => {
			const client = await getSigningCosmWasmClient()
			const tokenBalance = await fetchTokenBalance({
				address: address!,
				client,
				denom
			})
			return tokenBalance
		},
		{
			enabled: Boolean(isWalletConnected && address && denom),
			notifyOnChangeProps: ["data", "error"],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onError(error: any) {
				throw new Error("Error fetching token balance:" + error.message)
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}

export const useMultipleTokenBalance = (tokens: Token[]) => {
	const { address, getCosmWasmClient, isWalletConnected } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const tokenTypes = useMemo(() => tokens?.map(({ denom }) => denom), [tokens])
	const [tokenList] = useTokenList()

	const queryKey = useMemo(() => `multipleTokenBalances/${tokenTypes?.join("+")}`, [tokenTypes])

	const { data = [], isLoading } = useQuery(
		[queryKey, address],
		async () => {
			const client = await getCosmWasmClient()
			let balances: BigNumber[] = []
			// const dollarValues: number[] = []

			if (tokenTypes && isWalletConnected && tokenList) {
				balances = await Promise.all(
					tokens.map(
						async (token) =>
							await fetchTokenBalance({
								address: address!,
								client,
								denom: token.denom
							})
					)
				)
			} else {
				balances = tokens.map(() => BigNumber(0))
			}

			const tokenBalances: TokenWithBalance[] = tokens.map((token, index) => ({
				balance: balances[index],
				...token
			}))

			return tokenBalances
		},
		{
			enabled: Boolean(tokens?.length && tokenList),
			onError(error) {
				// eslint-disable-next-line no-console
				console.error("Couldn't fetch asset balances: ", error)
			},
			refetchInterval: 6_000,
			refetchIntervalInBackground: true,

			refetchOnMount: "always"
		}
	)

	return [data, isLoading] as const
}
