const getErrorMessage = (errorMessage: string, errorCode?: number): string => {
	if (errorCode) {
		switch (errorCode) {
			case 3:
				return "Another transaction is still pending"
			case 6:
				// eslint-disable-next-line no-case-declarations
				const errorDesc: string = errorMessage.split("desc =")[1]
				if (errorDesc.includes("insufficient funds")) {
					return "Get more tokens and try again."
				} else if (errorDesc.includes("Overflow")) {
					return "Get more tokens and try again."
				} else if (errorDesc.includes("max_token")) {
					return "Use more tokens to add to liquidity."
				} else if (errorDesc.includes("invalid coins")) {
					return "Increase token amount"
				} else if (errorDesc.includes("Invalid zero amount")) {
					return "Use more tokens to add to liquidity"
				} else if (errorDesc.includes("account sequence")) {
					return "Please wait a few seconds and try again."
				} else if (errorDesc.includes("already bet")) {
					return "You can bet only once per round."
				} else {
					return "An unknown error occurred."
				}

			case 11:
				return "Please choose a higher gas option."
			case 32:
				return "Please wait a few seconds and try again."
			default:
				return "An unknown error occurred."
		}
	} else {
		return "You rejected this transaction."
	}
}

export default getErrorMessage
