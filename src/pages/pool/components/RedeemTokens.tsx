import { RedeemItem } from "./RedeemItem"
import { RedeemItemSkeleton } from "./RedeemItemSkeleton"
import {
	Button,
	Center,
	Flex,
	HStack,
	IconButton,
	Skeleton,
	Spacer,
	Text,
	VStack
} from "@chakra-ui/react"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { useRedeemHistory } from "@hooks/pool/query/useRedeemHistory"
import { useRedeemAllTokens } from "hooks/pool/tx/useRedeemAllTokens"
import usePagination from "pagination-hook"
import { useEffect, useState } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { redeemAvailableState } from "state/poolState"

export const RedeemTokens = () => {
	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const [redeemAvailable, setRedeemAvailable] = useRecoilState(redeemAvailableState)

	const [currentPage, setCurrentPage] = useState(0)

	const [redeemHistory, isLoadingHistory] = useRedeemHistory({
		limit: 100,
		pool: pool?.pool!,
		startAfter: 0
	})

	useEffect(() => {
		if (redeemHistory?.canUnbondAny) {
			setRedeemAvailable(true)
		} else {
			setRedeemAvailable(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [redeemHistory])

	const { startIndex, endIndex, hasPreviousPage, hasNextPage, totalPages } = usePagination({
		currentPage,
		itemCount: redeemHistory?.unbondingInfo.length ?? 0,
		pageSize: 3
	})

	const { mutate: handleRedeemTokens, isLoading: isExecutingBond } = useRedeemAllTokens({
		pool: pool?.pool!
	})

	return (
		<Flex flexDir="column" gap={1} h="full" w="full">
			<VStack
				_dark={{ bg: "gray.800" }}
				bg="gray.800"
				px={2}
				py={2}
				rounded="1.25em"
				shadow="md"
				w="full"
			>
				{redeemHistory && !isLoadingHistory ? (
					redeemHistory?.unbondingInfo.length > 0 ? (
						redeemHistory.unbondingInfo.slice(startIndex, endIndex).map((redeem, index) => {
							return (
								// eslint-disable-next-line react/jsx-key
								<RedeemItem
									index={index}
									lockDuration={redeem.lockDuration}
									pool={pool?.pool!}
									stakingAddress={redeem.stakingAddress}
									unbonding_info={redeem.unbonding_info}
								/>
							)
						})
					) : (
						<Center color="white" h="full" w="full">
							No unbonding in process.
						</Center>
					)
				) : (
					// eslint-disable-next-line react/jsx-key
					Array.from({ length: 3 }).map(() => <RedeemItemSkeleton />)
				)}
			</VStack>
			<Spacer />
			<HStack justify="center" mb={0} w="full">
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							_dark: { bg: "whiteAlpha.200" },
							bg: "blackAlpha.300",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							_dark: { bg: "whiteAlpha.200" },
							bg: "blackAlpha.300",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "whiteAlpha.200",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "gray.600" }}
					aria-label="previousPage"
					bg="gray.700"
					icon={<FaCaretLeft />}
					isDisabled={!hasPreviousPage}
					onClick={() => setCurrentPage((page) => page - 1)}
					rounded="0.8em"
					shadow="md"
					size="sm"
				/>
				<Skeleton h="full" isLoaded={totalPages !== 0} rounded="0.8em" w="3rem">
					<Center h="full">
						<Text fontFamily="heading" textAlign="center">
							{currentPage + 1} / {totalPages}
						</Text>
					</Center>
				</Skeleton>
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							_dark: { bg: "whiteAlpha.200" },
							bg: "blackAlpha.300",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							_dark: { bg: "whiteAlpha.200" },
							bg: "blackAlpha.300",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "whiteAlpha.200",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "gray.600" }}
					aria-label="nextPage"
					bg="gray.700"
					icon={<FaCaretRight />}
					isDisabled={!hasNextPage}
					onClick={() => setCurrentPage((page) => page + 1)}
					rounded="0.8em"
					shadow="md"
					size="sm"
				/>
			</HStack>
			<Button
				_disabled={{
					_active: {
						_dark: { bg: "whiteAlpha.200" },
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					},
					_dark: { bg: "whiteAlpha.200" },
					_focus: {
						_dark: { bg: "whiteAlpha.200" },
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					},
					bg: "blackAlpha.300",
					color: "whiteAlpha.500",
					cursor: "not-allowed"
				}}
				_hover={{ bgSize: "150%" }}
				bgGradient="linear(45deg, brand.1, brand.2)"
				isDisabled={!redeemAvailable}
				isLoading={isExecutingBond}
				// eslint-disable-next-line no-negated-condition
				shadow={!redeemAvailable ? "md" : "glowMd"}
				onClick={() => {
					handleRedeemTokens()
				}}
				rounded="1.25em"
				transition="0.2s all"
				w="full"
			>
				Redeem All Tokens
			</Button>
		</Flex>
	)
}
