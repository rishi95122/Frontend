/* eslint-disable id-length */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unassigned-import */
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { PoolCard } from "./components/PoolCard"
import { PoolCardSkeleton } from "./components/PoolCardSkeleton"
import { PoolTable } from "./components/PoolTable"
import TVL from "./components/TVL"
import {
	AvatarGroup,
	Button,
	Center,
	chakra,
	Flex,
	HStack,
	Icon,
	IconButton,
	Text,
	useBreakpoint,
	useBreakpointValue
} from "@chakra-ui/react"
import { MemoizedAvatar } from "@components/MemoizedAvatar"
import { useChain } from "@cosmos-kit/react"
import { usePoolList } from "@hooks/pool/query/usePoolList"
import { usePoolRewards } from "@hooks/pool/query/usePoolRewards"
import { createColumnHelper } from "@tanstack/react-table"
import shortenNumber from "@utils/ui/shortenNumber"
import { BigNumber } from "bignumber.js"
import { CelebrationIcon } from "components/Assets/earn/CelebrationIcon"
import { APRIcon } from "components/Assets/earn/ExclusiveIcon"
import { FlameIcon } from "components/Assets/earn/FlameIcon"
import { VerifiedIcon } from "components/Assets/earn/VerifiedIcon"
import { FarmIcon } from "components/Assets/FarmIcon"
import { motion } from "framer-motion"
import { useClaimRewards } from "hooks/pool/tx/useClaimRewards"
import { getTokenInfoFromTokenList } from "hooks/tokens/query/useTokenInfo"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { useEffect, useMemo, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { FaTimesCircle } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { showLowLiqPoolsState } from "state/UIState"
import { Navigation, Pagination } from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { type TPool } from "utils/tokens/pools"

const Earn = () => {
	const [poolsList] = usePoolList()
	const [tokenList] = useTokenList()

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const showLowLiqPools = useRecoilValue(showLowLiqPoolsState)

	const poolsToShow = useMemo(() => {
		if (showLowLiqPools) {
			return poolsList?.poolsWithAPR
		} else {
			return poolsList?.poolsWithAPR?.filter((pool) => pool.pool.liquidity.usd >= 100)
		}
	}, [poolsList, showLowLiqPools])

	const [swiper, setSwiper] = useState<SwiperRef>()
	const previousRef = useRef()
	const nextRef = useRef()

	const breakpoint = useBreakpoint({ ssr: false })

	const columnHelper = createColumnHelper<{
		apr: number
		pool: TPool
	}>()

	const columns = useMemo(() => {
		return [
			columnHelper.accessor("pool.poolId", {
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (info) => {
					const tokenA = getTokenInfoFromTokenList(
						info.row.original.pool.liquidity.token1.denom,
						tokenList ?? []
					)
					const tokenB = getTokenInfoFromTokenList(
						info.row.original.pool.liquidity.token2.denom,
						tokenList ?? []
					)

					return (
						<HStack>
							<AvatarGroup>
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
									position="relative"
									right={{ base: 1, md: 3 }}
									src={tokenB?.logoURI ?? "/assets/unknownToken.svg"}
									blurHash={tokenB?.logoHash!}
									w="3rem"
									h="3rem"
								/>
							</AvatarGroup>
							<Flex flexDir="column" gap={{ base: 1, md: 0 }}>
								<HStack>
									<Text
										fontFamily="heading"
										fontSize={{ base: 18, md: "md" }}
										lineHeight={{ base: 1, md: 1.4 }}
									>
										{tokenA?.symbol ?? "UNKNOWN"}
										<chakra.span color="gray.400" fontWeight="100" px="2px">
											/
										</chakra.span>
										{tokenB?.symbol ?? "UNKNOWN"}
									</Text>
									{info.row.original.pool.isVerified ? (
										<VerifiedIcon
											color="#00E296"
											h={{ base: "1rem", md: "1.5rem" }}
											w={{ base: "1rem", md: "1.5rem" }}
										/>
									) : (
										<Icon
											as={FaTimesCircle}
											color="red.400"
											h={{ base: "1rem", md: "1.25rem" }}
											w={{ base: "1rem", md: "1.25rem" }}
										/>
									)}
								</HStack>
								<Text fontSize={{ base: 18, md: "md" }} lineHeight={{ base: 1, md: 1.4 }}>
									<chakra.span color="gray.400" fontWeight="100" px="2px">
										#
									</chakra.span>
									{info.getValue()}
								</Text>
							</Flex>
						</HStack>
					)
				},
				header: "Pool",
				id: "pools"
			}),
			columnHelper.accessor("pool.liquidity.usd", {
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (info) => {
					// eslint-disable-next-line react/jsx-pascal-case
					return <TVL usd={BigNumber(info.row.original.pool.liquidity.usd) ?? BigNumber(0)} />
				},
				header: "Liquidity",
				id: "liquidity",
				meta: {
					isNumeric: true
				}
			}),
			columnHelper.accessor("pool.highestApr.highestAprValue", {
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (info) => {
					if (breakpoint === "base" || breakpoint === "sm ") {
						return (
							<HStack spacing={1}>
								<Text
									fontFamily="heading"
									fontSize={{ base: 18, md: "md" }}
									lineHeight={{ base: 1, md: 1.4 }}
								>
									APR
								</Text>
								<Text
									bgClip="text"
									bgGradient="linear(45deg, brand.1, brand.2)"
									fontFamily="heading"
									fontSize={{ base: 18, md: "md" }}
									lineHeight={{ base: 1, md: 1.4 }}
								>
									{info.getValue() === 0 ? "None" : String(info.getValue() + "%")}
								</Text>
							</HStack>
						)
					}

					return (
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontFamily="heading"
							fontSize={{ base: 18, md: "md" }}
						>
							{info.getValue() === 0 ? "None" : `${shortenNumber(BigNumber(info.getValue()), 2)}%`}
						</Text>
					)
				},
				header: "APR",
				id: "apr",
				meta: {
					isNumeric: true
				}
			}),
			columnHelper.display({
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (info) => {
					const navigate = useNavigate()

					const [poolRewards] = usePoolRewards({
						pool: info.row.original.pool
					})

					const { mutate: handleClaimRewards, isLoading: isExecutingClaim } = useClaimRewards({
						pool: info.row.original.pool
					})

					const iconSize = useBreakpointValue({ base: "14", md: "20" })

					if (breakpoint === "base" || breakpoint === "sm") {
						return (
							<HStack>
								<IconButton
									aria-label="Go to pools page"
									icon={<HiExternalLink size={iconSize} />}
									onClick={() => {
										navigate(`/pool/${info.row.original.pool.poolId}`)
									}}
									size="md"
								/>
								{isWalletConnected && (
									<IconButton
										aria-label="Claim Pool Rewards"
										icon={<FarmIcon />}
										isDisabled={poolRewards.length <= 0}
										isLoading={isExecutingClaim}
										onClick={() => {
											handleClaimRewards()
										}}
										size="md"
									/>
								)}
							</HStack>
						)
					}

					return (
						<HStack>
							<Button
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
								_hover={{ filter: "brightness(120%)" }}
								aria-label="Go to pools page"
								bg="white"
								bgGradient="linear(45deg, brand.1, brand.2)"
								color="gray.800"
								leftIcon={<HiExternalLink size={iconSize} />}
								onClick={() => {
									navigate(`/pool/${info.row.original.pool.poolId}`)
								}}
								rounded="1em"
								shadow="glowMd"
								size="sm"
							>
								{isWalletConnected ? "Manage" : "Pool"}
							</Button>
							{isWalletConnected && (
								<Button
									shadow="glowMd"
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
									aria-label="Claim Pool Rewards"
									bg="white"
									bgGradient="linear(45deg, brand.1, brand.2)"
									color="gray.800"
									isDisabled={poolRewards.length! <= 0}
									isLoading={isExecutingClaim}
									leftIcon={<FarmIcon />}
									onClick={() => {
										handleClaimRewards()
									}}
									rounded="1em"
									size="sm"
								>
									Claim
								</Button>
							)}
						</HStack>
					)
				},
				header: "Actions",
				id: "actions"
			})
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [poolsToShow, breakpoint, isWalletConnected, showLowLiqPools])

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

	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={{ base: 5, md: 3 }}
			initial={{ opacity: 0 }}
			pos="relative"
			w="full"
			p={3}
			align="center"
			justify="start"
		>
			<Helmet>
				<title>Pools | Electron</title>
			</Helmet>
			{!poolsList &&
				(breakpoint === "base" || breakpoint === "sm" ? (
					<Center h="22rem" w="full">
						<Swiper
							centeredSlides
							grabCursor={false}
							initialSlide={0}
							modules={[Pagination, Navigation]}
							navigation
							onSwiper={(currentSwiper) => setSwiper(currentSwiper)}
							pagination
							slidesPerView={1}
							spaceBetween={40}
							style={{
								justifyContent: "center",
								minHeight: "20rem",
								overflow: "visible",
								width: "100%"
							}}
						>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCardSkeleton bannerColor="#00E296" icon={<CelebrationIcon />} />
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCardSkeleton bannerColor="#FC4361" icon={<FlameIcon />} />
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCardSkeleton bannerColor="#FFA530" icon={<APRIcon />} />
							</SwiperSlide>
						</Swiper>
					</Center>
				) : (
					<HStack gap={5} w="full">
						<PoolCardSkeleton bannerColor="#00E296" icon={<CelebrationIcon />} />
						<PoolCardSkeleton bannerColor="#FC4361" icon={<FlameIcon />} />
						<PoolCardSkeleton bannerColor="#FFA530" icon={<APRIcon />} />
					</HStack>
				))}
			{poolsList &&
				poolsList.poolsWithAPR.length > 0 &&
				poolsList.highestTVLPool &&
				poolsList.highestAPRPool &&
				(breakpoint === "base" || breakpoint === "sm" ? (
					<Center maxW="6xl" h="22rem" w="full">
						<Swiper
							centeredSlides
							grabCursor={false}
							modules={[Pagination, Navigation]}
							navigation
							onSwiper={(currentSwiper) => setSwiper(currentSwiper)}
							pagination
							slidesPerView={1}
							spaceBetween={40}
							style={{
								justifyContent: "center",
								// breakpoint === "sm" || breakpoint === "base" ? "hidden" : "visible",
								minHeight: "20rem",

								overflow: "visible",

								width: "100%"
							}}
							initialSlide={0}
							// ref={sliderRef}
						>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCard
									bannerColor="#00E296"
									icon={<CelebrationIcon />}
									pool={poolsList.newestPool}
								/>
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCard
									bannerColor="#FC4361"
									icon={<FlameIcon />}
									pool={poolsList.highestTVLPool}
								/>
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<PoolCard
									bannerColor="#FFA530"
									icon={<APRIcon />}
									pool={poolsList.highestAPRPool}
								/>
							</SwiperSlide>
						</Swiper>
					</Center>
				) : (
					<HStack gap={3} w="full" maxW="6xl">
						<PoolCard
							bannerColor="#00E296"
							icon={<CelebrationIcon />}
							pool={poolsList.newestPool}
						/>
						<PoolCard bannerColor="#FC4361" icon={<FlameIcon />} pool={poolsList.highestTVLPool} />
						<PoolCard bannerColor="#FFA530" icon={<APRIcon />} pool={poolsList.highestAPRPool} />
					</HStack>
				))}
			<PoolTable columns={columns} data={poolsToShow ?? []} />
		</Flex>
	)
}

export default Earn
