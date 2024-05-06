/* eslint-disable canonical/id-match */
import { getModal } from "./WalletModal/getModal"
import { type Chain } from "@chain-registry/types"
import { Registry } from "@cosmjs/proto-signing"
import { type AminoConverters } from "@cosmjs/stargate"
import { AminoTypes, GasPrice } from "@cosmjs/stargate"
import { type ChainName } from "@cosmos-kit/core"
import { wallets as keplrWallets } from "@cosmos-kit/keplr"
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChainProvider } from "@cosmos-kit/react"
import {
	cosmwasmAminoConverters,
	cosmwasmProtoRegistry,
	ibcAminoConverters,
	ibcProtoRegistry,
	seiprotocolAminoConverters,
	seiprotocolProtoRegistry
} from "@sei-js/proto"
import { assets, chains } from "chain-registry"
import { useMemo } from "react"

export const NeutronProvider = ({ children }: { children?: React.ReactNode }) => {
	// @ts-expect-error types
	const neutronMainnet: Chain = useMemo(() => {
		return {
			apis: {
				grpc: [
					{
						address: "neutron-grpc.publicnode.com:443",
						provider: "Neutron"
					},
					{
						address: "grpc.baryon.remedy.tm.p2p.org:443",
						provider: "P2P.ORG"
					}
				],
				rest: [
					{
						address: "https://neutron-rest.publicnode.com",
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
					"https://neutron-rpc.publicnode.com:443"
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

	return (
		<ChainProvider
			assetLists={assets}
			chains={[...chains, neutronMainnet]}
			defaultNameService="icns"
			endpointOptions={{
				endpoints: {
					neutron: {
						rpc: ["https://neutron-rpc.publicnode.com:443"]
					},
					neutrontestnet: {
						rpc: ["https://rpc-falcron.pion-1.ntrn.tech"]
					}
				},
				isLazy: true
			}}
			key="chainProvider"
			signerOptions={{
				signingCosmwasm: (chain: Chain | ChainName) => {
					// const { gasPrice } = defaultGasForChain(chain)
					// registry
					const chainName = typeof chain === "string" ? chain : chain.chain_name

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

					switch (chainName) {
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
				signingStargate: (chain: Chain | ChainName) => {
					// const { gasPrice } = defaultGasForChain(chain)
					// registry
					const neutronRegistry = new Registry([...seiprotocolProtoRegistry, ...ibcProtoRegistry])

					const aminoConverters: AminoConverters = {
						...seiprotocolAminoConverters,
						...ibcAminoConverters
					}

					const aminoTypes = new AminoTypes(aminoConverters)

					const chainName = typeof chain === "string" ? chain : chain.chain_name

					switch (chainName) {
						case "neutron":
							return {
								aminoTypes,
								broadcastPollIntervalMs: 200,
								gasPrice: GasPrice.fromString("0.06untrn"),
								registry: neutronRegistry
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
							import.meta.env.VITE_NEUTRONNETWORK === "neutron"
								? "Neutron Network"
								: "Neutron Network Testnet",
						url:
							import.meta.env.VITE_NEUTRONNETWORK === "neutron"
								? "https://app.electronprotocol.io"
								: "https://testnet.electronprotocol.io"
					},
					name: "Electron Protocol",
					projectId: import.meta.env.VITE_WCCLIENT as string,
					relayUrl: "wss://relay.walletconnect.org"
				}
			}}
			walletModal={getModal()}
			wallets={[...keplrWallets]}
		>
			{children}
		</ChainProvider>
	)
}
