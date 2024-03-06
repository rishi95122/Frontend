import { LogoStatus } from "../components"
import { InstallWalletButton } from "../components/buttons/InstallWalletButton"
import { SimpleDisplayModalContent } from "../components/ui/ModalContent"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { type WalletViewProps } from "@cosmos-kit/core"
import React, { useCallback } from "react"
import { GoDesktopDownload } from "react-icons/go"

export const NotExistView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName, logo },
		downloadInfo
	} = wallet

	const onInstall = useCallback(() => {
		if (downloadInfo?.link) {
			window.open(downloadInfo?.link, "_blank")
		}
	}, [downloadInfo])

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleDisplayModalContent
			bottomButton={
				<InstallWalletButton
					buttonText={`Install ${prettyName}`}
					disabled={Boolean(!downloadInfo)}
					icon={GoDesktopDownload}
					onClick={() => onInstall()}
				/>
			}
			contentDesc={
				// @ts-expect-error types
				onInstall
					? `If ${prettyName} is installed on your device, please refresh this page or follow the browser instructions.`
					: "Download link not provided."
			}
			contentHeader={`${prettyName} could not be found.`}
			logo={logo}
			status={LogoStatus.Error}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
