import { type MsgTransfer } from "@sei-js/proto/types/codegen/ibc/applications/transfer/v1/tx"
import { initialNeutronToken } from "@utils/tokens/helpers"
import { type Token } from "@utils/tokens/tokens"
import Long from "long"
import { type ReactElement } from "react"
import { atom } from "recoil"

export const showUIState = atom<boolean>({
	default: false,
	key: "showUI"
})

export const activeIndexState = atom<number>({
	default: -1,
	key: "activeIndex"
})

export const marketAdvancedModeState = atom<boolean>({
	default: false,
	key: "marketAdvancedMode"
})

export const activeRouteState = atom<
	Record<string, { icon: ReactElement; url: string }> | undefined
>({
	default: undefined,
	key: "activeRoute"
})

export const externalChainState = atom<string>({
	default: "",
	key: "externalChain"
})

export const externalTokenState = atom<Token | undefined>({
	default: undefined,
	key: "externalToken"
})

export const externalChainInfoState = atom<MsgTransfer>({
	default: {
		receiver: "",
		sender: "",
		sourceChannel: "",
		sourcePort: "transfer",
		timeoutHeight: { revisionHeight: Long.fromNumber(0), revisionNumber: Long.fromNumber(4) },
		timeoutTimestamp: Long.fromNumber(0),
		token: { amount: "0", denom: "uatom" }
	},
	key: "externalChainInfo"
})

export const neutronTokenState = atom<Token>({
	default: initialNeutronToken,
	key: "neutronToken"
})

export const showZeroBalanceAssetsState = atom<boolean>({
	default: true,
	key: "showZeroBalanceAssets"
})

export const showZeroBalanceTokensState = atom<boolean>({
	default: true,
	key: "showZeroBalanceTokens"
})

export const showLowLiqPoolsState = atom<boolean>({
	default: true,
	key: "showLowLiqPools"
})

export const kadoModalState = atom<boolean>({
	default: false,
	key: "kadoModal"
})

export const idoStepperState = atom<number>({
	default: 1,
	key: "idoStepper"
})

export const pieDataState = atom<
	Array<{
		color: string
		id: string
		label: string
		value: number
	}>
>({
	default: undefined,
	key: "pieData"
})
