/* eslint-disable canonical/id-match */
import { TxModal } from "./TxModal"
import { getModal } from "./WalletModal/getModal"
import { type Chain } from "@chain-registry/types"
import { Decimal } from "@cosmjs/math"
import { Registry } from "@cosmjs/proto-signing"
import { type AminoConverters } from "@cosmjs/stargate"
import { AminoTypes, GasPrice } from "@cosmjs/stargate"
import { wallets as coin98wallets } from "@cosmos-kit/coin98"
import { wallets as compassWallets } from "@cosmos-kit/compass"
import { wallets as keplrWallets } from "@cosmos-kit/keplr"
import { wallets as leapWallets } from "@cosmos-kit/leap"
import { ChainProvider } from "@cosmos-kit/react"
// import { wallets as finWallets } from "@cosmos-kit/fin"
import { wallets as shellWallets } from "@cosmos-kit/shell"
import { wallets as defiWallets } from "@cosmos-kit/xdefi"
import { makeWeb3AuthWallets, type SignData } from "@fuzio/web3auth"
import {
	cosmwasmAminoConverters,
	cosmwasmProtoRegistry,
	ibcAminoConverters,
	ibcProtoRegistry,
	seiprotocolAminoConverters,
	seiprotocolProtoRegistry
} from "@sei-js/proto"
import { assets, chains } from "chain-registry"
import { useMemo, useState } from "react"

// const defaultGasForChain = (chain: Chain) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   let gasPrice: any = `0.04uatom`
//   if (chain?.fees && chain?.fees.fee_tokens) {
//     const fee = chain?.fees.fee_tokens[0]
//     const feeDenom = `${fee.denom}`.search("ibc/") === -1 ? fee.denom : "token"
//     const feeUnit = `${
//       // fee.average_gas_price ||
//       // fee.low_gas_price ||
//       // fee.fixed_min_gas_price ||
//       // 0
//       0.1
//     }${feeDenom}`

//     gasPrice = GasPrice.fromString(feeUnit)
//   }

//   return { gasPrice }
// }

