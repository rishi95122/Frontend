import { usePoolList } from "../query/usePoolList"
import * as amplitude from "@amplitude/analytics-browser"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain } from "@cosmos-kit/react"
import { useMutation } from "@tanstack/react-query"
import { handleTxError } from "@utils/handleTxError"
import DefaultToast from "components/Toasts/DefaultToast"
import SuccessToast from "components/Toasts/SuccessToast"
import { useMemo, useRef } from "react"
import { type Id } from "react-toastify"
import { toast } from "react-toastify"
import { claimAllRewards } from "utils/pool/claimAllRewards"

export const useClaimAllRewards = () => {
	const { getSigningCosmWasmClient, address, status } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)
	const [poolsList] = usePoolList()

	const pools = useMemo(() => {
		return poolsList?.poolsWithAPR.map(({ pool }) => {
			return pool
		})
	}, [poolsList])

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

			return await claimAllRewards(address!, getSigningCosmWasmClient, pools!)
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
				amplitude.track("Claim All Pool Rewards", {
					pool_ids: pools?.map((pool) => {
						return pool.poolId
					}),
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
