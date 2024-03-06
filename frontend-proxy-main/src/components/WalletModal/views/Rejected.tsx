import { ConnectWalletButton, LogoStatus } from "../components"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { type WalletViewProps } from "@cosmos-kit/core"
import { ReloadIcon } from "components/Assets/ReloadIcon"
import { useCallback } from "react"

export const RejectedView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName, logo }
	} = wallet

	const onReconnect = useCallback(() => {
		void wallet.connect(false)
	}, [wallet])

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleDisplayModalContent
			bottomButton={
				<ConnectWalletButton
					buttonText="Reconnect"
					leftIcon={<ReloadIcon h="2rem" w="2rem" />}
					onClick={onReconnect}
				/>
			}
			contentDesc={wallet.rejectMessageTarget || "Connection permission was denied."}
			contentHeader="Request Rejected"
			logo={logo}
			status={LogoStatus.Error}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
