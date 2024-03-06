import { ConnectWalletButton } from "../components/buttons/ConnectWalletButton"
import { CopyAddressButton } from "../components/buttons/CopyAddressButton"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { Icon } from "@chakra-ui/react"
import { type WalletViewProps } from "@cosmos-kit/core"
import { useCallback } from "react"
import { FaReply } from "react-icons/fa"

export const ConnectedView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName, logo },
		username,
		address
	} = wallet

	const onDisconnect = useCallback(async () => await wallet.disconnect(true), [wallet])

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleDisplayModalContent
			addressButton={<CopyAddressButton address={address} />}
			bottomButton={
				<ConnectWalletButton
					buttonText="Disconnect"
					leftIcon={<Icon as={FaReply} />}
					onClick={onDisconnect}
				/>
			}
			username={username}
			walletIcon={logo}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
