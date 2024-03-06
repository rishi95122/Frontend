import { usePoolList } from "@hooks/pool/query/usePoolList"
import { useEffect, useState } from "react"
import { type TValidPair } from "utils/tokens/pools"

export const useValidPool = (tokenA: string, tokenB: string) => {
	const [validPool, setValidPool] = useState<TValidPair>()

	// const poolListResponse = await fetch(poolListUrl)
	// // eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const poolListJson: any = await poolListResponse.json()
	// const poolList: TPool[] = poolListJson.pools.map((pool: TPool) => {
	// 	return pool
	// })

	const [poolList, isPoolListLoading] = usePoolList()

	useEffect(() => {
		if (isPoolListLoading || !poolList) return
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let validPair: any
		// eslint-disable-next-line no-unsafe-optional-chaining
		for (const [, { pool }] of poolList.poolsWithAPR.entries()) {
			if (pool.liquidity.token1.denom === tokenA && pool.liquidity.token2.denom === tokenB) {
				validPair = { pool, reverse: false }
			}

			if (pool.liquidity.token1.denom === tokenB && pool.liquidity.token2.denom === tokenA) {
				validPair = { pool, reverse: true }
			}
		}

		if (!validPair) {
			// eslint-disable-next-line no-unsafe-optional-chaining
			const { pool: firstPool } = poolList.poolsWithAPR?.find(
				({ pool }) =>
					pool.liquidity.token1.denom === tokenA || pool.liquidity.token2.denom === tokenA
			)!

			if (firstPool) {
				const middleToken =
					firstPool.liquidity.token1.denom === tokenA
						? firstPool.liquidity.token2.denom
						: firstPool.liquidity.token1.denom
				// eslint-disable-next-line no-unsafe-optional-chaining
				const { pool: secondPool } = poolList.poolsWithAPR?.find(
					({ pool }) =>
						(pool.liquidity.token1.denom === middleToken ||
							pool.liquidity.token2.denom === middleToken) &&
						(pool.liquidity.token1.denom === tokenB || pool.liquidity.token2.denom === tokenB)
				)!
				if (secondPool) {
					validPair = {
						pool: firstPool,
						subPools: [
							{ pool: firstPool, reverse: tokenA === firstPool.liquidity.token2.denom },
							{ pool: secondPool, reverse: tokenB === secondPool.liquidity.token1.denom }
						]
					}
				}
			}
		}

		setValidPool(validPair)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokenA, tokenB])

	return validPool
}
