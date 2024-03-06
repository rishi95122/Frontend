import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useRef } from "react"

const sleep = async (delayMs: number) =>
	// eslint-disable-next-line no-promise-executor-return
	await new Promise((resolve) => setTimeout(resolve, delayMs))

export const useRefetchQueries = (queryKey?: string[] | string, delayMs?: number) => {
	const queryClient = useQueryClient()

	const queriesToRefetchRef = useRef(queryKey)
	queriesToRefetchRef.current = queryKey

	return useCallback(
		// eslint-disable-next-line func-names, consistent-return
		async function refetchQueries(queryKeyArgument?: string[] | string) {
			const queriesToRefetch = queryKeyArgument ?? queriesToRefetchRef.current

			if (delayMs) {
				await sleep(delayMs)
			}

			if (Array.isArray(queriesToRefetch)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return await Promise.all<any>(
					queriesToRefetch.map(
						async (query) =>
							await queryClient.refetchQueries({
								// eslint-disable-next-line require-unicode-regexp
								queryKey: [new RegExp(query) as unknown as string]
							})
					)
				)
			}

			await queryClient.refetchQueries({
				// eslint-disable-next-line require-unicode-regexp
				queryKey: [new RegExp(queriesToRefetch!) as unknown as string]
			})
		},
		[queryClient, delayMs]
	)
}
