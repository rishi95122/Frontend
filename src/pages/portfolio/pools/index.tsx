/* eslint-disable import/no-unassigned-import */
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { MyPoolCardSkeleton } from "./components/MyPoolCardSkeleton"
import { MyPools } from "./components/MyPools"
import { Center, Flex, SimpleGrid, useBreakpoint } from "@chakra-ui/react"
import { usePoolList } from "@hooks/pool/query/usePoolList"
import { motion } from "framer-motion"
import { PortfolioSummary } from "pages/portfolio/assets/components/PortfolioSummary"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { Navigation, Pagination } from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const MyPoolsPage = () => {
	const [poolsList] = usePoolList()
	const breakpoint = useBreakpoint({ ssr: false })

	const [swiper, setSwiper] = useState<SwiperRef>()
	const previousRef = useRef()
	const nextRef = useRef()

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
				<title>My Pools | Electron</title>
			</Helmet>
			<PortfolioSummary />
			{!poolsList &&
				(breakpoint === "base" || breakpoint === "sm" ? (
					<Center h="22rem" w="full">
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
								<MyPoolCardSkeleton />
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<MyPoolCardSkeleton />
							</SwiperSlide>
							<SwiperSlide
								style={{
									display: "flex",
									justifyContent: "center"
								}}
							>
								<MyPoolCardSkeleton />
							</SwiperSlide>
						</Swiper>
					</Center>
				) : (
					<SimpleGrid columns={{ lg: 3, md: 2 }} gap={{ lg: 4, md: 3, xl: 6 }} w="full">
						<MyPoolCardSkeleton />
						<MyPoolCardSkeleton />
						<MyPoolCardSkeleton />
						<MyPoolCardSkeleton />
						<MyPoolCardSkeleton />
						<MyPoolCardSkeleton />
					</SimpleGrid>
				))}
			{poolsList?.poolsWithAPR && poolsList?.poolsWithAPR.length > 0 && (
				<MyPools pools={poolsList?.poolsWithAPR} />
			)}
			<Flex h="2rem" w="full" />
		</Flex>
	)
}

export default MyPoolsPage
