import { type BigNumber } from "bignumber.js"

export type Token = {
	bridgeHash?: string
	bridgeURI?: string
	chain?: {
		chainId: string
		chainName: string
		chainPrettyName: string
		gasPrice?: {
			amount: string
			denom: string
		}
		grpc?: string[]
		ibcChannels?: {
			deposit_channel: string
			port_id: string
			withdraw_channel: string
		}
		isEVM: boolean
		localDenom: string
		rest?: string[]
		rpc?: string[]
	}
	chainHash?: string
	chainURI?: string
	decimal: number
	denom: string
	fullName: string
	isIBCCoin: boolean
	isNativeCoin: boolean
	logoHash: string
	logoURI: string
	symbol: string
	tokenPrettyName: string
}

export type TokenWithBalance = Token & {
	balance: BigNumber
}
