const getErrorTitle = (errorMessage: string, errorCode?: number): string => {
	const errorDesc: string = errorMessage.split("desc =")[1]

	if (errorCode) {
		switch (errorCode) {
			case 3:
				return "Invalid Sequence"
			case 6:
				if (errorDesc.includes("insufficient funds")) {
					return "Insufficient Funds"
				} else if (errorDesc.includes("Overflow")) {
					return "Insufficient Funds"
				} else if (errorDesc.includes("max_token")) {
					return "Wrong Token Ratio"
				} else if (errorDesc.includes("invalid coins")) {
					return "Invalid Token Amount"
				} else if (errorDesc.includes("Invalid zero amount")) {
					return "Invalid Token Ratio"
				} else if (errorDesc.includes("account sequence")) {
					return "Transaction Pending"
				} else if (errorDesc.includes("already bet")) {
					return "Bet Already Placed"
				} else {
					return "Unknown Error"
				}

			case 11:
				return "Out Of Gas"
			case 32:
				return "Transaction Pending"
			default:
				return "Unknown Error"
		}
	} else {
		return "Transaction Rejected"
	}
}

export default getErrorTitle
