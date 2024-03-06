import { type ActionMeta, type OnChangeValue, type OptionBase } from "chakra-react-select"
import type React from "react"
import { type MouseEventHandler, type ReactNode, type RefObject } from "react"
import { type IconType } from "react-icons"

/* ====================================================== */
/*                      default type                      */
/* ====================================================== */
export enum WalletStatus {
	Connected = "Connected",
	Connecting = "Connecting",
	Disconnected = "Disconnected",
	Error = "Error",
	NotExist = "NotExist",
	Rejected = "Rejected"
}
export enum Themes {
	Dark = "dark",
	Light = "light"
	// TestTheme = 'test-theme'
}
export type ThemeListType = {
	colorMode: string
	displayColor: string
	name: Themes
}
export type StyleDataType = {
	category: string
	componentName: string
	style: string
	theme: Array<{ themeName: Themes; themeValue: string }>
}

/* ====================================================== */
/*                  Connect Wallet Button                 */
/* ====================================================== */
export type ConnectWalletButtonType = {
	/**
	 * Text to display for button.
	 *
	 * If in need, set false to unset default string.
	 */
	buttonText?: string | false
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Button display disabled.
	 */
	disabled?: boolean
	/**
	 * Props JSX.Element to custom icon.
	 */
	leftIcon?: React.ReactNode | false
	/**
	 * Button display spinning indicator.
	 */
	loading?: boolean
	/**
	 * A function called to handle connect.
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	/**
	 * Props JSX.Element to custom icon.
	 */
	rightIcon?: React.ReactNode
	/**
	 * Can use Chakra Style Props custom button style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
}

/* ====================================================== */
/*                   Copy Address Button                  */
/* ====================================================== */
export type CopyAddressType = {
	/**
	 * Text to display for address.
	 */
	address?: string
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Button display disabled.
	 */
	disabled?: boolean
	/**
	 * Button display loading.
	 */
	loading?: boolean
	/**
	 * Set the max length of address.
	 */
	maxDisplayLength?: number
	/**
	 * Can use Chakra Style Props custom button style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
}

/* ====================================================== */
/*                  Change Chain Dropdown                 */
/* ====================================================== */
export type DataType = OptionBase & {
	/**
	 * Disabled the option.
	 */
	disabled?: boolean
	/**
	 * Icon display for option.
	 */
	icon?: {
		jpeg?: string
		png?: string
		svg?: string
	}
	/**
	 * Text to display for option.
	 */
	label: string
	/**
	 * Unique identifier for option.
	 */
	name: string
	/**
	 * Value of option.
	 */
	value: string
}

export type handleSelectChainDropdown = (
	newValue: OnChangeValue<DataType, false>,
	actionMeta: ActionMeta<DataType>
) => void

export type ChangeChainDropdownType = {
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Can custom dropdown, default:
	 * ```
	 *  {
	 *    DropdownIndicator,
	 *    IndicatorSeparator,
	 *    LoadingIndicator,
	 *    Placeholder,
	 *    Option
	 *  }
	 * ```
	 */
	customComponents?: object
	/**
	 * Data of options.
	 *
	 * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
	 */
	data: DataType[]
	/**
	 * Dropdown display disabled.
	 */
	disabled?: boolean
	/**
	 * Dropdown display loading.
	 */
	loading?: boolean
	/**
	 * A function called to handle select item.
	 *
	 * see `handleSelectChainDropdown` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L150-L153
	 */
	onChange: handleSelectChainDropdown
	/**
	 * Selected item.
	 *
	 * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
	 */
	selectedItem?: DataType
	/**
	 * Can use Chakra Style Props custom dropdown style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 *
	 * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
	 */
	styleProps?: object
}

/* ====================================================== */
/*                  Simple Connect Modal                  */
/* ====================================================== */
export enum LogoStatus {
	Error = "error",
	Loading = "loading",
	Warning = "warning"
}

export enum WalletMode {
	Extension = "extension",
	WalletConnect = "wallet-connect"
}

export enum ButtonShape {
	Rectangle = "Rectangle",
	Square = "Square"
}

export enum QRCodeStatus {
	Done = "Done",
	Error = "Error",
	Expired = "Expired",
	Pending = "Pending"
}

export type DownloadInfo = {
	browser?: string
	icon?: IconType
	link: string
	os?: string
}

export type Downloads = {
	default: string
	desktop: DownloadInfo[]
	mobile: DownloadInfo[]
	tablet: DownloadInfo[]
}

export type SimpleModalHeadType = {
	/**
	 * If is true, display the back button.
	 */
	backButton: boolean
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * A function called to handle modal content display.
	 */
	onBack?: MouseEventHandler<HTMLButtonElement>
	/**
	 * A function called to handle modal close.
	 */
	onClose: MouseEventHandler<HTMLButtonElement>
	/**
	 * Can use Chakra Style Props custom modal head style, also can use css.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
	/**
	 * Text to display for modal head.
	 */
	title: string
}

export type SimpleModalViewType = {
	modalContent: ReactNode
	modalHead: ReactNode
}

export type SimpleConnectModalType = {
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * The ref of element to receive focus when the modal opens.
	 *
	 * Props ref will set default focus on the list first button.
	 *
	 * If is undefined will set focus on close button.
	 */
	initialRef: RefObject<HTMLButtonElement>
	/**
	 * A function called to close modal.
	 */
	modalOnClose: () => void
	/**
	 * If true, the modal will be open.
	 */
	modalOpen: boolean
	/**
	 * The component of display on modal content.
	 */
	modalView: ReactNode
	/**
	 * Can use Chakra Style Props custom modal style, also can use css.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
}

export type InstallWalletButtonType = {
	/**
	 * Text to display for button.
	 */
	buttonText?: string
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Button display disabled.
	 */
	disabled: boolean
	/**
	 * Props react-icons item to a custom icon.
	 *
	 * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
	 */
	icon?: IconType
	/**
	 * A function called to handle download wallet.
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	/**
	 * Can use Chakra Style Props custom button style, also can use css.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
}

export type ConnectModalContentType = {
	/**
	 * Props the `CopyAddressButton` component.
	 */
	addressButton?: ReactNode
	/**
	 * Props the `ConnectWalletButton` component.
	 */
	bottomButton?: ReactNode
	/**
	 * Props the link component.
	 */
	bottomLink?: ReactNode
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Describe the status.
	 */
	contentDesc?: string
	/**
	 * Bold text of the header.
	 */
	contentHeader?: string
	/**
	 * Main logo on content.
	 *
	 * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
	 */
	logo?: IconType | string
	/**
	 * The border around logo.
	 *
	 * see `LogoStatus` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L221-L225
	 */
	status?: LogoStatus
	/**
	 * Can use Chakra Style Props custom modal content style, also can use css.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
	/**
	 * Connected user name.
	 */
	username?: string
	/**
	 * Connected Wallet icon.
	 */
	walletIcon?: string
}

export type QRCodeType = {
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * Describe how to connect wallet.
	 */
	description?: string
	/**
	 * The description for the QR code error.
	 */
	errorDesc?: string
	/**
	 * The title describes the QR code error.
	 */
	errorTitle?: string
	/**
	 * Link for connecting wallet from app.
	 */
	link: string
	/**
	 * A function called to handle refresh.
	 */
	onRefresh?: () => void
	/**
	 * QRCode size. Default is `230px`.
	 */
	qrCodeSize?: number
	/**
	 * The QRCode display status.
	 */
	status: QRCodeStatus
	/**
	 * Can use Chakra Style Props custom QR Code style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
}

export type QRCodeDisplayErrorType = {
	/**
	 * A function called to handle refresh.
	 */
	onRefresh: () => void
	/**
	 * QRCode size. Default is `230px`.
	 */
	qrCodeSize?: number
	/**
	 * Current theme.
	 */
	theme: string
}

export type Wallet = {
	/**
	 * List button is displaying Square or Rectangle.
	 *
	 * see `ButtonShape` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L232-L235
	 */
	buttonShape?: ButtonShape
	/**
	 * Description when rejected.
	 *
	 * see `Downloads` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L224-L249
	 */
	downloads?: Downloads
	/**
	 * Wallet icon.
	 *
	 * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
	 */
	logo?: IconType | string
	/**
	 * Disabled button when on mobile or tablet.
	 */
	mobileDisabled: boolean
	/**
	 * Connect wallet by extension or wallet-connect.
	 *
	 * see `WalletMode` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L227-L230
	 */
	mode: WalletMode
	/**
	 * Wallet name.
	 */
	name: string
	/**
	 * A function called to handle clicked button.
	 */
	onClick?: MouseEventHandler<HTMLDivElement>
	/**
	 * Display wallet name.
	 */
	prettyName?: string
	/**
	 * Description when rejected.
	 */
	rejectMessage?: string
	/**
	 * Can use Chakra Style Props custom list items(buttons) style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 *
	 * default: `SimpleDisplayWalletListItemBaseStyle(index)`
	 */
	styleProps?: object
	/**
	 * Display sub icon.
	 *
	 * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
	 */
	subLogo?: IconType | string
}

export type DisplayWalletListType = {
	/**
	 * Can add a stable class name to control CSS.
	 */
	className?: string
	/**
	 * The ref of element to receive focus when the modal opens.
	 *
	 * Props ref will set default focus on the list first button.
	 *
	 * If is undefined will set focus on close button.
	 */
	initialFocus: RefObject<HTMLButtonElement>
	/**
	 * Can use Framer Motion Props control animation.
	 *
	 * see framer-motion docs: https://www.framer.com/docs/
	 */
	shadowAnimateProps?: object
	/**
	 * Can use Chakra Style Props custom list style.
	 *
	 * Also can use css control, e.g,
	 * ```
	 *  {
	 *     '.my-button:hover &': {
	 *       color: 'green.500',
	 *     }
	 *  }
	 * ```
	 *
	 * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
	 */
	styleProps?: object
	/**
	 * Array of wallet list.
	 *
	 * see `Wallet` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L475-L543
	 */
	walletsData: Wallet[]
}
