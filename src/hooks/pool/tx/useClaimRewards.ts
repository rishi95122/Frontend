import * as amplitude from "@amplitude/analytics-browser"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain } from "@cosmos-kit/react"
import { useMutation } from "@tanstack/react-query"
import { handleTxError } from "@utils/handleTxError"
import DefaultToast from "components/Toasts/DefaultToast"
import SuccessToast from "components/Toasts/SuccessToast"
import { useRef } from "react"
import { type Id } from "react-toastify"
import { toast } from "react-toastify"
import { claimRewards } from "utils/pool/claimRewards"
import { type TPool } from "utils/tokens/pools"

export const useClaimRewards = ({ pool }: { pool: TPool }) => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const toastId = useRef<Id>()

	return useMutation(
		["claimRewards"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Claiming..." }), {
				autoClose: false,
				type: "default"
			})

			return await claimRewards(address!, getSigningCosmWasmClient, pool)
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
					render: SuccessToast({ data, txType: "Claiming" }),
					type: "success"
				})
				amplitude.track("Claim Pool Rewards", {
					pool_id: pool.poolId,
					wallet_address: address
				})
				// refetchQueries()
			}
			//   onSettled() {
			//     setTransactionState(TransactionStatus.IDLE)
			//   }
		}
	)
}