export const NeutronProvider = ({ children }: { children?: React.ReactNode }) => {
	// @ts-expect-error types
	const neutronMainnet: Chain = useMemo(() => {
		return {
			apis: {
				grpc: [
					{
						address: "grpc-falcron.pion-1.ntrn.tech:80",
						provider: "Neutron"
					},
					{
						address: "grpc.baryon.remedy.tm.p2p.org:443",
						provider: "P2P.ORG"
					}
				],
				rest: [
					{
						address: "https://rest-falcron.pion-1.ntrn.tech",
						provider: "Neutron"
					},
					{
						address: "https://api.pion.remedy.tm.p2p.org",
						provider: "P2P.ORG"
					},
					{
						address: "https://rest.baryon-sentry-01.rs-testnet.polypore.xyz",
						provider: "Hypha"
					}
				],
				rpc: [
					"https://rpc-palvus.pion-1.ntrn.tech:443"
					// {
					// 	address: "grpc.baryon.remedy.tm.p2p.org:443",
					// 	provider: "P2P.ORG",
					// 	url: "grpc.baryon.remedy.tm.p2p.org:443"
					// }
				]
			},
			bech32_prefix: "neutron",
			chain_id: "neutron-1",
			chain_name: "neutron",
			daemon_name: "neutrond",
			explorers: [],
			fees: {
				fee_tokens: [
					{
						average_gas_price: 0.006,
						denom: "untrn",
						fixed_min_gas_price: 0.006,
						high_gas_price: 0.006,
						low_gas_price: 0.006
					}
				]
			},
			network_type: "mainnet",
			pretty_name: "Neutron",
			slip44: 118,
			staking: {
				staking_tokens: [{ denom: "untrn" }]
			},
			status: "live",
			website: "https://neutron.org"
		}
	}, [])

	const [web3AuthPrompt, setWeb3AuthPrompt] = useState<
		| {
				resolve: (approved: boolean) => void
				signData: SignData
		  }
		| undefined
	>()

	const web3AuthWallets = useMemo(() => {
		return makeWeb3AuthWallets({
			client: {
				chainConfig: {
					// @ts-expect-error types
					chainNamespace: "other"
				},

				clientId: import.meta.env.VITE_WEB3AUTHID,

				web3AuthNetwork:
					import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet" ? "cyan" : "testnet"
			},
			loginMethods: [
				{
					logo: "/assets/google-logo.svg",
					name: "Google",
					provider: "google"
				},
				{
					logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Apple_Store_logo.svg",
					name: "Apple",
					provider: "apple"
				},
				{
					logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg",
					name: "Facebook",
					provider: "facebook"
				},
				{
					logo: "/assets/discord-logo.svg",
					name: "Discord",
					provider: "discord"
				},
				{
					logo: "/assets/x-logo.svg",
					name: "X",
					provider: "twitter"
				},
				{
					logo: "/assets/electron.png",
					name: "Email",
					provider: "email_passwordless"
				},
				{
					logo: "/assets/electron.png",
					name: "Phone",
					provider: "sms_passwordless"
				}
			],
			// set state to show data to sign and approve/reject buttons in modal
			promptSign: async (_, signData) =>
				await new Promise((resolve) =>
					// eslint-disable-next-line no-promise-executor-return
					setWeb3AuthPrompt({
						resolve: (approved) => {
							setWeb3AuthPrompt(undefined)
							resolve(approved)
						},
						signData
					})
				)
		})
	}, [])

	return (
		<ChainProvider
			assetLists={assets}
			chains={[...chains, neutronMainnet]}
			defaultNameService="icns"
			endpointOptions={{
				endpoints: {
					comdex: {
						rpc: ["https://rpc.comdex.one"]
					},
					cosmoshub: {
						rpc: ["https://rpc-cosmoshub-ia.cosmosia.notional.ventures"]
					},
					evmos: {
						rpc: ["https://rpc-evmos-ia.cosmosia.notional.ventures"]
					},
					juno: {
						rpc: ["https://rpc.juno.basementnodes.ca"]
					},
					neutron: {
						rpc: ["https://rpc-palvus.pion-1.ntrn.tech:443"]
					},
					neutrontestnet: {
						rpc: [
							"https://rpc-palvus.pion-1.ntrn.tech:443",
							"https://rpc-palvus.pion-1.ntrn.tech:443"
						]
					},
					osmosis: {
						rpc: ["https://rpc.osl.zone"]
					},
					planq: {
						rpc: ["https://rpc.planq.network"]
					}
				},
				isLazy: true
			}}
			key="chainProvider"
			signerOptions={{
				signingCosmwasm: (chain: Chain) => {
					// const { gasPrice } = defaultGasForChain(chain)
					// registry
					const neutronRegistry = new Registry([
						...seiprotocolProtoRegistry,
						...ibcProtoRegistry,
						...cosmwasmProtoRegistry
					])

					const aminoConverters: AminoConverters = {
						...cosmwasmAminoConverters,
						...ibcAminoConverters,
						...seiprotocolAminoConverters
					}

					const aminoTypes = new AminoTypes(aminoConverters)

					switch (chain.chain_name) {
						case "neutrontestnet":
							return {
								aminoTypes,
								broadcastPollIntervalMs: 200,
								gasPrice: GasPrice.fromString("0.006untrn"),
								registry: neutronRegistry
							}

						case "neutron":
							return {
								aminoTypes,
								broadcastPollIntervalMs: 200,
								gasPrice: GasPrice.fromString("0.006untrn"),
								registry: neutronRegistry
							}

						default:
							return {
								broadcastPollIntervalMs: 6_000,
								gasPrice: GasPrice.fromString("0uatom")
							}
					}
				},
				signingStargate: (chain: Chain) => {
					// const { gasPrice } = defaultGasForChain(chain)
					// registry
					const neutronRegistry = new Registry([...seiprotocolProtoRegistry, ...ibcProtoRegistry])

					const aminoConverters: AminoConverters = {
						...seiprotocolAminoConverters,
						...ibcAminoConverters
					}

					const aminoTypes = new AminoTypes(aminoConverters)

					switch (chain.chain_name) {
						case "seitestnet2":
							return {
								aminoTypes,
								broadcastPollIntervalMs: 200,
								gasPrice: GasPrice.fromString("0.1usei"),
								registry: neutronRegistry
							}

						case "sei":
							return {
								aminoTypes,
								broadcastPollIntervalMs: 200,
								gasPrice: GasPrice.fromString("0.1usei"),
								registry: neutronRegistry
							}

						case "juno":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: GasPrice.fromString("0.075ujuno")
							}
						case "cosmoshub":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "uatom")
							}
						case "osmosis":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "uosmo")
							}
						case "axelar":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "uaxl")
							}
						case "kujira":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "ukuji")
							}
						case "stargaze":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "ustars")
							}
						case "comdex":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "ucmdx")
							}
						case "chihuahua":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("5000000", 6), "uhuahua")
							}
						case "mars":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("25000", 6), "umars")
							}
						case "evmos":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("40000000000", 2), "aevmos")
							}
						case "planq":
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: new GasPrice(Decimal.fromAtomics("40000000000", 2), "aplanq")
							}

						default:
							return {
								broadcastPollIntervalMs: 1_000,
								gasPrice: GasPrice.fromString("0uatom")
							}
					}
				}
			}}
			walletConnectOptions={{
				signClient: {
					metadata: {
						description: "Bridging the gap between CEX and DeFi",
						icons: ["/assets/electron.png"],
						name:
							import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet"
								? "Neutron Network"
								: "Neutron Network Testnet",
						url:
							import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet"
								? "https://app.electron.network"
								: "https://testnet.electron.network"
					},
					name: "Electron Network",
					projectId: import.meta.env.VITE_WCCLIENT as string,
					relayUrl: "wss://relay.walletconnect.org"
				}
			}}
			walletModal={getModal()}
			wallets={[
				...compassWallets,
				...shellWallets,
				// ...finWallets,
				...keplrWallets,
				...leapWallets,

				...web3AuthWallets,
				...coin98wallets,
				...defiWallets
			]}
		>
			{web3AuthPrompt?.signData && (
				<TxModal
					isOpen
					onClose={() => web3AuthPrompt?.resolve(false)}
					rejectTx={() => web3AuthPrompt?.resolve(false)}
					signData={web3AuthPrompt?.signData}
					signTx={() => web3AuthPrompt?.resolve(true)}
				/>
			)}
			{children}
		</ChainProvider>
	)
}
