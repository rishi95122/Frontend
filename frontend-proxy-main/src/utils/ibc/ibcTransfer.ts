import { simulateTransaction } from "../messages/simulateTransaction"
import { fromBase64 } from "@cosmjs/encoding"
import { Int53 } from "@cosmjs/math"
import { type OfflineDirectSigner } from "@cosmjs/proto-signing"
import { makeAuthInfoBytes, makeSignDoc } from "@cosmjs/proto-signing"
import { type SigningStargateClient } from "@cosmjs/stargate"
import { ibc } from "@sei-js/proto"
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { Any } from "cosmjs-types/google/protobuf/any"
import { getRecoil } from "recoil-nexus"
import { externalChainInfoState, externalTokenState } from "state/UIState"

export const ibcTransfer = async (
	address: string,
	getSigningStargateClient: () => Promise<SigningStargateClient>,
	chain_id?: string,
	offlineSigner?: OfflineDirectSigner
) => {
	const transferMessageState = getRecoil(externalChainInfoState)
	const externalToken = getRecoil(externalTokenState)
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl

	const transferMessage = transfer(transferMessageState)

	// eslint-disable-next-line no-console
	console.log(transferMessageState)

	const client = await getSigningStargateClient()

	if (externalToken?.chain?.isEVM && offlineSigner && chain_id) {
		const rest = await fetch(
			`${externalToken?.chain.rest?.[0]}/cosmos/auth/v1beta1/accounts/${address}`
		)

		const restJson = await rest.json()
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { sequence, account_number } = restJson.account.base_account

		const accountFromSigner = (await offlineSigner.getAccounts()).find(
			(account) => account.address === address
		)

		if (!accountFromSigner) {
			throw new Error("Failed to retrieve account from signer")
		}

		const pubkeyBytes = accountFromSigner.pubkey

		const pubk = Any.fromPartial({
			typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
			value: PubKey.encode({
				key: pubkeyBytes
			}).finish()
		})

		const txBodyEncodeObject = {
			typeUrl: "/cosmos.tx.v1beta1.TxBody",
			value: {
				memo: "memo",
				messages: [transferMessage]
			}
		}

		const txBodyBytes = client.registry.encode(txBodyEncodeObject)
		const gasLimit = Int53.fromString("200000").toNumber()
		const authInfoBytes = makeAuthInfoBytes(
			[{ pubkey: pubk, sequence }],
			[
				{
					amount: "4000000000000000",
					denom: externalToken.chain?.localDenom!
				}
			],
			gasLimit,
			undefined,
			undefined,
			undefined
		)

		const signDocument = makeSignDoc(txBodyBytes, authInfoBytes, chain_id, account_number)

		const { signature, signed } = await offlineSigner.signDirect(address, signDocument)

		const txRaw = TxRaw.encode({
			authInfoBytes: signed.authInfoBytes,
			bodyBytes: signed.bodyBytes,
			signatures: [fromBase64(signature.signature)]
		}).finish()

		return simulateTransaction(await client.broadcastTx(txRaw))
	} else {
		return simulateTransaction(await client.signAndBroadcast(address, [transferMessage], "auto"))
	}
}
