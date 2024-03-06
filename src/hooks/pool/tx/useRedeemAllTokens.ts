import { useRedeemHistory } from "../query/useRedeemHistory"
import * as amplitude from "@amplitude/analytics-browser"
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
import { redeemTokens } from "utils/pool/redeemTokens"
import { type TPool } from "utils/tokens/pools"

export const useRedeemAllTokens = ({ pool }: { pool: TPool }) => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const toastId = useRef<Id>()

	const [redeemHistory] = useRedeemHistory({
		limit: 100,
		pool,
		startAfter: 0
	})

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	return useMutation(
		["redeemTokens"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(
				DefaultToast({
					isPromise: true,
					toastText: "Redeeming..."
				}),
				{
					autoClose: false,
					type: "default"
				}
			)

			const stakingAddresses = redeemHistory?.unbondingInfo
				.filter((unbonding) => unbonding.unbonding_info.amount !== "0" && unbonding.canUnbond)
				.map((redeemableUnbonding) => redeemableUnbonding.stakingAddress)

			return await redeemTokens(address!, getSigningCosmWasmClient, stakingAddresses!)
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
					render: SuccessToast({ data, txType: "Redeeming" }),
					type: "success"
				})
				amplitude.track("Redeem All Unbondings", {
					bond_addresses: redeemHistory?.unbondingInfo
						.filter((unbonding) => unbonding.unbonding_info.amount !== "0" && unbonding.canUnbond)
						.map((redeemableUnbonding) => redeemableUnbonding.stakingAddress),
					wallet_address: address
				})
				void refetchQueries()
			}
			//   onSettled() {
			//     setTransactionState(TransactionStatus.IDLE)
			//   }
		}
	)
}
