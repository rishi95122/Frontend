import { type Token } from "./tokens"
import { type TSwapInfo } from "@utils/swap"
import { BigNumber } from "bignumber.js"

export const convertMicroDenomToDenom = (
	value: BigNumber | number | string,
	decimals: number
): BigNumber => {
	if (decimals === 0) return BigNumber(value)
	const bnValue = BigNumber(value)
	return bnValue.dividedBy(BigNumber(10).pow(decimals))
}

export const convertDenomToMicroDenom = (
	value: BigNumber | number | string,
	decimals: number
): BigNumber => {
	if (decimals === 0) return BigNumber(value)
	const bnValue = BigNumber(value)
	return bnValue.multipliedBy(BigNumber(10).pow(decimals))
}

export const initialNeutronToken: Token = {
	chain: {
		chainId: "pion-1",
		chainName: "neutrontestnet",
		chainPrettyName: "Neutron Testnet",
		gasPrice: {
			amount: "200000",
			denom: "ntrn"
		},
		grpc: ["grpc-falcron.pion-1.ntrn.tech:80"],
		isEVM: false,
		localDenom: "ntrn",
		rest: ["https://rest-falcron.pion-1.ntrn.tech"],
		rpc: ["https://rpc-falcron.pion-1.ntrn.tech"]
	},
	decimal: 6,
	denom: "untrn",
	fullName: "Neutron",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "L3EAsd9=00$~2gR~}ESK00,C%LJ-",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/mainnet/ntrn.png",
	symbol: "NTRN",
	tokenPrettyName: "Neutron Testnet"
}

export const initialUSDCToken: Token = {
	chain: {
		chainId: "pion-1",
		chainName: "neutrontestnet",
		chainPrettyName: "Neutron Testnet",
		gasPrice: {
			amount: "200000",
			denom: "untrn"
		},
		isEVM: false,
		localDenom: "ibc/F082B65C88E4B6D5EF1DB243CDA1D331D002759E938A0F5CD3FFDC5D53B3E349"
	},
	decimal: 6,
	denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/tUSDC",
	fullName: "tUSDC",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "LOKC*Nyl}4v,o#kBkCaz|-Z,$xIr",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/testnet/tUSDC.png",
	symbol: "tUSDC",
	tokenPrettyName: "tUSDC"
}

export const initialUSTTwoToken: Token = {
	chain: {
		chainId: "atlantic-2",
		chainName: "sei",
		chainPrettyName: "Sei Network",
		gasPrice: {
			amount: "25000",
			denom: "usei"
		},
		isEVM: false,
		localDenom: "factory/sei1jdppe6fnj2q7hjsepty5crxtrryzhuqsjrj95y/uust2"
	},
	decimal: 6,
	denom: "factory/sei1jdppe6fnj2q7hjsepty5crxtrryzhuqsjrj95y/uust2",
	fullName: "UST2",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "LYJ17EbFZ,oMt7j]j[WU#Hju][ay",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/testnet/UST2.png",
	symbol: "UST2",
	tokenPrettyName: "US Dollar"
}

export const initialAtomToken: Token = {
	chain: {
		chainId: "pion-1",
		chainName: "neutrontestnet",
		chainPrettyName: "Neutron Testnet",
		gasPrice: {
			amount: "200000",
			denom: "untrn"
		},
		isEVM: false,
		localDenom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/tATOM"
	},
	decimal: 6,
	denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/tATOM",
	fullName: "tAtom",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "LOKC*Nyl}4v,o#kBkCaz|-Z,$xIr",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/testnet/tATOM.png",
	symbol: "ATOM",
	tokenPrettyName: "tATOM"
}

export const initialBTCToken: Token = {
	chain: {
		chainId: "pion-1",
		chainName: "neutrontestnet",
		chainPrettyName: "Neutron Testnet",
		gasPrice: {
			amount: "200000",
			denom: "untrn"
		},
		isEVM: false,
		localDenom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/tBTC"
	},
	decimal: 6,
	denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/tBTC",
	fullName: "tBTC",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "LOKC*Nyl}4v,o#kBkCaz|-Z,$xIr",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/testnet/tBTC.png",
	symbol: "tBTC",
	tokenPrettyName: "tBTC"
}

export const initialEleToken: Token = {
	chain: {
		chainId: "pion-1",
		chainName: "neutrontestnet",
		chainPrettyName: "Neutron Testnet",
		gasPrice: {
			amount: "200000",
			denom: "untrn"
		},
		isEVM: false,
		localDenom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE"
	},
	decimal: 6,
	denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE",
	fullName: "Electron",
	isIBCCoin: false,
	isNativeCoin: true,
	logoHash: "LOKC*Nyl}4v,o#kBkCaz|-Z,$xIr",
	logoURI:
		"https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/assets/testnet/ele.png",
	symbol: "ELE",
	tokenPrettyName: "Electron"
}

export const initialTokenSwap: TSwapInfo = {
	from: {
		amount: "0",
		token: initialAtomToken
	},
	to: {
		amount: "0",
		token: initialNeutronToken
	}
}
