/* eslint-disable canonical/id-match */
/* eslint-disable @typescript-eslint/naming-convention */
import { useChain } from "@cosmos-kit/react"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { type TPool } from "utils/tokens/pools"

export const useRedeemHistory = ({
	pool,
	startAfter,
	limit
}: {
	limit: number
	pool: TPool
	startAfter: number
}) => {
	const { isWalletConnected, address, getSigningCosmWasmClient } = useChain(
		import.meta.env.VITE_NEUTRONNETWORK
	)

	const { data, isLoading } = useQuery<{
		canUnbondAny: boolean
		redeemableUnbondingAmount: number
		totalUnbondingAmount: number
		unbondingInfo: Array<{
			canUnbond: boolean
			lockDuration: number
			stakingAddress: string
			unbonding_info: { address: string; amount: string; time: number }
		}>
	}>(
		[`@fuzio/redeemHistory/${pool.poolId}/${address}`],
		async () => {
			const client = await getSigningCosmWasmClient()

			const { bondingPeriods } = pool
			let totalUnbondingAmount = 0
			let redeemableUnbondingAmount = 0
			let canUnbondAny = false
			const unbondingInfo: Array<{
				canUnbond: boolean
				lockDuration: number
				stakingAddress: string
				unbonding_info: {
					address: string
					amount: string
					time: number
				}
			}> = []

			for (const bondingPeriod of bondingPeriods) {
				const redeemHistory = await client.queryContractSmart(bondingPeriod.address, {
					unbonding_info: {
						limit,
						staker: address,
						start_after: startAfter
					}
				})

				if (redeemHistory.unbonding_info.length > 0) {
					for (const unbonding_info of redeemHistory.unbonding_info) {
						if (
							dayjs(unbonding_info.time * 1_000 + bondingPeriod.lockDuration * 1_000).unix() -
								dayjs().unix() <=
							0
						) {
							canUnbondAny = true
							redeemableUnbondingAmount += Number(unbonding_info.amount)
							unbondingInfo.push({
								canUnbond: true,
								lockDuration: bondingPeriod.lockDuration,
								stakingAddress: bondingPeriod.address,
								unbonding_info
							})
						} else {
							unbondingInfo.push({
								canUnbond: false,
								lockDuration: bondingPeriod.lockDuration,
								stakingAddress: bondingPeriod.address,
								unbonding_info
							})
						}

						totalUnbondingAmount += Number(unbonding_info.amount)
					}
				}
			}

			return {
				canUnbondAny,
				redeemableUnbondingAmount,
				totalUnbondingAmount,
				unbondingInfo
			}
		},
		{
			enabled: Boolean(isWalletConnected && address && pool),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching redeem history")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
