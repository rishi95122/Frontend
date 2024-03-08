/* eslint-disable no-negated-condition */
import { LiveRoundProgress } from "./LiveRoundProgress"
import {
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Skeleton,
	Spacer,
	Tag,
	Text,
	VStack
} from "@chakra-ui/react"
import { type LiveRound, type Timestamp } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import RiveComponent from "@rive-app/react-canvas"
import { BigNumber } from "bignumber.js"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { type Variants } from "framer-motion"
import { animate, motion, useMotionValue } from "framer-motion"
import { usePlayerPosition } from "hooks/games/prediction/query/usePlayerPosition"
import { useTokenPrice } from "hooks/games/prediction/query/useTokenPrice"
import { useEffect, useState } from "react"
import AnimatedNumbers from "react-animated-numbers"
import { FaPlayCircle } from "react-icons/fa"
import MotionFlex from "theme/motion/components/MotionFlex"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(duration)

const cardVariants: Variants = {
	animate: { rotateY: 180, transition: { duration: 0.75 } },
	initial: { rotateY: 0 }
}

export const LiveRoundCard = ({
	roundInfo,
	isLoading,
	currentTime
}: {
	currentTime?: Timestamp
	isLoading: boolean
	roundInfo?: LiveRound
}) => {
	const [startPrice, setStartPrice] = useState(0)
	const [percentageChange, setPercentageChange] = useState(0)
	const [pricePool, setPricePool] = useState(0)
	const [isFinishing, setIsFinishing] = useState(false)
	const [playerRoundInfo] = usePlayerPosition({
		roundId: roundInfo?.id ?? "0"
	})

	const [tokenPrice] = useTokenPrice()

	const bgGradient = useMotionValue(`linear-gradient(
    0deg,
    hsl(225deg 11% 22%) 1%,
    hsl(206deg 38% 29%) 47%,
    hsl(193deg 100% 27%) 51%,
    hsl(188deg 100% 31%) 50%,
    hsl(178deg 100% 33%) 49%,
    hsl(164deg 100% 39%) 53%,
    hsl(141deg 75% 55%) 99%
  )`)

	const cardBg = useMotionValue(`linear-gradient(
    0deg,
       hsl(226deg 30% 14%) 0%,
        hsl(226deg 30% 14%) 11%,
        hsl(226deg 30% 14%) 22%,
        hsl(226deg 30% 14%) 33%,
        hsl(226deg 30% 14%) 44%,
        hsl(226deg 30% 14%) 56%,
        hsl(226deg 30% 14%) 67%,
        hsl(226deg 30% 14%) 78%,
        hsl(226deg 30% 14%) 89%,
        hsl(226deg 30% 14%) 100%
  )`)

	const bgFullColor = useMotionValue(`linear-gradient(
    0deg,
    hsl(225deg 30% 24%) 1%,
    hsl(207deg 40% 35%) 50%,
    hsl(188deg 52% 43%) 100%,
  )`)

	useEffect(() => {
		if (!roundInfo || isLoading) {
			return
		}

		const changeValue = Number(Number((tokenPrice / Number(roundInfo?.open_price)) * 100 - 100))

		const pricePoolAmount = Number(roundInfo.bear_amount) + Number(roundInfo.bull_amount)

		setPricePool(convertMicroDenomToDenom(pricePoolAmount, 6).toNumber())
		setStartPrice(Number(Number(roundInfo?.open_price).toFixed(2)))
		setPercentageChange(Number(changeValue.toFixed(2)))

		if (tokenPrice > startPrice) {
			void animate(
				bgGradient,
				`linear-gradient(
        0deg,
        hsl(225deg 30% 24%) 1%,
        hsl(207deg 40% 35%) 50%,
        hsl(188deg 52% 43%) 50%,
        hsl(169deg 66% 50%) 50%,
        hsl(150deg 100% 55%) 99%
        )`
			)
			void animate(
				bgFullColor,
				`linear-gradient(
        0deg,
        hsl(188deg 52% 43%) 1%,
        hsl(169deg 66% 50%) 50%,
        hsl(150deg 100% 55%) 99%
        )`
			)
			if (playerRoundInfo?.live_bull_amount !== "0") {
				void animate(
					cardBg,
					`linear-gradient(
            0deg,
            hsl(154deg 93% 42%) 0%,
            hsl(152deg 74% 41%) 21%,
            hsl(152deg 64% 39%) 30%,
            hsl(152deg 56% 36%) 39%,
            hsl(154deg 49% 32%) 46%,
            hsl(157deg 42% 28%) 54%,
            hsl(163deg 36% 24%) 61%,
            hsl(175deg 29% 20%) 69%,
            hsl(199deg 27% 17%) 79%,
            hsl(226deg 30% 14%) 100%
        )`
				)
			} else if (
				(playerRoundInfo?.live_bull_amount === "0" && playerRoundInfo?.live_bear_amount === "0") ||
				!playerRoundInfo
			) {
				void animate(
					cardBg,
					`linear-gradient(
            0deg,
            hsl(226deg 30% 14%) 0%,
            hsl(226deg 30% 14%) 21%,
            hsl(226deg 30% 14%) 30%,
            hsl(226deg 30% 14%) 39%,
            hsl(226deg 30% 14%) 46%,
            hsl(226deg 30% 14%) 54%,
            hsl(226deg 30% 14%) 61%,
            hsl(226deg 30% 14%) 69%,
            hsl(226deg 30% 14%) 79%,
            hsl(226deg 30% 14%) 100%
        )`
				)
			} else {
				void animate(
					cardBg,
					`linear-gradient(
          0deg,
          hsl(348deg 55% 30%) 0%,
          hsl(340deg 54% 28%) 11%,
          hsl(333deg 50% 26%) 22%,
          hsl(324deg 44% 24%) 33%,
          hsl(313deg 37% 21%) 44%,
          hsl(295deg 30% 20%) 56%,
          hsl(276deg 29% 19%) 67%,
          hsl(257deg 27% 18%) 78%,
          hsl(239deg 25% 17%) 89%,
          hsl(226deg 30% 14%) 100%
        )`
				)
			}
		} else if (tokenPrice === startPrice) {
			void animate(
				bgGradient,
				`linear-gradient(
        0deg,
        hsl(225deg 30% 24%) 1%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 99%
      )`
			)
			void animate(
				bgFullColor,
				`linear-gradient(
        0deg,
        hsl(225deg 30% 24%) 1%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 99%
      )`
			)
			void animate(
				cardBg,
				`linear-gradient(
          0deg,
          hsl(226deg 30% 14%) 0%,
          hsl(226deg 30% 14%) 21%,
          hsl(226deg 30% 14%) 30%,
          hsl(226deg 30% 14%) 39%,
          hsl(226deg 30% 14%) 46%,
          hsl(226deg 30% 14%) 54%,
          hsl(226deg 30% 14%) 61%,
          hsl(226deg 30% 14%) 69%,
          hsl(226deg 30% 14%) 79%,
          hsl(226deg 30% 14%) 100%
        )`
			)
		} else {
			void animate(
				bgGradient,
				`linear-gradient(
        0deg,
          hsl(353deg 100% 64%) 1%,
          hsl(321deg 62% 55%) 50%,
          hsl(289deg 42% 46%) 50%,
          hsl(257deg 36% 36%) 50%,
          hsl(225deg 30% 24%) 99%
        )`
			)
			void animate(
				bgFullColor,
				`linear-gradient(
        0deg,
        hsl(353deg 100% 64%) 1%,
        hsl(321deg 62% 55%) 50%,
        hsl(289deg 42% 46%) 99%
      )`
			)
			if (playerRoundInfo?.live_bear_amount !== "0") {
				void animate(
					cardBg,
					`linear-gradient(
            0deg,
            hsl(154deg 93% 42%) 0%,
            hsl(152deg 74% 41%) 21%,
            hsl(152deg 64% 39%) 30%,
            hsl(152deg 56% 36%) 39%,
            hsl(154deg 49% 32%) 46%,
            hsl(157deg 42% 28%) 54%,
            hsl(163deg 36% 24%) 61%,
            hsl(175deg 29% 20%) 69%,
            hsl(199deg 27% 17%) 79%,
            hsl(226deg 30% 14%) 100%
        )`
				)
			} else if (
				(playerRoundInfo?.live_bull_amount === "0" && playerRoundInfo?.live_bear_amount === "0") ||
				playerRoundInfo === null
			) {
				void animate(
					cardBg,
					`linear-gradient(
            0deg,
            hsl(226deg 30% 14%) 0%,
            hsl(226deg 30% 14%) 21%,
            hsl(226deg 30% 14%) 30%,
            hsl(226deg 30% 14%) 39%,
            hsl(226deg 30% 14%) 46%,
            hsl(226deg 30% 14%) 54%,
            hsl(226deg 30% 14%) 61%,
            hsl(226deg 30% 14%) 69%,
            hsl(226deg 30% 14%) 79%,
            hsl(226deg 30% 14%) 100%
        )`
				)
			} else {
				void animate(
					cardBg,
					`linear-gradient(
            0deg,
            hsl(346deg 70% 25%) 0%,
            hsl(346deg 62% 24%) 21%,
            hsl(345deg 56% 23%) 30%,
            hsl(344deg 50% 21%) 39%,
            hsl(341deg 44% 20%) 46%,
            hsl(336deg 37% 18%) 54%,
            hsl(327deg 30% 17%) 61%,
            hsl(306deg 21% 15%) 69%,
            hsl(264deg 20% 15%) 79%,
            hsl(226deg 30% 14%) 100%
        )`
				)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokenPrice, roundInfo, playerRoundInfo])

	useEffect(() => {
		const remainingTime =
			(Number(roundInfo?.close_time) / 1_000 - Number(currentTime) / 1_000) / 1e6

		// console.log(remainingTime)

		if (remainingTime <= 1) {
			setIsFinishing(true)
		} else {
			setIsFinishing(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTime])

	return (
		<MotionFlex
			h="20rem"
			initial="initial"
			pos="relative"
			rounded="1em"
			shadow="md"
			style={{ backgroundImage: cardBg }}
			variants={cardVariants}
			w="17rem"
			zIndex={100}
		>
			<MotionFlex
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				key="notFlipped"
				pos="relative"
				w="full"
			>
				<MotionFlex
					align="center"
					bg="slate.800"
					color="brand.1"
					gap={1}
					h="2rem"
					px={2}
					py={2}
					roundedTop="1em"
					w="full"
				>
					<Icon as={FaPlayCircle} />
					<Text
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontFamily="heading"
						fontWeight="900"
						letterSpacing={0.9}
						textTransform="capitalize"
					>
						{isFinishing ? "Finishing Up" : "Live"}
					</Text>
					<Spacer />
					<Skeleton isLoaded={!isLoading} rounded="1.25em">
						<Text fontFamily="heading">#{roundInfo?.id ?? "000"}</Text>
					</Skeleton>
				</MotionFlex>
				{roundInfo && (
					<LiveRoundProgress
						closeTime={Number(roundInfo?.close_time) / 1_000}
						currentTime={Number(currentTime) / 1_000}
						startTime={Number(roundInfo?.open_time) / 1_000}
					/>
				)}
				<motion.svg
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					height="0"
					initial={{ opacity: 0 }}
					width="0"
				>
					<defs>
						<clipPath clipPathUnits="objectBoundingBox" id="myClip">
							<polygon
								points=".41,.02 .59,.02 
                       .91,.16 1,.33 
                       1,.66 .91,.83 
                       .59,.98 .41,.98 
                       .09,.83 0,.66
                       0,.33 .09,.16
                       "
							/>
							<circle cx=".5" cy=".2" r=".2" />
							<circle cx=".5" cy=".8" r=".2" />
							<circle cx=".8" cy=".33" r=".2" />
							<circle cx=".8" cy=".66" r=".2" />
							<circle cx=".2" cy=".33" r=".2" />
							<circle cx=".2" cy=".66" r=".2" />
						</clipPath>
					</defs>
				</motion.svg>
				<MotionFlex
					animate={{ opacity: 1 }}
					borderRadius="0"
					clipPath="url(#myClip)"
					exit={{ opacity: 0 }}
					h="16rem"
					initial={{ opacity: 0 }}
					left="calc(50% - 6.5rem)"
					pos="absolute"
					style={{ backgroundImage: bgGradient }}
					top="calc(50% - 7rem)"
					transition={{ type: "spring" }}
					w="13rem"
					zIndex={2}
				/>
				{playerRoundInfo &&
					(playerRoundInfo.live_bull_amount !== "0" ||
						playerRoundInfo.live_bear_amount !== "0") && (
						<Tag
							bg="rgb(255, 234, 94)"
							color="gray.800"
							fontFamily="heading"
							pos="absolute"
							right="0.5rem"
							shadow="rgba(255, 234, 94, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 234, 94) 0px 0px 15px inset"
							textTransform="capitalize"
							top={playerRoundInfo?.live_bull_amount !== "0" ? "2.75rem" : "17.75rem"}
						>
							Entered
						</Tag>
					)}
				<VStack left="calc(50% - 7.25rem)" pos="absolute" top="4rem" w="14.5rem" zIndex="2">
					<Heading color="white" fontFamily="number" fontSize="24">
						UP
					</Heading>
				</VStack>
				<Flex
					align={isFinishing ? "center" : "start"}
					bg="slate.700"
					flexDirection="column"
					gap={0}
					h="8rem"
					justify="center"
					left="calc(50% - 7.25rem)"
					pos="absolute"
					px={2}
					py={1}
					rounded="1em"
					shadow="md"
					top="calc(50% - 3rem)"
					w="15rem"
					zIndex={2}
				>
					{isFinishing ? (
						<Center h="8rem" left={-2} pos="relative" w="8rem">
							<RiveComponent src="/assets/spinner.riv" />
						</Center>
					) : (
						<VStack align="start" spacing={0} w="full">
							<Text fontSize="13">Current Price</Text>
							<Flex align="center" justifyContent="space-between" w="full">
								<HStack spacing={0.25}>
									<Heading fontFamily="number" fontSize="24">
										$
									</Heading>
									<Heading
										fontFamily="number"
										fontSize="24"
										h="2rem"
										letterSpacing={0.5}
										overflow="hidden"
										w="full"
									>
										<AnimatedNumbers
											animateToNumber={tokenPrice}
											configs={(number, index) => {
												return {
													friction: 200,
													mass: 1,
													tension: 800 * (index + 1)
												}
											}}
											includeComma
											locale="en-US"
										/>
									</Heading>
								</HStack>
								<Skeleton isLoaded={!isLoading} minW="4rem" rounded="1.25em">
									<Tag
										bg={
											tokenPrice === startPrice
												? "rgb(53, 62, 90)"
												: tokenPrice > startPrice
												? "rgb(14, 255, 100)"
												: "rgb(255, 106, 106)"
										}
										color={tokenPrice === startPrice ? "white" : "gray.800"}
										justifyContent="center"
										minW="4rem"
										shadow={
											tokenPrice === startPrice
												? "rgba(23, 32, 50, 0.4) 0px 0px 10px"
												: tokenPrice > startPrice
												? "rgba(18, 255, 125, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(59, 198, 14) 0px 0px 15px inset"
												: "rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset"
										}
										textAlign="center"
										transition="0.25s all"
									>
										<HStack spacing={0}>
											<Heading fontSize="13" h="1.5rem" overflow="hidden">
												<AnimatedNumbers
													animateToNumber={percentageChange}
													configs={(number, index) => {
														return {
															friction: 200 * (index + 1),
															mass: 1,
															tension: 800 * (index + 1)
														}
													}}
													includeComma
													locale="en-US"
												/>
											</Heading>
											<Heading fontSize="13">%</Heading>
										</HStack>
									</Tag>
								</Skeleton>
							</Flex>
							<Flex fontSize="13" justifyContent="space-between" pt={3} w="full">
								<Text>Start Price:</Text>
								<Text>${startPrice.toLocaleString("en-us", { currency: "USD" })}</Text>
							</Flex>
							<Flex fontSize="16" fontWeight="600" justifyContent="space-between" w="full">
								<Text>Prize Pool:</Text>
								<HStack spacing={0.5}>
									<Text>{shortenNumber(BigNumber(pricePool), 2)}</Text>
									<Image src="/assets/electron.png" w="1.2rem" />
								</HStack>
							</Flex>
						</VStack>
					)}
				</Flex>
				<VStack bottom="2.25rem" left="calc(50% - 7.25rem)" pos="absolute" w="14.5rem" zIndex="2">
					<Heading color="white" fontFamily="number" fontSize="24">
						DOWN
					</Heading>
				</VStack>
			</MotionFlex>
			<Flex
				flexDirection="column"
				gap={0}
				h="10rem"
				justify="center"
				as={motion.div}
				// bgSize="200% 200%"
				left="calc(50% - 7.5rem)"
				pos="absolute"
				px={3}
				py={1}
				rounded="1em"
				shadow="md"
				// @ts-expect-error types
				style={{ backgroundImage: bgFullColor }}
				top="calc(50% - 4rem)"
				w="15.5rem"
				zIndex={1}
			/>
		</MotionFlex>
	)
}
