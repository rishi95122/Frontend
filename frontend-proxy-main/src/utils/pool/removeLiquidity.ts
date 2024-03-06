import { createIncreaseAllowanceMessage } from "../messages/createIncreaseAllowanceMessage"
import { simulateTransaction } from "../messages/simulateTransaction"
import {
	type MsgExecuteContractEncodeObject,
	type SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@fuzio/contracts"
import { type BigNumber } from "bignumber.js"
import { convertDenomToMicroDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"

export const removeLiquidity = async (
	contractAddress: string,
	address: string,
	pool: TPool,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
	unbondedLiquidity: BigNumber,
	removeAmount: BigNumber
) => {
	const client = await getSigningCosmWasmClient()
	const { FuzioPoolMessageComposer } = contracts.FuzioPool

	const swapMessageComposer = new FuzioPoolMessageComposer(address, contractAddress)

	const transactions: MsgExecuteContractEncodeObject[] = []

	const increaseAllowanceMessage = createIncreaseAllowanceMessage({
		senderAddress: address,
		swapAddress: contractAddress,
		tokenAddress: pool.lpTokenAddress,
		tokenAmount: convertDenomToMicroDenom(unbondedLiquidity.multipliedBy(removeAmount), 6)
			.decimalPlaces(0, 1)
			.toString()
	})

	transactions.push(increaseAllowanceMessage)

	const removeLiquidityMessage = swapMessageComposer.removeLiquidity({
		amount: convertDenomToMicroDenom(unbondedLiquidity.multipliedBy(removeAmount), 6)
			.decimalPlaces(0, 1)
			.toString(),
		minToken1: "0",
		minToken2: "0"
	})

	transactions.push(removeLiquidityMessage)

	return simulateTransaction(await client.signAndBroadcast(address, transactions, "auto"))
}
