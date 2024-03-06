import { type CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { type TValidPair } from "utils/tokens/pools"

export type GetToken1ForToken2PriceInput = {
	client: CosmWasmClient
	nativeAmount: string
	swapAddress: string
}

export type GetToken2ForToken1PriceInput = {
	client: CosmWasmClient
	swapAddress: string
	tokenAmount: string
}

export type GetTokenForTokenPriceInput = {
	fromAmount: string
	getCosmWasmClient: () => Promise<CosmWasmClient>
	validPair: TValidPair
}

// eslint-disable-next-line canonical/id-match
export const getToken1ForToken2Price = async ({
	nativeAmount,
	swapAddress,
	client
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
GetToken1ForToken2PriceInput) => {
	try {
		const response = await client.queryContractSmart(swapAddress, {
			token1_for_token2_price: {
				token1_amount: nativeAmount
			}
		})

		return response.token2_amount
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("err(getToken1ForToken2Price):", error)
	}
}

// eslint-disable-next-line canonical/id-match
export const getToken2ForToken1Price = async ({
	tokenAmount,
	swapAddress,
	client
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
GetToken2ForToken1PriceInput): Promise<any> => {
	try {
		const query = await client.queryContractSmart(swapAddress, {
			token2_for_token1_price: {
				token2_amount: tokenAmount
			}
		})

		return query.token1_amount
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("error(getToken2ForToken1Price):", error)
	}
}

export const getTokenForTokenPrice = async ({
	fromAmount,
	validPair,
	getCosmWasmClient
}: GetTokenForTokenPriceInput) => {
	const client = await getCosmWasmClient()
	let intermediatePrice
	let queryResult1

	try {
		// eslint-disable-next-line no-negated-condition
		if (!validPair.subPools) {
			// eslint-disable-next-line no-negated-condition
			intermediatePrice = !validPair.reverse
				? await getToken1ForToken2Price({
						client,
						nativeAmount: fromAmount,
						swapAddress: validPair.pool.swapAddress
				  })
				: await getToken2ForToken1Price({
						client,
						swapAddress: validPair.pool.swapAddress,
						tokenAmount: fromAmount
				  })
		} else {
			const firstPool = validPair.subPools?.[0]
			const secondPool = validPair.subPools?.[1]
			if (!firstPool || !secondPool) return

			// eslint-disable-next-line no-negated-condition
			queryResult1 = !firstPool.reverse
				? await getToken1ForToken2Price({
						client,
						nativeAmount: fromAmount,
						swapAddress: firstPool.pool.swapAddress
				  })
				: await getToken2ForToken1Price({
						client,
						swapAddress: firstPool.pool.swapAddress,
						tokenAmount: fromAmount
				  })

			if (Number.isNaN(queryResult1) || !queryResult1) return

			// eslint-disable-next-line no-negated-condition
			intermediatePrice = !secondPool.reverse
				? await getToken1ForToken2Price({
						client,
						nativeAmount: queryResult1,
						swapAddress: secondPool.pool.swapAddress
				  })
				: await getToken2ForToken1Price({
						client,
						swapAddress: secondPool.pool.swapAddress,
						tokenAmount: queryResult1
				  })
		}

		// eslint-disable-next-line consistent-return
		return intermediatePrice
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("error(getTokenForTokenPrice)", error)
	}
}
