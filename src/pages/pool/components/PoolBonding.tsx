/* eslint-disable no-negated-condition */
import { BondingModal } from "./BondingModal"
import {
	Button,
	Flex,
	Heading,
	Portal,
	Tag,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { LiquidityIcon } from "components/Assets/earn/LiquidityIcon"
import { type TPool } from "utils/tokens/pools"

export const PoolBonding = ({ pool }: { pool: TPool }) => {
	// const tokenA = useTokenInfo(pool?.liquidity.token1.denom!)
	// const tokenB = useTokenInfo(pool?.liquidity.token2.denom!)
	// const { data: tokenAColors } = usePalette(tokenA?.logoURI ?? "/assets/unknownToken.svg")
	// const { data: tokenBColors } = usePalette(tokenB?.logoURI ?? "/assets/unknownToken.svg")

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Flex
			_dark={{
				bg: "gray.700",
				bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
			}}
			bg="gray.700"
			bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
			flexDirection="column"
			gap={4}
			pe={3}
			ps={3}
			py={4}
			rounded="1.25em"
			shadow="md"
			w="full"
		>
			<Flex align="center" gap={2} w="full">
				<Tag
					_dark={{ bg: "gray.800" }}
					bg="gray.800"
					fontSize="18"
					fontWeight="600"
					px={3}
					py={2}
					shadow="md"
					rounded="0.8em"
				>
					<Text bgClip="text" bgGradient="linear(45deg, brand.1, brand.2)">
						Step 2
					</Text>
				</Tag>
				<Heading fontSize="22" fontWeight="900">
					Bond Liquidity
				</Heading>
			</Flex>
			<Flex align="start" flex={1} gap={2} ps={4} w="full">
				<Text fontSize="16">
					Bond your added liquidity to earn from pool incentives in addition to swap fees.
				</Text>
			</Flex>
			<Flex align="center" gap={2} justifyContent="flex-end" w="full">
				<Tooltip
					bg={useColorModeValue("offwhite.2", "gray.800")}
					border="none"
					color={useColorModeValue("gray.800", "white")}
					hasArrow
					label={!isWalletConnected ? "Login to continue" : ""}
					rounded="1em"
					shadow="md"
				>
					<Button
						_active={{
							filter:
								pool.bondingPeriods.length !== 0
									? "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
									: "",
							shadow: pool.bondingPeriods.length !== 0 ? "glowMd" : "md"
						}}
						_disabled={{
							_active: {
								_dark: { bg: "whiteAlpha.200" },
								bg: "blackAlpha.300",
								color: "whiteAlpha.500",
								cursor: "not-allowed",
								filter: ""
							},
							_dark: { bg: "whiteAlpha.200" },
							_focus: {
								_dark: { bg: "whiteAlpha.200" },
								bg: "blackAlpha.300",
								color: "whiteAlpha.500",
								cursor: "not-allowed",
								filter: ""
							},
							_hover: {},
							bg: "blackAlpha.300",
							bgGradient: "",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						}}
						_hover={{
							filter:
								pool.bondingPeriods.length !== 0
									? "brightness(110%) drop-shadow(0px 0px 4px rgba(2,226,150, 1))"
									: "",
							shadow: pool.bondingPeriods.length !== 0 ? "glowMd" : "md"
						}}
						shadow="md"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						isDisabled={!isWalletConnected || pool.bondingPeriods.length === 0}
						leftIcon={<LiquidityIcon h="1.5rem" w="1.5rem" />}
						onClick={() => {
							onOpen()
						}}
						rounded="0.9em"
						transition="all 0.3s"
					>
						Bond
					</Button>
				</Tooltip>
			</Flex>
			{pool.bondingPeriods.length !== 0 && (
				<Portal>
					<BondingModal isOpen={isOpen} onClose={onClose} />
				</Portal>
			)}
		</Flex>
	)
}
