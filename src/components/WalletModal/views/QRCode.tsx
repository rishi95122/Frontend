import { QRCodeStatus } from "../components"
import { SimpleModalHead } from "../components/ui/ModalHead"
import { SimpleModalView } from "../components/ui/ModalView"
import { QRCode as SimpleQRCode } from "../components/ui/QRCode"
import { type WalletViewProps } from "@cosmos-kit/core"
import { ExpiredError, State } from "@cosmos-kit/core"
import { useCallback, useMemo } from "react"

export const QRCodeView = ({ onClose, onReturn, wallet }: WalletViewProps) => {
	const {
		walletInfo: { prettyName },
		qrUrl: { data, state, message }
	} = wallet

	const [desc, errorTitle, errorDesc, status] = useMemo(() => {
		let currentDesc = `Open your ${prettyName} App and scan this QR code to connect!`
		let currentErrorTitle = ""
		let currentErrorDesc = ""
		if (state === "Error") {
			// @ts-expect-error types
			currentDesc = undefined
			if (message === ExpiredError.message) {
				currentErrorTitle = "QRCode Expired"
				currentErrorDesc = "Click to refresh."
			} else {
				currentErrorTitle = "QRCode Error"
				currentErrorDesc = message!
			}
		}

		let currentStatus: QRCodeStatus
		switch (state) {
			case State.Pending:
				currentStatus = QRCodeStatus.Pending
				break
			case State.Done:
				currentStatus = QRCodeStatus.Done
				break
			case State.Error:
				if (message === ExpiredError.message) {
					currentStatus = QRCodeStatus.Expired
				} else {
					currentStatus = QRCodeStatus.Error
				}

				break
			case State.Init:
				currentStatus = QRCodeStatus.Pending
				onClose()
				break
			default:
				throw new Error(`No corresponding QRCodeStatus for State ${state}.`)
		}

		return [currentDesc, currentErrorTitle, currentErrorDesc, currentStatus]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, message])

	const onRefresh = useCallback(() => {
		void wallet.connect(false)
	}, [wallet])

	const modalHead = (
		<SimpleModalHead backButton onBack={onReturn} onClose={onClose} title={prettyName} />
	)

	const modalContent = (
		<SimpleQRCode
			description={desc}
			errorDesc={errorDesc}
			errorTitle={errorTitle}
			link={data ?? ""}
			onRefresh={onRefresh}
			status={status}
		/>
	)

	return <SimpleModalView modalContent={modalContent} modalHead={modalHead} />
}
