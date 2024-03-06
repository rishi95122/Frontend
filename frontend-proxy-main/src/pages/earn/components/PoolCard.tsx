import {
	Avatar,
	Button,
	chakra,
	Flex,
	Heading,
	HStack,
	Skeleton,
	Text,
	VStack
} from "@chakra-ui/react"
import { MemoizedAvatar } from "@components/MemoizedAvatar"
import shortenNumber from "@utils/ui/shortenNumber"
import { BigNumber } from "bignumber.js"
import { BannerIcon } from "components/Assets/earn/BannerIcon"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { useNavigate } from "react-router-dom"
import { type TPool } from "utils/tokens/pools"

export const PoolCard = ({
	icon,
	bannerColor,
	pool
}: {
	bannerColor: string
	icon: React.ReactNode
	pool: TPool
}) => {
	const tokenA = useTokenInfo(pool.liquidity.token1.denom)
	const tokenB = useTokenInfo(pool.liquidity.token2.denom)
	const rewardToken = useTokenInfo(Object.values(pool.highestApr.highestAprToken ?? {})[0])

	const navigate = useNavigate()

	return (
		<Flex
			_dark={{
				bg: "gray.700",
				bgGradient: "linear(to-b, gray.600 1%, gray.700 80%)"
			}}
			align="start"
			bg="white"
			pb={{ base: 10, md: 3 }}
			pos="relative"
			pt={3}
			px={3}
			rounded="1.25em"
			shadow="md"
			w={{ base: "full", md: "full" }}
		>
			<Flex direction="column" gap={2} w="full">
				<HStack pos="relative">
					<MemoizedAvatar
						border="none"
						size={{ base: "sm", md: "md" }}
						src={tokenA?.logoURI ?? "/assets/unknownToken.svg"}
						blurHash={tokenA?.logoHash!}
						w="3rem"
						h="3rem"
					/>
					<MemoizedAvatar
						border="none"
						size={{ base: "sm", md: "md" }}
						// right={3}
						position="absolute"
						left="1.5rem"
						src={tokenB?.logoURI ?? "/assets/unknownToken.svg"}
						blurHash={tokenB?.logoHash!}
						w="3rem"
						h="3rem"
					/>
				</HStack>
				<VStack align="start" h="full" spacing={0}>
					<Heading fontSize="2xl" fontWeight="400">
						{tokenA?.symbol ?? "UNKNOWN"}
						<chakra.span color="gray.400" fontWeight="900" px="4px">
							/
						</chakra.span>
						{tokenB?.symbol ?? "UNKNOWN"}
					</Heading>
					<Text fontSize="lg">
						<chakra.span color="gray.400" fontSize="sm" fontWeight="900" pe="2px">
							#
						</chakra.span>
						{pool.poolId}
					</Text>
				</VStack>
				<Flex direction="column" flex={1} gap={2}>
					<HStack
						_dark={{ bg: "gray.800", color: "white" }}
						bg="offwhite.2"
						color="gray.800"
						h="3rem"
						justify="space-between"
						px={3}
						py={1}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<Text fontFamily="heading">APR</Text>
						<Skeleton isLoaded={Boolean(pool.highestApr)}>
							<HStack>
								<Text fontSize="15">
									{pool.highestApr.highestAprValue === 0 ? "No Rewards" : "Up to"}
									{pool.highestApr.highestAprValue !== 0 && (
										<chakra.span
											bgClip="text"
											bgGradient="linear(45deg, brand.1, brand.2)"
											fontFamily="heading"
											fontSize="20"
											ps={1}
										>
											{shortenNumber(BigNumber(pool.highestApr.highestAprValue), 2) ?? 0}%
										</chakra.span>
									)}
								</Text>
								{pool.highestApr.highestAprValue !== 0 && pool.highestApr.highestAprToken && (
									<Avatar h="1.75rem" src={rewardToken?.logoURI} w="1.5rem" />
								)}
							</HStack>
						</Skeleton>
					</HStack>
					<HStack
						_dark={{ bg: "gray.800", color: "white" }}
						bg="offwhite.2"
						color="gray.800"
						h="3rem"
						justify="space-between"
						px={3}
						py={1}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<Text fontFamily="heading">TVL</Text>
						<Text fontFamily="heading">{`$${Number(pool.liquidity.usd ?? 0).toLocaleString(
							"en-us",
							{
								currency: "USD",
								maximumFractionDigits: 2
							}
						)}`}</Text>
					</HStack>
				</Flex>
				<Button
					_active={{
						filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
					}}
					_hover={{
						filter: "brightness(110%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
					}}
					shadow="rgba(35, 233, 196, 0.42) 0px 0px 5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
					alignSelf="end"
					bgGradient="linear(45deg, brand.1, brand.2)"
					color="gray.800"
					fontSize="16"
					leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
					maxW="6rem"
					mt={2}
					onClick={() => {
						navigate(`/pool/${pool?.poolId}`)
					}}
					rounded="0.9em"
					transition="all 0.5s"
				>
					View
				</Button>
			</Flex>
			<BannerIcon bannerColor={bannerColor} icon={icon} right={3} top={-3} />
		</Flex>
	)
}
