import { useTokenToTokenPrice } from "../query/useTokenToTokenPrice"
import { useValidPool } from "../query/useValidPool"
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
import { useRecoilState, useRecoilValue } from "recoil"
import { slippageState, tokenSwapState } from "state/swapState"
import { tokenSwap } from "utils/swap/tokenSwap"

export const useTokenSwap = () => {
	const { getSigningCosmWasmClient, address, status } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const [{ from, to }, setTokenSwap] = useRecoilState(tokenSwapState)

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	const toastId = useRef<Id>()

	const validPool = useValidPool(from.token.denom, to.token.denom)
	const [tokenToTokenPrice] = useTokenToTokenPrice()

	const slippage = useRecoilValue(slippageState)
	const minToken = Math.floor(Number(tokenToTokenPrice.price) * (1 - slippage))

	return useMutation(
		["swapTokens"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Swapping..." }), {
				autoClose: false,
				type: "default"
			})

			return await tokenSwap(validPool, address!, tokenToTokenPrice.price, getSigningCosmWasmClient)
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
					render: SuccessToast({ data, txType: "Swap" }),
					type: "success"
				})
				setTokenSwap({
					from: {
						...from,
						amount: "0"
					},
					to
				})
				amplitude.track("Swap", {
					pool_address: validPool?.pool.swapAddress,
					swap_in_amount: from.amount,
					swap_out_amount: minToken.toString(),
					swap_token1: from.token,
					swap_token2: to.token,
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
