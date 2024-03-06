import { useValidPool } from "./useValidPool"
import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import { useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { useRecoilValue } from "recoil"
import { tokenSwapState } from "state/swapState"
import { getTokenForTokenPrice } from "utils/prices/getPrice"

export const useTokenToTokenPriceQuery = () => {
	const { getCosmWasmClient } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const { from, to } = useRecoilValue(tokenSwapState)

	const fromToken = useTokenInfo(from.token.denom)
	const toToken = useTokenInfo(to.token.denom)

	const validPair = useValidPool(from.token.denom, to.token.denom)

	return useQuery(
		[`tokenToTokenPrice/${from.token.symbol}/${to.token.symbol}/${from.amount}`],
		// eslint-disable-next-line consistent-return
		async () => {
			if (validPair) {
				return await getTokenForTokenPrice({
					fromAmount: from.amount,
					getCosmWasmClient,
					validPair
				})
			}
		},
		{
			enabled: Boolean(
				validPair &&
					Number(from.amount) > 0 &&
					fromToken &&
					toToken &&
					fromToken.symbol !== toToken.symbol
			),
			refetchInterval: 6_000,
			refetchOnMount: false,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true
		}
	)
}

export const useTokenToTokenPrice = () => {
	const { data: currentTokenPrice, isLoading } = useTokenToTokenPriceQuery()
	return [{ price: isLoading ? 0 : currentTokenPrice }, isLoading] as const
}
