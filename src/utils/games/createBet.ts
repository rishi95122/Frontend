import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@fuzio/contracts"

export const createBet = async (
	address: string,
	betType: string,
	roundId: string,
	amount: string,
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

	const memo = betType.charAt(0).toUpperCase() + betType.slice(1)

	const betMessage =
		betType === "bull"
			? messageComposer.betBull({ amount: Math.floor(Number(amount)).toString(), roundId }, [
					{
						amount: Math.floor(Number(amount)).toString(),
						denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE"
					}
			  ])
			: messageComposer.betBear({ amount: Math.floor(Number(amount)).toString(), roundId }, [
					{
						amount: Math.floor(Number(amount)).toString(),
						denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE"
					}
			  ])

	return await client.signAndBroadcast(address, [betMessage], "auto", `Electron | Bet ${memo}`)
}
