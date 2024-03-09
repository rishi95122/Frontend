import { PoolBonding } from "./components/PoolBonding"
import { PoolDetails } from "./components/PoolDetails"
import { PoolLiquidity } from "./components/PoolLiquidity"
import { PoolSummary } from "./components/PoolSummary"
import { Button, Center, Flex, HStack, Icon, Stack, useBreakpoint } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { TradeIcon } from "components/Assets/TradeIcon"
import { motion } from "framer-motion"
import { useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { FaAngleLeft, FaArrowDown, FaArrowRight } from "react-icons/fa"
import { usePalette } from "react-palette"
import { useNavigate, useParams } from "react-router-dom"

const Pool = () => {
	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const tokenA = useTokenInfo(pool?.pool.liquidity.token1.denom!)
	const tokenB = useTokenInfo(pool?.pool.liquidity.token2.denom!)

	const { data: tokenAColors } = usePalette(tokenA?.logoURI ?? "/assets/electron.png")
	const { data: tokenBColors } = usePalette(tokenB?.logoURI ?? "/assets/electron.png")

	const breakpoint = useBreakpoint({ ssr: false })
	useEffect(() => {}, [breakpoint])

	const navigate = useNavigate()

	return (
		<Flex
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={3}
			initial={{ opacity: 0 }}
			pos="relative"
			w="full"
			p={3}
			animate={{ opacity: 1 }}
			bg="transparent"
			align="center"
			justify="center"
			bgGradient={`radial-gradient(ellipse at ${
				breakpoint === "base" || breakpoint === "sm" ? "top" : "top left"
			}, ${tokenAColors.vibrant}, transparent ${
				breakpoint === "base" || breakpoint === "sm" ? "80%" : "60%"
			}), radial-gradient(ellipse at ${
				breakpoint === "base" || breakpoint === "sm" ? "bottom" : "bottom right"
			}, ${tokenBColors.vibrant}, transparent ${
				breakpoint === "base" || breakpoint === "sm" ? "80%" : "60%"
			})`}
		>
			<Helmet>
				<title>Pool #{parameters.slug!} | Electron</title>
			</Helmet>
			<HStack maxW="5xl" align="start" w="full">
				<Button
					_disabled={{
						_hover: { bg: "gray.600" },
						cursor: "not-allowed",
						opacity: 0.5
					}}
					_hover={{ filter: "brightness(120%)" }}
					bg="gray.700"
					bgGradient="linear(to-br, gray.600, gray.800)"
					color="white"
					leftIcon={<FaAngleLeft />}
					onClick={() => {
						navigate("/trade/pools")
					}}
					rounded="1em"
					shadow="md"
				>
					Back
				</Button>
				<Button
					_disabled={{
						_hover: { bg: "gray.600" },
						cursor: "not-allowed",
						opacity: 0.5
					}}
					_hover={{ filter: "brightness(120%)" }}
					bg="gray.700"
					bgGradient="linear(to-br, gray.600, gray.800)"
					color="white"
					leftIcon={<TradeIcon />}
					onClick={() => {
						navigate(`/trade/swap?from=${tokenA?.symbol!}&to=${tokenB?.symbol!}`)
					}}
					rounded="1em"
					shadow="md"
				>
					Swap
				</Button>
			</HStack>
			{pool && <PoolSummary pool={pool.pool} />}
			{pool && <PoolDetails apr={pool.pool.highestApr.highestAprValue} pool={pool.pool} />}
			{isWalletConnected && pool && (
				<Stack
					direction={{ base: "column", md: "row" }}
					h={{ base: "fit-content", md: "15rem" }}
					maxW="5xl"
					pos="relative"
					spacing={3}
					w="full"
				>
					<PoolLiquidity pool={pool.pool} />
					<Center
						bg="gray.800"
						shadow="glowMd"
						h={{ base: "2.5rem", md: "3rem" }}
						left={{ base: "calc(50% - 1.5rem)", md: "calc(50% - 1.75rem)" }}
						pos="absolute"
						rounded="full"
						top={{ base: "calc(50% - 2rem)", md: "calc(50% - 1.5rem)" }}
						w={{ base: "2.5rem", md: "3rem" }}
						zIndex={2}
					>
						<Icon
							as={breakpoint === "base" || breakpoint === "sm" ? FaArrowDown : FaArrowRight}
							h={{ base: "1.5rem", md: "2rem" }}
							w={{ base: "1.5rem", md: "2rem" }}
						/>
					</Center>
					<PoolBonding pool={pool.pool} />
				</Stack>
			)}
		</Flex>
	)
}

export default Pool
