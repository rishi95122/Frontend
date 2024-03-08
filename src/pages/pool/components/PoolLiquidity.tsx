/* eslint-disable no-negated-condition */
import { LiquidityModal } from "./LiquidityModal"
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
import { addLiquidityState } from "@state/poolState"
import { useMount } from "ahooks"
import { LiquidityIcon } from "components/Assets/earn/LiquidityIcon"
import { useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { usePalette } from "react-palette"
import { useRecoilState } from "recoil"
import { type TPool } from "utils/tokens/pools"

export const PoolLiquidity = ({ pool }: { pool: TPool }) => {
	const tokenA = useTokenInfo(pool.liquidity.token1.denom)
	const tokenB = useTokenInfo(pool.liquidity.token2.denom)
	const { data: tokenAColors } = usePalette(tokenA?.logoURI ?? "/assets/electron.png")
	const { data: tokenBColors } = usePalette(tokenB?.logoURI ?? "/assets/electron.png")

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [, setLiquidityAmount] = useRecoilState(addLiquidityState)

	useMount(() => {
		setLiquidityAmount(() => {
			return {
				tokenA: {
					amount: "0",
					token: tokenA!
				},
				tokenB: {
					amount: "0",
					token: tokenB!
				}
			}
		})
	})

	return (
		<Flex
			bg="gray.700"
			bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
			// _dark={{
			//   bg: "gray.700",
			//   bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
			// }}
			flexDirection="column"
			gap={4}
			ps={3}
			py={4}
			rounded="1.25em"
			shadow="md"
			w="full"
		>
			<Flex align="center" gap={2} w="full">
				<Tag
					fontSize="18"
					fontWeight="600"
					px={3}
					py={2}
					bg="gray.800"
					shadow="md"
					// _dark={{ bg: "gray.800" }}
					rounded="0.8em"
				>
					<Text bgClip="text" bgGradient="linear(45deg, brand.1, brand.2)">
						Step 1
					</Text>
				</Tag>
				<Heading fontSize="22" fontWeight="900">
					Manage Liquidity
				</Heading>
			</Flex>
			<Flex align="start" flex={1} gap={1} pe={{ base: 3, md: 7 }} w="full">
				<Text fontSize="16">
					{`Add your ${
						(tokenA?.fullName ?? "Unknown Token").toLowerCase().charAt(0).toUpperCase() +
						(tokenA?.fullName ?? "Unknown Token").slice(1).toLowerCase()
					} and ${
						(tokenB?.fullName ?? "Unknown Token").toLowerCase().charAt(0).toUpperCase() +
						(tokenB?.fullName ?? "Unknown Token").slice(1).toLowerCase()
					} to this pool to be able to bond them to earn pool rewards`}
					.
				</Text>
			</Flex>
			<Flex align="center" gap={2} justifyContent="flex-end" pe={3} w="full">
				<Tooltip
					bg={useColorModeValue("gray.800", "gray.800")}
					border="none"
					color={useColorModeValue("white", "white")}
					hasArrow
					label={!isWalletConnected ? "Connect your wallet to continue" : ""}
					rounded="1em"
					shadow="md"
				>
					<Button
						_active={{
							filter: isWalletConnected
								? "brightness(80%) drop-shadow(0px 1px 2px rgba(2,226,150, 1))"
								: "",
							shadow: isWalletConnected ? "glowMd" : "md"
						}}
						_hover={{
							filter: isWalletConnected
								? "brightness(110%) drop-shadow(0px 0px 4px rgba(2,226,150, 1))"
								: "",
							shadow: isWalletConnected ? "glowMd" : "md"
						}}
						shadow="md"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						disabled={!isWalletConnected || !tokenA || !tokenB}
						fontSize="16"
						leftIcon={<LiquidityIcon h="1.5rem" w="1.5rem" />}
						onClick={() => {
							onOpen()
						}}
						rounded="0.9em"
						transition="all 0.3s"
					>
						Manage
					</Button>
				</Tooltip>
				{tokenA && tokenB && (
					<Portal>
						<LiquidityModal
							isOpen={isOpen}
							onClose={onClose}
							tokenA={tokenA}
							tokenAColor={tokenAColors.vibrant!}
							tokenAColorMuted={tokenAColors.darkMuted!}
							tokenB={tokenB}
							tokenBColor={tokenBColors.vibrant!}
							tokenBColorMuted={tokenBColors.darkMuted!}
						/>
					</Portal>
				)}
			</Flex>
		</Flex>
	)
}
