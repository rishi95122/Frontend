import { useUnbondedLiquidity } from "../query/useUnbondedLiquidity"
import * as amplitude from "@amplitude/analytics-browser"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain } from "@cosmos-kit/react"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { useMutation } from "@tanstack/react-query"
import { handleTxError } from "@utils/handleTxError"
import { type BigNumber } from "bignumber.js"
import DefaultToast from "components/Toasts/DefaultToast"
import SuccessToast from "components/Toasts/SuccessToast"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { type Id } from "react-toastify"
import { toast } from "react-toastify"
import { removeLiquidity } from "utils/pool/removeLiquidity"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"

export const useRemoveLiquidity = ({ removeAmount }: { removeAmount: BigNumber }) => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const [unbondedLiquidity] = useUnbondedLiquidity({
		pool: pool?.pool!
	})

	const toastId = useRef<Id>()

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	return useMutation(
		["removeLiquidity"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Removing..." }), {
				autoClose: false,
				type: "default"
			})

			return await removeLiquidity(
				pool?.pool.swapAddress!,
				address!,
				pool?.pool!,
				getSigningCosmWasmClient,
				convertMicroDenomToDenom(unbondedLiquidity, 6),
				removeAmount
			)
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
					render: SuccessToast({ data, txType: "Removal" }),
					type: "success"
				})
				amplitude.track("Remove Liquidity", {
					liq_remove_amount: removeAmount,
					pool_address: pool?.pool.swapAddress,
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
