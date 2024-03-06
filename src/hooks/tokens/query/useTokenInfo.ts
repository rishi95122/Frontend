import { useTokenList } from "./useTokenList"
import { type Token } from "@utils/tokens/tokens"
import { useCallback, useMemo } from "react"

export const getTokenInfoFromTokenList = (denom: string, tokenList: Token[]): Token | undefined =>
	tokenList.find((x) => x.denom === denom)

export const useGetMultipleTokenInfo = () => {
	const [tokenList] = useTokenList()
	return useCallback(
		(tokens: string[]) => tokens?.map((token) => getTokenInfoFromTokenList(token, tokenList!)),
		[tokenList]
	)
}

export const useMultipleTokenInfo = (tokens: string[]) => {
	const getMultipleTokenInfo = useGetMultipleTokenInfo()
	return useMemo(() => getMultipleTokenInfo(tokens), [tokens, getMultipleTokenInfo])
}

export const useTokenInfo = (token: string) => {
	return useMultipleTokenInfo(useMemo(() => [token], [token]))[0]
}
