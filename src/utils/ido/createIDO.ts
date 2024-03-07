import { type SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { type IdoInfo, type InstantiateMsg } from "@fuzio/contracts/types/FuzioNativeIDO.types"

export const createIDO = async (
	address: string,
	isNative: boolean,
	claimStartUnixDateInSeconds: number,
	presaleStartUnixDateInSeconds: number,
	totalSaleAmount: string,
	vestingPeriodInSeconds: number,
	presaleDurationInSeconds: number,
	pricePerToken: { amount: string; denom: string },
	tokenForSale: string,
	idoInfo: IdoInfo,
	getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>
) => {
	const client = await getSigningCosmWasmClient()

	const initMessage: InstantiateMsg = {
		admin: address,
		claim_start: claimStartUnixDateInSeconds,
		ido_page: idoInfo,
		is_native: isNative,
		presale_period: presaleDurationInSeconds,
		presale_start: presaleStartUnixDateInSeconds,
		token_address_or_denom: tokenForSale,
		token_cost: pricePerToken,
		total_supply: totalSaleAmount,
		vesting_step_period: vestingPeriodInSeconds
	}

	return await client.instantiate(
		address,
		579,
		initMessage,
		`Electron-ido-${idoInfo.product.token_symbol}`,
		"auto",
		{
			admin: address,
			funds: [
				{
					amount: "100",
					denom: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE"
				}
			],
			memo: `Electron | Create IDO for ${idoInfo.product.token_symbol}`
		}
	)

	//
	// return await client.execute(
	//   address,
	//   "sei1rzcalhgvcljxxsdhqkpr04437edr3fz6vlhpvlgh7sdzuh9px9rs60l060",
	//   betMsg,
	//   "auto"
	// )
}
