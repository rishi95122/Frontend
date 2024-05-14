import { simulateTransaction } from "../messages/simulateTransaction"
import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@electronprotocol/contracts"

export const unbondTokens = async (
	address: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
	amount: number,
	stakingAddress: string
) => {
	const client = await getSigningCosmWasmClient()

	const { FuzioStakingMsgComposer } = contracts.FuzioStaking

	const messageComposer = new FuzioStakingMsgComposer(address, stakingAddress)

	const unbondMessage = messageComposer.unbond({ amount: amount.toString() })

	return simulateTransaction(await client.signAndBroadcast(address, [unbondMessage], "auto"))

	// return await client.execute(
	//   address,
	//   stakingAddress,
	//   testMessage,
	//   "auto",
	//   undefined,
	//   []
	// )
}
