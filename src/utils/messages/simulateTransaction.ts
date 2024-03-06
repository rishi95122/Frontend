import { type DeliverTxResponse } from "@cosmjs/stargate"
import { isDeliverTxFailure } from "@cosmjs/stargate"

export const simulateTransaction = (result: DeliverTxResponse) => {
	if (isDeliverTxFailure(result)) {
		throw new Error(
			`Error ${result.code} while broadcasting transaction: ${result.transactionHash} at height ${result.height}`
		)
	}

	return result
}
