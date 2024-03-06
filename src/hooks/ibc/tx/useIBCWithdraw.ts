import { useChain } from "@cosmos-kit/react"
import { externalChainInfoState, externalTokenState } from "@state/UIState"
import { useMutation } from "@tanstack/react-query"
import { handleTxError } from "@utils/handleTxError"
import DefaultToast from "components/Toasts/DefaultToast"
import SuccessToast from "components/Toasts/SuccessToast"
import dayjs from "dayjs"
import { useRefetchQueries } from "hooks/useRefetchQueries"
import Long from "long"
import { useRef } from "react"
import { type Id } from "react-toastify"
import { toast } from "react-toastify"
import { useRecoilState, useRecoilValue } from "recoil"
import { ibcTransfer } from "utils/ibc/ibcTransfer"

export const useIBCWithdraw = () => {
	const { address, isWalletConnected, getSigningStargateClient, getOfflineSignerDirect, chain } =
		useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const externalToken = useRecoilValue(externalTokenState)

	const [, setExternalChainInfo] = useRecoilState(externalChainInfoState)

	const toastId = useRef<Id>()

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	return useMutation(
		["ibcWithdraw"],
		async () => {
			if (!isWalletConnected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Withdrawing..." }), {
				autoClose: false,
				type: "default"
			})

			const client = await getSigningStargateClient()
			const height = await client.getHeight()

			setExternalChainInfo((previous) => {
				return {
					...previous,
					sourceChannel: externalToken?.chain?.ibcChannels?.deposit_channel!,
					sourcePort: externalToken?.chain?.ibcChannels?.port_id!,
					timeoutHeight: {
						revisionHeight: Long.fromNumber(height + 500),
						revisionNumber: Long.fromNumber(4)
					},
					timeoutTimestamp: Long.fromNumber(dayjs().add(10, "minutes").unix() * 1_000_000_000),
					token: {
						...previous.token!,
						denom: externalToken?.denom!
					}
				}
			})

			return await ibcTransfer(
				address!,
				getSigningStargateClient,
				chain.chain_id,
				getOfflineSignerDirect()
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
					render: SuccessToast({ data, txType: "Withdraw" }),
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
