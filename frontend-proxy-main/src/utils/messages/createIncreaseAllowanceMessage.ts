import { type MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate"
import { toUtf8 } from "@cosmjs/encoding"
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx"

type CreateIncreaseAllowanceMessageArgs = {
	senderAddress: string
	swapAddress: string
	tokenAddress: string
	tokenAmount: string
}

export const createIncreaseAllowanceMessage = ({
	senderAddress,
	tokenAmount,
	tokenAddress,
	swapAddress
}: CreateIncreaseAllowanceMessageArgs): MsgExecuteContractEncodeObject => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const increaseAllowanceMessage: any = {
		increase_allowance: {
			amount: `${tokenAmount}`,
			spender: `${swapAddress}`
		}
	}

	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
		value: MsgExecuteContract.fromPartial({
			contract: tokenAddress,
			funds: [],
			msg: toUtf8(JSON.stringify(increaseAllowanceMessage)),
			sender: senderAddress
		})
	}
}
