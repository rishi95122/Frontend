import { type BigNumber } from "bignumber.js"

// eslint-disable-next-line consistent-return
const shortenNumber = (number: BigNumber, digits: number): string => {
	if (!number) {
		return "0"
	}

	if (number.lt(1e3)) return number.toFixed(digits)
	if (number.gte(1e3) && number.lt(1e6)) return number.dividedBy(1e3).toFixed(digits) + "K"
	if (number.gte(1e6) && number.lt(1e9)) return number.dividedBy(1e6).toFixed(digits) + "M"
	if (number.gte(1e9) && number.lt(1e12)) return number.dividedBy(1e9).toFixed(digits) + "B"
	if (number.gte(1e12)) return number.dividedBy(1e12).toFixed(1) + "T"

	return number.toFixed(digits)
}

export default shortenNumber
