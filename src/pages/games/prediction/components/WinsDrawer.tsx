import { WonRoundCard } from "./WonRoundCard"
import {
	Button,
	chakra,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Text,
	VStack
} from "@chakra-ui/react"
import { BigNumber } from "bignumber.js"
import { useGetClaimInfo } from "hooks/games/prediction/query/useGetClaimInfo"
import { useGetTotalAmountSpend } from "hooks/games/prediction/query/useGetTotalAmountSpend"
import { useCollectWins } from "hooks/games/prediction/tx/useCollectWins"
import usePagination from "pagination-hook"
import { useMemo, useState } from "react"
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

export const WinsDrawer = ({
	isOpen,
	onClose,
	wonRounds
}: {
	isOpen: boolean
	onClose: () => void
	wonRounds: Array<[string, string]>
}) => {
	const { mutate: claimWins, isLoading: isClaimingWins } = useCollectWins()

	const [claimInfo] = useGetClaimInfo()
	const [coinsSpend] = useGetTotalAmountSpend()

	const coinsClaimed = useMemo(() => {
		let total = 0
		if (claimInfo) {
			for (const element of claimInfo) {
				total += Number(element.claimed_amount)
			}
		}

		return total
	}, [claimInfo])

	const profitPercent = useMemo(() => {
		return coinsClaimed / coinsSpend
	}, [coinsClaimed, coinsSpend])

	const [currentPage, setCurrentPage] = useState(0)

	const { endIndex, startIndex, totalPages, hasNextPage, hasPreviousPage } = usePagination({
		currentPage,
		itemCount: wonRounds.length ?? 0,
		pageSize: 6
	})

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm">
			<DrawerOverlay backdropFilter="blur(70px)" bg="transparent" />
			<DrawerContent bg="gray.800" roundedStart="1em">
				<DrawerHeader
					bgClip="text"
					bgGradient="linear(45deg, brand.1, brand.2)"
					fontFamily="heading"
					fontSize="2em"
					py={2}
				>
					My Wins
				</DrawerHeader>
				{/* @ts-expect-error types */}
				<DrawerBody align="center" h="full" px={3} py={0} w="full">
					<VStack bg="gray.700" h="29rem" p={2} rounded="1em" spacing={3} w="full">
						{wonRounds.slice(startIndex, endIndex).map((round) => (
							// eslint-disable-next-line react/jsx-key
							<WonRoundCard wonRound={round} />
						))}
					</VStack>
					<HStack
						justify="center"
						maxW="20rem"
						mb={{ base: 4, md: 6 }}
						mt={{ base: 2, md: 3 }}
						spacing={8}
						w="full"
					>
						<HStack>
							<IconButton
								_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
								_disabled={{
									_active: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									_dark: { bg: "whiteAlpha.200" },
									_focus: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									bg: "blackAlpha.300",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								}}
								_hover={{ bg: "offwhite.3" }}
								aria-label="firstPage"
								bg="offwhite.4"
								icon={<FaAngleDoubleLeft />}
								isDisabled={!hasPreviousPage}
								onClick={() => setCurrentPage(0)}
								rounded="0.8em"
								shadow="md"
								size="md"
							/>
							<IconButton
								_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
								_disabled={{
									_active: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									_dark: { bg: "whiteAlpha.200" },
									_focus: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									bg: "blackAlpha.300",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								}}
								_hover={{ bg: "offwhite.3" }}
								aria-label="previousPage"
								bg="offwhite.4"
								icon={<FaAngleLeft />}
								isDisabled={!hasPreviousPage}
								onClick={() => setCurrentPage((current) => current - 1)}
								rounded="0.8em"
								shadow="md"
								size="md"
							/>
						</HStack>
						<Text color="white" fontWeight="900">
							{currentPage + 1}{" "}
							<chakra.span fontWeight="400" px="2px">
								of
							</chakra.span>{" "}
							{totalPages}
						</Text>
						<HStack>
							<IconButton
								_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
								_disabled={{
									_active: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									_dark: { bg: "whiteAlpha.200" },
									_focus: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									bg: "blackAlpha.300",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								}}
								_hover={{ bg: "offwhite.3" }}
								aria-label="nextPage"
								bg="offwhite.4"
								icon={<FaAngleRight />}
								isDisabled={!hasNextPage}
								onClick={() => setCurrentPage((current) => current + 1)}
								rounded="0.8em"
								shadow="md"
								size="md"
							/>
							<IconButton
								_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
								_disabled={{
									_active: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									_dark: { bg: "whiteAlpha.200" },
									_focus: {
										bg: "whiteAlpha.200",
										color: "whiteAlpha.500",
										cursor: "not-allowed"
									},
									bg: "blackAlpha.300",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								}}
								_hover={{ bg: "offwhite.3" }}
								aria-label="lastPage"
								bg="offwhite.4"
								icon={<FaAngleDoubleRight />}
								isDisabled={!hasNextPage}
								onClick={() => setCurrentPage(totalPages - 1)}
								rounded="0.8em"
								shadow="md"
								size="md"
							/>
						</HStack>
					</HStack>
				</DrawerBody>
				<DrawerFooter flexDir="column" gap={2} w="full">
					<Flex bg="gray.700" flexDir="column" p={2} rounded="1em" w="full">
						<HStack>
							<Text color="white" fontFamily="body">
								Total Amount Won:
							</Text>
							<Text color="white" fontFamily="heading">
								{shortenNumber(convertMicroDenomToDenom(coinsClaimed, 6), 2)}
							</Text>
						</HStack>
						<HStack>
							<Text color="white" fontFamily="body">
								Total Amount Spend:
							</Text>
							<Text color="white" fontFamily="heading">
								{shortenNumber(convertMicroDenomToDenom(coinsSpend, 6), 2)}
							</Text>
						</HStack>
						<HStack>
							<Text color="white" fontFamily="body">
								My Profit:
							</Text>
							<Text
								bgClip="text"
								bgGradient={
									profitPercent >= 1
										? "linear(45deg, green.400, green.500)"
										: "linear(45deg, red.400, red.500)"
								}
								fontFamily="heading"
							>
								{`${shortenNumber(BigNumber(Number(profitPercent * 100)), 2)}% (${Number(
									profitPercent
								).toFixed(2)}x)`}
							</Text>
						</HStack>
					</Flex>
					<Button
						isLoading={isClaimingWins}
						alignSelf="end"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="white"
						fontWeight="900"
						onClick={() => claimWins()}
						rounded="1em"
					>
						Claim All
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
