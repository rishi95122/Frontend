import { WalletStatus } from "@cosmos-kit/core"
import { useChain } from "@cosmos-kit/react"
import { useMutation } from "@tanstack/react-query"
import { handleTxError } from "@utils/handleTxError"
import DefaultToast from "components/Toasts/DefaultToast"
import SuccessToast from "components/Toasts/SuccessToast"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import { useRef } from "react"
import { type Id } from "react-toastify"
import { toast } from "react-toastify"
import { createBet } from "utils/games/createBet"

export const useCreateBet = (betType: "bear" | "bull", roundId: string, amount: string) => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	const toastId = useRef<Id>()

	return useMutation(
		["predictionBet"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Betting..." }), {
				autoClose: false,
				type: "default"
			})

			// va.track("Token Swap", {
			//   address: address!,
			//   from: from.token,
			//   to: to.token,
			//   fromAmount: from.amount,
			//   wallet: wallet?.name!
			// })

			return await createBet(address!, betType, roundId, amount, getSigningCosmWasmClient)
		},
		{
			onError(error) {
				handleTxError({ error, toastId })
			},
			onSuccess(data) {
				toast.update(toastId.current!, {
					autoClose: 5_000,
					progressStyle: {
						background: "rgba(2, 226, 150, 1)",
						boxShadow: "var(--chakra-shadows-md)",
						height: "0.6rem"
					},
					render: SuccessToast({ data, txType: "Bet" }),
					type: "success"
				})

				void refetchQueries()
			}
			//   onSettled() {
			//     setTransactionState(TransactionStatus.IDLE)
			//   }
		}
	)
}
