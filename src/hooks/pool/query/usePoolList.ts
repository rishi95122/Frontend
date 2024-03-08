/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "bignumber.js"
import { useMemo } from "react"
import { type TPool } from "utils/tokens/pools"

export const poolListUrl = `https://raw.githubusercontent.com/Electron-Protocol/Assetlist/main/${
	import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet" ? "mainnet/" : "testnet/"
}poolList.json`

export const usePoolList = () => {
	const { data, isLoading } = useQuery<{
		highestAPRPool: TPool
		highestTVLPool: TPool
		newestPool: TPool
		poolsWithAPR: Array<{ apr: number; pool: TPool }>
	}>(
		["@fuzio/poolsList"],
		async () => {
			const response = await fetch(
				import.meta.env.VITE_NEUTRONNETWORK === "neutrontestnet"
					? "https://backend-1-h514.onrender.com/poolList"
					: "https://backend-1-h514.onrender.com/poolList"
			)
			const responseJson = await response.json()
			const pools: TPool[] = []

			for await (const [, pool] of responseJson.pools.entries()) {
				const currentPool: TPool = {
					...pool,
					liquidity: {
						token1: {
							...pool.liquidity.token1,
							amount: BigNumber(pool.liquidity.token1.amount),
							tokenPrice: BigNumber(pool.liquidity.token1.tokenPrice)
						},
						token2: {
							...pool.liquidity.token2,
							amount: BigNumber(pool.liquidity.token2.amount),
							tokenPrice: BigNumber(pool.liquidity.token2.tokenPrice)
						},
						usd: Number(pool.liquidity.usd)
					},
					lpTokens: BigNumber(pool.lpTokens),
					ratio: BigNumber(pool.ratio)
				}

				pools.push(currentPool)
			}

			const newestPool: TPool = pools.at(-1)!
			const highestAPRPool: TPool = pools.at(responseJson.highestAprPool - 1)!
			const highestTVLPool: TPool = pools.at(responseJson.highestLiquidity - 1)!

			const highestApr: number[] = Array.from(
				{
					length: pools.length ?? 0
				},
				() => 0
			)

			const poolsWithAPR: Array<{ apr: number; pool: TPool }> = pools.map((pool, index) => ({
				apr: highestApr[index],
				pool
			}))!

			return {
				highestAPRPool,
				highestTVLPool,
				newestPool,
				poolsWithAPR
			}
		},
		{
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("e")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}

export const usePoolFromListQueryById = ({ poolId }: { poolId: number }) => {
	const [poolsList, isLoading] = usePoolList()

	const requestedPool = useMemo(() => {
		if (!poolsList?.poolsWithAPR.length) return

		// eslint-disable-next-line consistent-return
		return poolsList?.poolsWithAPR.find((pool) => pool.pool.poolId === poolId)
	}, [poolId, poolsList?.poolsWithAPR])

	return [requestedPool, isLoading] as const
}

export const usePoolListDataless = () => {
	const { data, isLoading } = useQuery<TPool[]>(
		["@fuzio/poolsList/dataless"],
		async () => {
			const response = await fetch(poolListUrl)
			const responseJson = await response.json()
			const pools: TPool[] = []

			for await (const [, pool] of responseJson.pools.entries()) {
				pools.push(pool)
			}

			return pools
		},
		{
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("e")
			},
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
			retry: false
		}
	)

	return [data, isLoading] as const
}
