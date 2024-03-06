import { simulateTransaction } from "../messages/simulateTransaction"
import {
	type MsgExecuteContractEncodeObject,
	type SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@fuzio/contracts"

export const redeemTokens = async (
	address: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
	stakingAddresses: string[]
) => {
	const client = await getSigningCosmWasmClient()

	const { FuzioStakingMessageComposer } = contracts.FuzioStaking

	const redeemMessages: MsgExecuteContractEncodeObject[] = []

	for (const stakingAddress of stakingAddresses) {
		const messageComposer = new FuzioStakingMessageComposer(address, stakingAddress)
		const redeemMessage = messageComposer.redeem()

		redeemMessages.push(redeemMessage)
	}

	return simulateTransaction(await client.signAndBroadcast(address, redeemMessages, "auto"))
}
