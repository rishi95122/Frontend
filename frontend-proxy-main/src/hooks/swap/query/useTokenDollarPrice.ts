import { useValidPool } from "./useValidPool"
import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import { getTokenForTokenPrice } from "utils/prices/getPrice"
import {
	convertDenomToMicroDenom,
	initialUSDCToken,
	initialUSTTwoToken
} from "utils/tokens/helpers"

export const useTokenDollarPriceQuery = ({ token }: { token: Token }) => {
	const { getCosmWasmClient } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const validPair = useValidPool(
		token.denom,
		import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet" ? initialUSDCToken.denom : initialUSTTwoToken.denom
	)

	return useQuery<BigNumber>(
		[`tokenDollarPrice/${token.denom}/${initialUSDCToken.denom}`],
		async () => {
			const tokenDollarPrice = await getTokenForTokenPrice({
				fromAmount: convertDenomToMicroDenom(1, token.decimal).toString(),
				getCosmWasmClient,
				validPair: validPair!
			})

			return BigNumber(tokenDollarPrice)
		},
		{
			enabled: Boolean(validPair && token),
			refetchInterval: 2_000,
			refetchIntervalInBackground: false,
			refetchOnMount: true,
			refetchOnWindowFocus: true
		}
	)
}

export const useTokenDollarPrice = ({ token }: { token: Token }) => {
	const {
		data = BigNumber(0),
		isLoading,
		isRefetching
	} = useTokenDollarPriceQuery({
		token
	})
	return [data, isLoading, isRefetching] as const
}
