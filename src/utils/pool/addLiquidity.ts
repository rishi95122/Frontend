/* eslint-disable no-negated-condition */
import { simulateTransaction } from "../messages/simulateTransaction"
import {
	type MsgExecuteContractEncodeObject,
	type SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import { type Coin } from "@cosmjs/stargate"
import { contracts } from "@fuzio/contracts"
import { getRecoil } from "recoil-nexus"
import { addLiquidityState } from "state/poolState"

export const addLiquidity = async (
	contractAddress: string,
	address: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
	const addLiquitidyInfo = getRecoil(addLiquidityState)

	const client = await getSigningCosmWasmClient()

	const { FuzioPoolMessageComposer } = contracts.FuzioPool

	const swapMessageComposer = new FuzioPoolMessageComposer(address, contractAddress)

	let funds: Coin[] = []
	const transactions: MsgExecuteContractEncodeObject[] = []

	if (!addLiquitidyInfo?.tokenB.token.isNativeCoin) {
		// const increaseAllowanceMessage = createIncreaseAllowanceMessage({
		//   senderAddress: address,
		//   tokenAmount: tokenB.amount,
		//   tokenAddress: TokenStatus[pool.liquidity.token2.denom].contractAddress!,
		//   swapAddress: pool.contractAddress
		// })
		// transactions.push(increaseAllowanceMessage)
	} else {
		funds = [
			...funds,
			{ amount: addLiquitidyInfo.tokenB.amount, denom: addLiquitidyInfo.tokenB.token.denom }
		]
	}

	if (!addLiquitidyInfo.tokenA.token.isNativeCoin) {
		// const increaseAllowanceMessage = createIncreaseAllowanceMessage({
		//   senderAddress: address,
		//   tokenAmount: tokenA.amount,
		//   tokenAddress: TokenStatus[pool.liquidity.token1.denom].contractAddress!,
		//   swapAddress: pool.contractAddress
		// })
		// transactions.push(increaseAllowanceMessage)
	} else {
		funds = [
			...funds,
			{ amount: addLiquitidyInfo.tokenA.amount, denom: addLiquitidyInfo.tokenA.token.denom }
		]
	}

	const addLiquidityMessage = swapMessageComposer.addLiquidity(
		{
			maxToken2: addLiquitidyInfo?.tokenB.amount,
			minLiquidity: "0",
			token1Amount: addLiquitidyInfo?.tokenA.amount
		},
		funds
	)

	transactions.push(addLiquidityMessage)

	return simulateTransaction(await client.signAndBroadcast(address, transactions, "auto"))
}
