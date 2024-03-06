import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { toBase64, toUtf8 } from "@cosmjs/encoding"
import { type BigNumber } from "bignumber.js"
import { type TPool } from "utils/tokens/pools"

export const bondTokens = async (
	address: string,
	pool: TPool,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
	amount: BigNumber,
	stakingAddress: string
) => {
	const client = await getSigningCosmWasmClient()

	const bondTokensMessage = {
		send: {
			amount: amount.toString(),
			contract: stakingAddress,
			msg: toBase64(
				toUtf8(
					JSON.stringify({
						bond: {}
					})
				)
			)
		}
	}

	return await client.execute(
		address,
		pool.lpTokenAddress,
		bondTokensMessage,
		"auto",
		undefined,
		[]
	)
}
