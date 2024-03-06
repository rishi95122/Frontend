import { LogoStatus } from "../components/types"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { type WalletViewProps } from "@cosmos-kit/core"

export const ConnectingView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName, logo, mode },
		message
	} = wallet

	let title = "Requesting Connection"
	let desc: string =
		mode === "wallet-connect"
			? `Approve ${prettyName} connection request on your mobile.`
			: `Open the ${prettyName} browser extension to connect your wallet.`

	if (message === "InitClient") {
		title = "Initializing Wallet Client"
		desc = ""
	}

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleDisplayModalContent
			contentDesc={desc}
			contentHeader={title}
			logo={logo}
			status={LogoStatus.Loading}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
