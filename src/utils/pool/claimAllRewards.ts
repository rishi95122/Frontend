import { simulateTransaction } from "../messages/simulateTransaction"
import {
	type MsgExecuteContractEncodeObject,
	type SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { contracts } from "@fuzio/contracts"
import { type TPool } from "utils/tokens/pools"

export const claimAllRewards = async (
	address: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>,
	pools: TPool[]
) => {
	const client = await getSigningCosmWasmClient()

	const { FuzioStakingMessageComposer } = contracts.FuzioStaking

	const transactions: MsgExecuteContractEncodeObject[] = []

	for (const pool of pools) {
		const { bondingPeriods } = pool
		for (const bondingPeriod of bondingPeriods) {
			const messageComposer = new FuzioStakingMessageComposer(address, bondingPeriod.address)

			const stakerInfo = await client.queryContractSmart(bondingPeriod.address, {
				staker_info: {
					staker: address
				}
			})

			const claimMessage = messageComposer.withdraw()

			if (stakerInfo.pending_reward > 0) transactions.push(claimMessage)
		}
	}

	return simulateTransaction(await client.signAndBroadcast(address, transactions, "auto"))
}
