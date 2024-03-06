import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@fuzio/contracts"

export const claimAllWins = async (
	address: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
	const client = await getSigningCosmWasmClient()

	const {
		FuzioNativePrediction: { FuzioNativePredictionMessageComposer }
	} = contracts
	const messageComposer = new FuzioNativePredictionMessageComposer(
		address,
		"sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"
	)

	const claimMessage = messageComposer.collectWinnings()

	return await client.signAndBroadcast(address, [claimMessage], "auto", `Electron | Claim Winnings`)
}
