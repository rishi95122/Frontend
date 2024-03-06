/* eslint-disable complexity */
import {
	Avatar,
	AvatarGroup,
	Center,
	chakra,
	Flex,
	HStack,
	Icon,
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
	Spacer,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	useBreakpoint,
	VStack
} from "@chakra-ui/react"
import { useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { FaQuestionCircle } from "react-icons/fa"
import { usePalette } from "react-palette"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type TPool } from "utils/tokens/pools"
import shortenNumber from "utils/ui/shortenNumber"

export const PoolSummary = ({ pool }: { pool: TPool }) => {
	const tokenA = useTokenInfo(pool.liquidity.token1.denom)
	const tokenB = useTokenInfo(pool.liquidity.token2.denom)
	const { data: tokenAColors } = usePalette(tokenA?.logoURI ?? "/assets/unknownToken.svg")
	const { data: tokenBColors } = usePalette(tokenB?.logoURI ?? "/assets/unknownToken.svg")

	const breakpoint = useBreakpoint({ ssr: false })

	return (
		<Flex
			bg="gray.700"
			bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
			// _dark={{
			//   bg: "gray.700",
			//   bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
			// }}
			flexDirection="column"
			gap={6}
			maxW="5xl"
			px={{ base: 3, md: 4 }}
			py={{ base: 2, md: 4 }}
			rounded="1.25em"
			shadow="md"
			w="full"
		>
			<Flex direction={{ base: "column", md: "row" }} w="full">
				<HStack spacing={{ base: 0, md: 2 }}>
					<AvatarGroup>
						<Avatar border="none" src={tokenA?.logoURI ?? "/assets/unknownToken.svg"} />
						<Avatar border="none" right="2" src={tokenB?.logoURI ?? "/assets/unknownToken.svg"} />
					</AvatarGroup>
					<Flex flexDir="column" fontSize={{ base: "lg", md: "2xl" }} gap="3px">
						<Text fontFamily="heading" lineHeight="0.8" overflow="hidden">
							{tokenA?.symbol ?? "UNKNOWN"}
							<chakra.span
								color="gray.400"
								fontFamily="heading"
								fontSize="24"
								fontWeight="400"
								px="2px"
							>
								|
							</chakra.span>
							{tokenB?.symbol ?? "UNKNOWN"}
						</Text>
						<Text lineHeight="1.2">
							<chakra.span color="gray.400" fontSize="lg" fontWeight="100" px="2px">
								Pool #
							</chakra.span>
							{pool.poolId}
						</Text>
					</Flex>
				</HStack>
				<Spacer />
				<HStack gap={6}>
					<Stat pt={{ base: 3, md: 0 }}>
						<Flex w="full" align="center" direction="row" fontSize="sm">
							Current Liquidity
						</Flex>
						<StatNumber fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1">
							{`$${Number(pool.liquidity.usd ?? 0).toLocaleString("en-us", {
								currency: "usd",
								maximumFractionDigits: 2
							})}`}
						</StatNumber>
					</Stat>
					<Stat pt={{ base: 3, md: 0 }}>
						<Flex align="center" direction="row" fontSize="sm" gap={1}>
							Swap Fee
							<Popover arrowShadowColor="none" placement="top-end" trigger="hover">
								<PopoverTrigger>
									<Center justifyContent="start" w="fit-content">
										<Icon as={FaQuestionCircle} h="1rem" />
									</Center>
								</PopoverTrigger>
								<PopoverContent
									_dark={{ color: "white" }}
									_focus={{ shadow: "md" }}
									alignItems="center"
									bg="gray.800"
									border="none"
									color="gray.800"
									display="flex"
									flexDirection="row"
									gap={2}
									maxW="15rem"
									px={2}
									py={1}
									rounded="1em"
									shadow="md"
								>
									<PopoverArrow bg="gray.800" />
									<Stat color="white">
										<StatLabel fontSize="xs">Protocol Fees</StatLabel>
										<StatNumber fontSize="md">0.25%</StatNumber>
										<StatHelpText>
											<VStack align="start" spacing={0}>
												<Text fontSize="xs">Guarantee Fund - Token Burn - Revenue</Text>
												<Text fontSize="sm">0.025% + 0.025% + 0.2%</Text>
											</VStack>
										</StatHelpText>
									</Stat>
								</PopoverContent>
							</Popover>
						</Flex>
						<StatNumber fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1">
							0.25%
						</StatNumber>
					</Stat>
				</HStack>
			</Flex>
			<Flex direction="column" gap={1} w="full">
				{pool && (
					<Flex gap={3} w="full">
						<Flex align="end" direction="column" justify="center" pb={2} w="full">
							<Text color={tokenAColors.vibrant} fontSize="md" fontWeight="600">
								{tokenA?.tokenPrettyName ?? "Unknown"}
								<chakra.span _dark={{ color: "white" }} color="offwhite.3" fontWeight="600" ps={1}>
									50%
								</chakra.span>
							</Text>
							<Flex
								align="center"
								fontFamily="heading"
								fontSize="xl"
								fontWeight="900"
								gap={1}
								lineHeight="1.2"
							>
								{breakpoint === "base" || breakpoint === "sm"
									? shortenNumber(
											convertMicroDenomToDenom(
												pool.liquidity.token1.amount ?? 0,
												tokenA?.decimal ?? 6
											),
											2
									  )
									: convertMicroDenomToDenom(
											pool.liquidity.token1.amount ?? 0,
											tokenA?.decimal ?? 6
									  )
											.toNumber()
											.toLocaleString("en-us", { maximumFractionDigits: 2 })}
								<Avatar h="1.3rem" src={tokenA?.logoURI ?? "/assets/unknownToken.svg"} w="1.3rem" />
							</Flex>
						</Flex>
						<Flex direction="column" w="full">
							<Text color={tokenBColors.vibrant} fontSize="md" fontWeight="600">
								<chakra.span _dark={{ color: "white" }} color="offwhite.3" fontWeight="600" pe={1}>
									50%
								</chakra.span>
								{tokenB?.tokenPrettyName ?? "Unknown"}
							</Text>
							<Flex
								align="center"
								fontFamily="heading"
								fontSize="xl"
								fontWeight="900"
								gap={1}
								lineHeight="1.2"
							>
								<Avatar h="1.3rem" src={tokenB?.logoURI ?? "/assets/unknownToken.svg"} w="1.3rem" />
								{breakpoint === "base" || breakpoint === "sm"
									? shortenNumber(
											convertMicroDenomToDenom(
												pool.liquidity.token2.amount ?? 0,
												tokenB?.decimal ?? 6
											),
											2
									  )
									: convertMicroDenomToDenom(pool.liquidity.token2.amount, tokenB?.decimal ?? 6)
											.toNumber()
											.toLocaleString("en-us", { maximumFractionDigits: 2 })}
							</Flex>
						</Flex>
					</Flex>
				)}
				<Flex
					_dark={{ bg: "gray.800" }}
					bg="offwhite.2"
					h="1.5rem"
					overflow="hidden"
					rounded="0.9em"
					w="full"
				>
					<Flex
						bg={tokenAColors.vibrant}
						shadow={`rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenAColors.darkVibrant} 0px 0px 15px inset`}
						h="1.5rem"
						w="full"
					/>
					<Flex
						bg={tokenBColors.vibrant}
						shadow={`rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenBColors.darkVibrant} 0px 0px 15px inset`}
						h="1.5rem"
						w="full"
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}
