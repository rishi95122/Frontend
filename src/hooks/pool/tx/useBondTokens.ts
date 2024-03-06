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
import { bondTokens } from "utils/pool/bondTokens"

export const useBondTokens = ({
	bondAmount,
	stakingAddress
}: {
	bondAmount: BigNumber
	stakingAddress: string
}) => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const toastId = useRef<Id>()

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	return useMutation(
		["bondTokens"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(
				DefaultToast({
					isPromise: true,
					toastText: "Bonding..."
				}),
				{
					autoClose: false,
					type: "default"
				}
			)

			return await bondTokens(
				address!,
				pool?.pool!,
				getSigningCosmWasmClient,
				bondAmount,
				stakingAddress
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
					render: SuccessToast({ data, txType: "Bonding" }),
					type: "success"
				})
				amplitude.track("Bond Liquidity", {
					bond_address: stakingAddress,
					bond_amount: bondAmount,
					pool_id: pool?.pool.poolId,
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
