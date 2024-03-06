import { ConnectedView } from "./Connected"
import { ConnectingView } from "./Connecting"
import { ErrorView } from "./Error"
import { NotExistView } from "./NotExist"
import { QRCodeView } from "./QRCode"
import { RejectedView } from "./Rejected"
import { WalletListView } from "./WalletList"
import { type ModalViews } from "@cosmos-kit/core"

export const defaultModalViews: ModalViews = {
	Connected: ConnectedView,
	Connecting: ConnectingView,
	Error: ErrorView,
	NotExist: NotExistView,
	QRCode: QRCodeView,
	Rejected: RejectedView,
	WalletList: WalletListView
}
