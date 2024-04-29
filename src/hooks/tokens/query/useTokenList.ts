import { useQuery } from "@tanstack/react-query"
import { type Token } from "utils/tokens/tokens"

export const tokenListUrl = `https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/${
	import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet" ? "mainnet/" : "testnet/"
}tokenList.json`

export const useTokenList = () => {
	const { data = [], isLoading } = useQuery<Token[]>(
		["@fuzio/tokenList"],
		async () => {
			const tokenListResponse = await fetch(tokenListUrl)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const tokenListJson: any = await tokenListResponse.json()
			const tokenList: Token[] = tokenListJson.tokens.map((token: Token) => token)

			return tokenList
		},
		{
			enabled: true,
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching token list")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true
		}
	)

	return [data, isLoading] as const
}
