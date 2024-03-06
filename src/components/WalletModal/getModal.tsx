import { WalletModal } from "./Modal"
import { defaultModalViews } from "./views/Config"
import { type WalletModalProps } from "@cosmos-kit/core"

export const getModal = () => {
	return ({ isOpen, setOpen, walletRepo }: WalletModalProps) => {
		return (
			<WalletModal
				isOpen={isOpen}
				modalViews={{
					...defaultModalViews
				}}
				setOpen={setOpen}
				walletRepo={walletRepo}
			/>
		)
	}
}
