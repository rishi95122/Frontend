import { SimpleConnectModal } from "./components/ui/ConnectModal"
import {
	type ModalViews,
	type WalletListViewProps,
	type WalletModalProps,
	type WalletViewProps
} from "@cosmos-kit/core"
import { ModalView, State, WalletStatus } from "@cosmos-kit/core"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export const WalletModal = ({
	isOpen,
	setOpen,
	walletRepo,
	modalViews
}: WalletModalProps & { modalViews: ModalViews }) => {
	const initialFocus = useRef()
	const [currentView, setCurrentView] = useState<ModalView>(ModalView.WalletList)
	const [qrState, setQRState] = useState<State>(State.Init)
	const [qrMessage, setQRMessage] = useState<string>("")

	const current = walletRepo?.current
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	;(current?.client as any)?.setActions?.({
		qrUrl: {
			message: setQRMessage,
			state: setQRState
		}
	})
	const walletStatus = current?.walletStatus

	useEffect(() => {
		if (isOpen) {
			switch (walletStatus) {
				case WalletStatus.Connecting:
					if (qrState === State.Init) {
						setCurrentView(ModalView.Connecting)
					} else {
						setCurrentView(ModalView.QRCode)
					}

					break
				case WalletStatus.Connected:
					setCurrentView(ModalView.Connected)
					break
				case WalletStatus.Error:
					if (qrState === State.Init) {
						setCurrentView(ModalView.Error)
					} else {
						setCurrentView(ModalView.QRCode)
					}

					break
				case WalletStatus.Rejected:
					setCurrentView(ModalView.Rejected)
					break
				case WalletStatus.NotExist:
					setCurrentView(ModalView.NotExist)
					break
				case WalletStatus.Disconnected:
					setCurrentView(ModalView.WalletList)
					break
				default:
					setCurrentView(ModalView.WalletList)
					break
			}
		}
	}, [isOpen, qrState, walletStatus, qrMessage])

	const onCloseModal = useCallback(() => {
		setOpen(false)
		if (walletStatus === "Connecting") {
			void current?.disconnect()
		}
	}, [setOpen, walletStatus, current])

	const onReturn = useCallback(() => {
		setCurrentView(ModalView.WalletList)
	}, [setCurrentView])

	const modalView = useMemo(() => {
		let ViewComponent

		switch (currentView) {
			case ModalView.WalletList:
				ViewComponent = modalViews[`${currentView}`] as (props: WalletListViewProps) => JSX.Element
				return <ViewComponent onClose={onCloseModal} wallets={walletRepo?.wallets ?? []} />
			default:
				if (!current) return <div />
				ViewComponent = modalViews[`${currentView}`] as (props: WalletViewProps) => JSX.Element
				return <ViewComponent onClose={onCloseModal} onReturn={onReturn} wallet={current} />
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentView, onReturn, onCloseModal, current, qrState, walletStatus, walletRepo])

	return (
		<SimpleConnectModal
			modalOnClose={onCloseModal}
			modalOpen={isOpen}
			modalView={modalView}
			// @ts-expect-error types
			initialRef={initialFocus}
		/>
	)
}
