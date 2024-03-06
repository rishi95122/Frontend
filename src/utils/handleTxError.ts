import getErrorMessage from "./ui/getErrorMessage"
import getErrorTitle from "./ui/getErrorTitle"
import ErrorToast from "@components/Toasts/ErrorToast"
import { type MutableRefObject } from "react"
import { type Id, toast } from "react-toastify"

export const handleTxError = ({
	toastId,
	error
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: unknown
	toastId: MutableRefObject<Id | undefined>
}) => {
	// eslint-disable-next-line require-unicode-regexp
	const regex = /\d+/g
	// @ts-expect-error is allowed to be null
	// eslint-disable-next-line no-negated-condition
	if (!error.message.includes("does not exist")) {
		// @ts-expect-error is allowed to be null
		if (regex.test(error.message)) {
			toast.update(toastId.current!, {
				autoClose: 5_000,
				progressStyle: {
					background: "#CF4040",
					boxShadow: "var(--chakra-shadows-md)",
					height: "0.6rem"
				},
				render: ErrorToast({
					errorMessage: getErrorMessage(
						// @ts-expect-error is allowed to be null
						error.message,
						// @ts-expect-error is allowed to be null
						Number(error.message.match(regex)[0])
					),

					errorTitle: getErrorTitle(
						// @ts-expect-error is allowed to be null
						error.message,
						// @ts-expect-error is allowed to be null
						Number(error.message.match(regex)[0])
					)
				}),
				type: "error"
			})
		} else {
			toast.update(toastId.current!, {
				autoClose: 5_000,
				progressStyle: {
					background: "#CF4040",
					boxShadow: "var(--chakra-shadows-md)",
					height: "0.6rem"
				},
				render: ErrorToast({
					errorMessage: getErrorMessage("", undefined),
					// @ts-expect-error is allowed to be null
					errorTitle: getErrorTitle(error.message, undefined)
				}),
				type: "error"
			})
		}
	} else {
		toast.update(toastId.current!, {
			autoClose: 5_000,
			progressStyle: {
				background: "#CF4040",
				boxShadow: "var(--chakra-shadows-md)",
				height: "0.6rem"
			},
			render: ErrorToast({
				errorMessage: "Transfer any token here to initialize first.",
				errorTitle: "Account doesn't exist"
			}),
			type: "error"
		})
	}
}
