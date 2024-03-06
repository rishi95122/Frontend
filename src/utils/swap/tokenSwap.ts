import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { coins } from "@cosmjs/stargate"
import { contracts } from "@fuzio/contracts"
import { getRecoil } from "recoil-nexus"
import { slippageState, tokenSwapState } from "state/swapState"
import { type TValidPair } from "utils/tokens/pools"

export const tokenSwap = async (
	validPool: TValidPair | undefined,
	address: string,
	price: string,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
	const tokenSwapInfo = getRecoil(tokenSwapState)
	const slippage = getRecoil(slippageState)
	const minToken = Math.floor(Number(price) * (1 - slippage))
	const funds = coins(tokenSwapInfo?.from.amount!, tokenSwapInfo?.from.token.denom!)

	const client = await getSigningCosmWasmClient()

	const { FuzioPoolMessageComposer } = contracts.FuzioPool

	const swapMessageComposer = new FuzioPoolMessageComposer(
		address,
		validPool?.pool.swapAddress ?? ""
	)

	const firstPool = validPool?.subPools?.[0]
	const secondPool = validPool?.subPools?.[1]

	const swapMessage = validPool?.subPools
		? swapMessageComposer.passThroughSwap(
				{
					inputToken: firstPool?.reverse ? "token2" : "token1",
					inputTokenAmount: tokenSwapInfo?.from.amount!,
					outputAmmAddress: secondPool?.pool.swapAddress ?? "",
					outputMinToken: minToken.toString()
				},
				funds
		  )
		: swapMessageComposer.swap(
				{
					inputAmount: tokenSwapInfo?.from.amount!,
					inputToken: validPool?.reverse ? "token2" : "token1",
					minOutput: minToken.toString()
				},
				funds
		  )

	// if (
	//   !TokenStatus[from.token!].isNativeCoin &&
	//   !TokenStatus[from.token!].isIBCCoin
	// ) {
	//   // const increaseAllowanceMessage = createIncreaseAllowanceMessage({
	//   //   senderAddress: address,
	//   //   tokenAmount: from.amount,
	//   //   tokenAddress: TokenStatus[from.token!].contractAddress!,
	//   //   swapAddress: validPool?.pool.contractAddress!
	//   // })
	//   // const executeMessage = createExecuteMessage({
	//   //   senderAddress: address,
	//   //   contractAddress: validPool?.pool.contractAddress!,
	//   //   message: swapMsg
	//   // })
	//   // return simulateTransaction(
	//   //   await client.signAndBroadcast(address, [swapMsg], "auto")
	//   // )
	// } else {
	//   funds = coins(
	//     from.amount,
	//     from.token!
	//     // ChainConfigs[TokenStatus[swapInfo.from.token].chain]["microDenom"]
	//   )
	// }

	// return await client.execute(
	//   address,
	//   validPool?.pool.contractAddress!,
	//   swapMsg,
	//   "auto",
	//   undefined,
	//   funds
	// )

	return await client.signAndBroadcast(address, [swapMessage], "auto", "Electron | Swap")
}
