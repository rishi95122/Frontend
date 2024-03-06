import { type Wallet } from "../components/types"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { SimpleDisplayWalletList } from "../components/ui/WalletList"
import { useBreakpoint } from "@chakra-ui/react"
import { type ChainWalletBase, type WalletListViewProps } from "@cosmos-kit/core"
import { useCallback, useMemo } from "react"

export const WalletListView = ({ onClose, wallets }: WalletListViewProps) => {
	const breakpoint = useBreakpoint({ ssr: false })

	const onWalletClicked = useCallback((wallet: ChainWalletBase) => {
		void wallet.connect(true)
		// // eslint-disable-next-line promise/prefer-await-to-then
		// .then(() => {
		// 	onClose()
		// })
		// // eslint-disable-next-line promise/prefer-await-to-then
		// .catch(() => {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const modalHead = (
		<SimpleModalHead backButton={false} onClose={onClose} title="Welcome to Electron" />
	)

	const walletsData = useMemo(() => {
		if (breakpoint === "base" || breakpoint === "sm") {
			return wallets
				.filter((wallet) => wallet.walletInfo.mode === "wallet-connect")
				.map((currentWallet) => {
					return {
						...currentWallet.walletInfo,
						buttonShape: "Square",
						downloads: undefined,
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick: async () => {
							onWalletClicked(currentWallet)
						},
						subLogo:
							currentWallet.walletInfo.mode === "wallet-connect"
								? "https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg"
								: undefined
					} as Wallet
				})
		} else {
			return wallets
				.sort((a, b) => {
					if (a.walletInfo.mode === b.walletInfo.mode) {
						return 0
						// eslint-disable-next-line no-negated-condition
					} else if (a.walletInfo.mode !== "wallet-connect") {
						return -1
					} else {
						return 1
					}
				})
				.map((currentWallet) => {
					return {
						...currentWallet.walletInfo,
						buttonShape: "Square",
						downloads: undefined,
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick: async () => {
							onWalletClicked(currentWallet)
						},
						subLogo:
							currentWallet.walletInfo.mode === "wallet-connect"
								? "https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg"
								: undefined
					} as Wallet
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallets, breakpoint])

	const modalContent = (
		<SimpleDisplayWalletList
			walletsData={walletsData}
			// @ts-expect-error types
			initialFocus={undefined}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
