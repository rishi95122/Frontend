import { ConnectWalletButton } from "../components/buttons/ConnectWalletButton"
import { LogoStatus } from "../components/types"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { type WalletViewProps } from "@cosmos-kit/core"

export const ErrorView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName, logo },
		message
	} = wallet

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleDisplayModalContent
			bottomButton={<ConnectWalletButton buttonText="Change Wallet" onClick={onReturn} />}
			contentDesc={message}
			contentHeader="Oops! Something wrong..."
			logo={logo}
			status={LogoStatus.Error}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
