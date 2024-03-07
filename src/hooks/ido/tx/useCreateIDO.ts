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
import { createIDO } from "utils/ido/createIDO"

export const useCreateIDO = () => {
	const { getSigningCosmWasmClient, address, status } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const refetchQueries = useRefetchQueries(["tokenBalance"])

	const toastId = useRef<Id>()

	return useMutation(
		["createIDO"],
		async () => {
			if (status !== WalletStatus.Connected) {
				throw new Error("Please connect your wallet.")
			}

			toastId.current = toast(DefaultToast({ isPromise: true, toastText: "Creating IDO..." }), {
				autoClose: false,
				type: "default"
			})

			const claimStart = Number.parseInt(Number(1_684_959_900).toString(), 10)
			const saleStart = Number.parseInt(Number(1_684_909_900).toString(), 10)

			return await createIDO(
				address!,
				true,
				claimStart,
				saleStart,
				"100",
				120,
				3_600,
				{ amount: "100", denom: "untrn" },
				"factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE",
				{
					problem: {
						desc: "Test Test Test Lorem Ipsum unknown has no problems",
						header: "DeFi is too fragmented"
					},
					product: {
						banner_images: [
							"https://raw.githubusercontent.com/Electron-Protocol/Branding/main/ido_banner.png"
						],
						full_name: "Electron Network",
						header: "Welcome to Electron",
						highlights: [
							"Electron is the premier fully permissionless decentralized exchange, on Neutron."
						],
						logo: "https://raw.githubusercontent.com/Electron-Protocol/Branding/main/logo.svg",
						long_desc:
							"In the vibrant digital landscape of the Electron Project on Neutron Network, a captivating motto resonates with a spirit of adventure and boundless possibilities: This powerful mantra embodies the essence of this innovative platform, inviting users to embark on an exciting journey of discovery, collaboration, and creativity.",
						short_desc: "Welcome to Electron",
						token_symbol: "ELECTRON"
					},
					solution: {
						desc: "TESTTESTETSTETSTETSTETTEETSTTS",
						header: "Electron is the solution for it all"
					},
					team: {
						header: "Meet the Team",
						members: [
							{
								member_desc: "lead developer of Electron",
								member_name: "Dizz0",
								member_role: "CTO"
							},
							{
								member_desc: "smart contract developer of Electron",
								member_name: "Dizz0",
								member_role: "Contracts"
							}
						]
					}
				},
				getSigningCosmWasmClient
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
					render: SuccessToast({ data, txType: "IDO Creation" }),
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
