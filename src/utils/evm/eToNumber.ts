/* eslint-disable  */

// @ts-nocheck

/** ****************************************************************
 * Converts e-Notation Numbers to Plain Numbers
 ******************************************************************
 * @function eToNumber(number)
 * @version  1.00
 * @param   {e nottation Number} valid Number in exponent format.
 *          pass number as a string for very large 'e' numbers or with large fractions
 *          (none 'e' number returned as is).
 * @return  {string}  a decimal number string.
 * @author  Mohsen Alyafei
 * @date    17 Jan 2020
 *
 *****************************************************************/
export function eToNumber(number_) {
	let sign = ""
	;(number_ = String(number_)).startsWith("-") && ((number_ = number_.slice(1)), (sign = "-"))
	const array = number_.split(/e/gi)
	if (array.length < 2) return sign + number_
	const dot = (0.1).toLocaleString().slice(1, 2)
	let n = array[0]
	const exp = Number(array[1])
	let w = (n = n.replace(/^0+/, "")).replace(dot, "")
	const pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp
	let L = pos - w.length
	const s = String(BigInt(w))
	w =
		exp >= 0
			? L >= 0
				? s + "0".repeat(L)
				: r()
			: pos <= 0
			? "0" + dot + "0".repeat(Math.abs(pos)) + s
			: r()
	L = w.split(dot)
	if ((L[0] == 0 && L[1] == 0) || (Number(w) == 0 && Number(s) == 0)) w = 0 //* * added 9/10/2021
	return sign + w
	function r() {
		return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`)
	}
}
