/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unassigned-import */
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { MyPoolCard } from "./MyPoolCard"
import {
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Spacer,
	useBreakpoint
} from "@chakra-ui/react"
import { usePoolRewards } from "@hooks/pool/query/usePoolRewards"
import { useRedeemHistory } from "@hooks/pool/query/useRedeemHistory"
import { useUnderlyingAssets } from "@hooks/pool/query/useUnderlyingAssets"
import { useClaimAllRewards } from "@hooks/pool/tx/useClaimAllRewards"
import { BigNumber } from "bignumber.js"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useEffect, useRef, useState } from "react"
import { Navigation, Pagination } from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { type TPool } from "utils/tokens/pools"

export const MyPools = ({ pools }: { pools: Array<{ apr: number; pool: TPool }> }) => {
	const breakpoint = useBreakpoint({ ssr: false })

	const [swiper, setSwiper] = useState<SwiperRef>()
	const previousRef = useRef()
	const nextRef = useRef()

	const { mutate: handleClaimAllRewards, isLoading: isExecutingClaimAll } = useClaimAllRewards()

	useEffect(() => {
		if (swiper) {
			// @ts-expect-error types
			swiper.params.navigation.prevEl = previousRef.current
			// @ts-expect-error types
			swiper.params.navigation.nextEl = nextRef.current
			swiper.navigation.init()
			swiper.navigation.update()
		}
	}, [swiper])

	if (breakpoint === "base" || breakpoint === "sm") {
		return (
			<Center
				_dark={{ bgGradient: "linear(to-b, gray.600, gray.800)" }}
				bg="gray.800"
				bgGradient="linear(to-b, gray.600, gray.800)"
				flexDir="column"
				h="26.5rem"
				overflow="hidden"
				px={2}
				py={0}
				rounded="1.25em"
				shadow="md"
				w="full"
			>
				<HStack justify="space-between" py={2} w="full">
					<Heading
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontSize={{ base: "xl", md: "3xl" }}
					>
						My Pools
					</Heading>
					<HStack justify="end">
						<Button
							// isDisabled={rewardAmount! <= 0}
							_dark={{
								_disabled: {
									_hover: { bg: "gray.600" },
									cursor: "not-allowed",
									opacity: 0.5
								},
								_hover: {
									filter: "brightness(120%)"
								},
								bg: "gray.600",
								bgGradient: "linear(45deg, brand.1, brand.2)"
							}}
							_disabled={{
								_hover: { bg: "white" },
								cursor: "not-allowed",
								opacity: 0.5
							}}
							_hover={{ filter: "brightness(120%)" }}
							aria-label="Claim All Pool Rewards"
							bg="white"
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="gray.800"
							isLoading={isExecutingClaimAll}
							leftIcon={<FarmIcon />}
							onClick={() => {
								handleClaimAllRewards()
							}}
							rounded="1em"
							shadow="md"
							size="md"
						>
							Claim All
						</Button>
					</HStack>
				</HStack>
				<Swiper
					centeredSlides
					grabCursor={false}
					initialSlide={0}
					modules={[Pagination, Navigation]}
					navigation
					onSwiper={(currentSwiper) => setSwiper(currentSwiper)}
					pagination={{ dynamicBullets: true, enabled: true }}
					slidesPerView={1}
					spaceBetween={40}
					style={{
						height: "23rem",
						justifyContent: "center",
						overflow: "visible",
						width: "100%"
					}}
				>
					{pools.map((pool) => {
						const [underlyingAssets] = useUnderlyingAssets({ pool: pool.pool })
						const [redeemHistory] = useRedeemHistory({ limit: 100, pool: pool.pool, startAfter: 0 })
						const [rewards] = usePoolRewards({ pool: pool.pool })

						if (
							underlyingAssets.bondedTokens[0] > 0 ||
							underlyingAssets.bondedTokens[1] > 0 ||
							underlyingAssets.unbondedTokens[0] > 0 ||
							underlyingAssets.unbondedTokens[1] > 0 ||
							redeemHistory?.canUnbondAny ||
							(rewards.length > 0 && BigNumber(rewards[0].amount).lt(0))
						) {
							return (
								<SwiperSlide
									key={pool.pool.poolId + "-slide"}
									style={{
										display: "flex",
										justifyContent: "center"
									}}
								>
									<MyPoolCard pool={pool.pool} />
								</SwiperSlide>
							)
						} else return null
					})}
				</Swiper>
			</Center>
		)
	}

	return (
		<Flex
			_dark={{ bgGradient: "linear(to-b, gray.600, gray.800)" }}
			bg="gray.800"
			bgGradient="linear(to-b, gray.600, gray.800)"
			flexDir="column"
			py={3}
			px={4}
			rounded="1.25em"
			shadow="md"
			w="full"
			maxW="6xl"
		>
			<HStack pb={2} px={0} w="full">
				<Heading
					bgClip="text"
					bgGradient="linear(45deg, brand.1, brand.2)"
					fontSize={{ base: "xl", md: "3xl" }}
				>
					My Pools
				</Heading>
				<Spacer />
				<HStack>
					<Button
						// isDisabled={rewardAmount! <= 0}
						_dark={{
							_disabled: {
								_hover: { bg: "gray.600" },
								cursor: "not-allowed",
								opacity: 0.5
							},
							_hover: {
								filter: "brightness(120%)"
							},
							bg: "gray.600",
							bgGradient: "linear(45deg, brand.1, brand.2)"
						}}
						_disabled={{
							_hover: { bg: "white" },
							cursor: "not-allowed",
							opacity: 0.5
						}}
						aria-label="Claim All Pool Rewards"
						bg="white"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						isLoading={isExecutingClaimAll}
						leftIcon={<FarmIcon />}
						onClick={() => {
							handleClaimAllRewards()
						}}
						rounded="1em"
						shadow="md"
						size="md"
						_active={{
							filter: "brightness(110%) drop-shadow(0px 0px 4px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 0px 4px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						transition="0.25s all"
					>
						Claim All
					</Button>
				</HStack>
			</HStack>
			<SimpleGrid columns={{ base: 2, xl: 3 }} gap={{ lg: 3, md: 2 }} w="full">
				{pools.map((pool) => {
					const [underlyingAssets] = useUnderlyingAssets({ pool: pool.pool })
					const [redeemHistory] = useRedeemHistory({ limit: 100, pool: pool.pool, startAfter: 0 })
					const [rewards] = usePoolRewards({ pool: pool.pool })

					if (
						underlyingAssets.bondedTokens[0] > 0 ||
						underlyingAssets.bondedTokens[1] > 0 ||
						underlyingAssets.unbondedTokens[0] > 0 ||
						underlyingAssets.unbondedTokens[1] > 0 ||
						redeemHistory?.canUnbondAny ||
						(rewards.length > 0 && BigNumber(rewards[0].amount).lt(0))
					) {
						return <MyPoolCard key={"myPool" + pool.pool.poolId} pool={pool.pool} />
					} else return null
				})}
			</SimpleGrid>
		</Flex>
	)
}
