/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable id-length */
import {
	Avatar,
	Box,
	Button,
	chakra,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	keyframes,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Spacer,
	Tag,
	Text,
	useToken,
	VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { type NextRound } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { type Variants } from "framer-motion"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { usePlayerPosition } from "hooks/games/prediction/query/usePlayerPosition"
import { useCreateBet } from "hooks/games/prediction/tx/useCreateBet"
import { useEffect, useState } from "react"
import { FaLongArrowAltLeft, FaPlayCircle } from "react-icons/fa"
import { NumericFormat } from "react-number-format"
import MotionFlex from "theme/motion/components/MotionFlex"
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(duration)

const cardVariants: Variants = {
	animate: { rotateY: 180 },
	initial: { rotateY: 0 }
}

const bgSpin = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}`

export const NextRoundCard = ({ roundInfo }: { roundInfo?: NextRound }) => {
	const [tokenBalance] = useTokenBalance("untrn")
	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const [flipped, setFlipped] = useState(false)
	const [betType, setBetType] = useState<"bear" | "bull">("bull")
	const [betAmount, setBetAmount] = useState("0")
	const [pricePool, setPricePool] = useState(0)
	const [sliderValue, setSliderValue] = useState(0)

	const [red500] = useToken("colors", ["red.500"])
	const gaps = [25, 50, 75, 100]

	const { mutate: createBet, isLoading: isCreatingBet } = useCreateBet(
		betType,
		roundInfo?.id!,
		betAmount
	)

	const [playerRoundInfo] = usePlayerPosition({
		roundId: roundInfo?.id ?? "0"
	})

	const flipCard = (flip?: boolean) => setFlipped((previousRevealed) => flip ?? !previousRevealed)

	const bgGradient = useMotionValue(`linear-gradient(
        0deg,
        hsl(225deg 30% 24%) 1%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 99%
  )`)

	useEffect(() => {
		if (!playerRoundInfo) {
			return
		}

		if (playerRoundInfo.next_bear_amount !== "0" || playerRoundInfo.next_bull_amount !== "0") {
			flipCard(false)
		}
	}, [playerRoundInfo])

	useEffect(() => {
		if (!roundInfo) {
			return
		}

		const pricePoolAmount = Number(roundInfo.bear_amount) + Number(roundInfo.bull_amount)

		setPricePool(convertMicroDenomToDenom(pricePoolAmount, 6).toNumber())
	}, [roundInfo])

	return (
		<MotionFlex
			animate={
				flipped
					? { rotateY: 180, transition: { duration: 0.5 } }
					: { rotateY: 0, transition: { duration: 0.5 } }
			}
			bg="gray.800"
			h="20rem"
			initial="initial"
			pos="relative"
			rounded="1em"
			shadow="md"
			variants={cardVariants}
			w="17rem"
			zIndex={100}
		>
			<AnimatePresence mode="wait">
				{flipped ? (
					<MotionFlex
						animate={{ opacity: 1, transition: { duration: 0.3 } }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
						flexDir="column"
						h="full"
						initial={{ opacity: 0, rotateY: 180 }}
						key="isFlipped"
						w="full"
					>
						<MotionFlex
							align="center"
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="white"
							gap={1}
							h="2rem"
							px={2}
							py={2}
							roundedTop="1em"
							w="full"
						>
							<HStack>
								<IconButton
									_active={{ bg: "whiteAlpha.600" }}
									_hover={{ bg: "whiteAlpha.700" }}
									aria-label="Go back to next game overview"
									bg="whiteAlpha.600"
									icon={<Icon as={FaLongArrowAltLeft} />}
									onClick={() => {
										flipCard()
									}}
									rounded="full"
									size="xs"
								/>
								<Text fontFamily="heading" fontSize="15" fontWeight="900">
									Create Bet
								</Text>
							</HStack>
							<Spacer />
							<Tag
								bg={betType === "bull" ? "rgb(14, 255, 100)" : "rgb(255, 106, 106)"}
								color="gray.800"
								shadow={
									betType === "bull"
										? "rgba(18, 255, 125, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(59, 198, 14) 0px 0px 15px inset"
										: "rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset"
								}
								textTransform="capitalize"
							>
								{betType}
							</Tag>
						</MotionFlex>
						<MotionFlex flex={1} flexDir="column" px={2} py={3}>
							<NumericFormat
								_invalid={{
									border: `1px solid ${red500}`
								}}
								allowLeadingZeros={false}
								allowNegative={false}
								bg="slate.700"
								color="white"
								customInput={Input}
								decimalScale={6}
								fontSize={{ base: "lg", sm: "24" }}
								fontWeight="bold"
								isInvalid={Number(betAmount) > tokenBalance.toNumber()}
								minH="3rem"
								onValueChange={(values) => {
									const { value } = values

									const valueMicroDenom = convertDenomToMicroDenom(value, 6)
									setBetAmount(valueMicroDenom.toString())
								}}
								placeholder="0"
								px={2}
								py={1}
								rounded="0.6em"
								textAlign="end"
								thousandSeparator=","
								value={convertMicroDenomToDenom(betAmount, 6).toString() ?? "0"}
								valueIsNumericString
								variant="unstyled"
								w="full"
							/>
							<HStack align="center" pb={3} spacing={0.5} w="full">
								<Text pt={1} textAlign="end" w="full">
									{shortenNumber(convertMicroDenomToDenom(tokenBalance, 6), 2)}
								</Text>
								<Image src="/assets/electron.png" w="1.25rem" />
							</HStack>
							<Box px={3}>
								<Slider
									max={100}
									min={0}
									onChange={(value) => {
										setSliderValue(value)
										setBetAmount(Number(Number(tokenBalance) * (value / 100)).toString())
									}}
									placeholder="0"
									size="md"
									step={0.1}
									value={sliderValue}
								>
									<SliderTrack _dark={{ bg: "gray.600" }} bg="gray.600" h="0.75rem" rounded="full">
										<SliderFilledTrack bgGradient="linear(45deg, brand.1, brand.2)" />
									</SliderTrack>
									<SliderThumb bg="offwhite.2" h={{ base: 5, sm: 5 }} w={{ base: 5, sm: 5 }} />
								</Slider>
							</Box>
							<SimpleGrid columns={{ base: 2, sm: 4 }} pt={3} spacing={2} w="full">
								{gaps.map((v) => (
									// eslint-disable-next-line react/jsx-key
									<Button
										_hover={{ filter: "brightness(110%)" }}
										bgGradient="linear(45deg,brand.1,brand.2)"
										fontFamily="heading"
										lineHeight={0.8}
										onClick={() => {
											setSliderValue(v)
											setBetAmount(Number((Number(tokenBalance) * v) / 100).toString())
										}}
										py={0}
										rounded="1.25em"
									>
										{v}%
									</Button>
								))}
							</SimpleGrid>
							<Spacer />
							<Button
								_hover={{ filter: "brightness(120%)" }}
								bg={betType === "bull" ? "rgb(14, 255, 100)" : "rgb(255, 106, 106)"}
								color="gray.800"
								fontFamily="heading"
								h="3rem"
								isLoading={isCreatingBet}
								mt={8}
								onClick={() => {
									createBet()
								}}
								rounded="0.8em"
								shadow={
									betType === "bull"
										? "rgba(18, 255, 125, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(59, 198, 14) 0px 0px 15px inset"
										: "rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset"
								}
								textTransform="capitalize"
								transition="0.2s all"
								w="full"
							>
								Create Bet
							</Button>
						</MotionFlex>
					</MotionFlex>
				) : (
					<MotionFlex
						animate={{ opacity: 1, transition: { duration: 0.3 } }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
						initial={{ opacity: 0 }}
						key="notFlipped"
						w="full"
					>
						<MotionFlex
							align="center"
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="white"
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
								bgGradient="linear(0deg, white, white)"
								fontFamily="heading"
								fontWeight="900"
								letterSpacing={0.9}
								textTransform="capitalize"
							>
								Next
							</Text>
							<Spacer />
							<Text fontFamily="heading">#{roundInfo?.id ?? 0}</Text>
						</MotionFlex>
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
						<VStack
							left="calc(50% - 7.25rem)"
							pos="absolute"
							spacing={1}
							top="4.25rem"
							w="14.5rem"
							zIndex="2"
						>
							<Heading
								bgClip="text"
								bgGradient="linear(0deg, green.300, green.500)"
								fontSize="24"
								lineHeight="0.9"
							>
								{shortenNumber(convertMicroDenomToDenom(roundInfo?.bull_amount ?? "0", 6), 2)}
							</Heading>
						</VStack>
						<MotionFlex
							bg="slate.700"
							flexDirection="column"
							gap={0}
							h="9rem"
							justify="center"
							left="calc(50% - 7.25rem)"
							pos="absolute"
							px={3}
							py={1}
							rounded="1em"
							top="calc(50% - 3.5rem)"
							w="14.5rem"
							zIndex={2}
						>
							{isWalletConnected &&
							(playerRoundInfo?.next_bull_amount !== "0" ||
								playerRoundInfo?.next_bear_amount !== "0") ? (
								<Flex align="center" flexDir="column" h="full" justify="center" py={3} w="full">
									<Heading fontSize="20">
										You are{" "}
										<chakra.span
											bgClip="text"
											bgGradient={
												playerRoundInfo?.next_bull_amount !== "0"
													? "linear(0deg, green.300, green.500)"
													: "linear(180deg, red.300, red.500)"
											}
											fontFamily="heading"
											fontWeight="900"
											textTransform="uppercase"
										>
											{playerRoundInfo?.next_bull_amount !== "0" ? "bull" : "bear"}
											ish
										</chakra.span>
									</Heading>

									<HStack justify="center" w="full">
										<Text>Your bet: </Text>
										<HStack>
											<Text fontFamily="heading" fontSize="1.2em" textAlign="center" w="full">
												{convertMicroDenomToDenom(
													Number(playerRoundInfo?.next_bear_amount) +
														Number(playerRoundInfo?.next_bull_amount),
													6
												).toFixed(0)}
											</Text>
											<Avatar h="1.25rem" src="/assets/electron.png" w="1.25rem" />
										</HStack>
									</HStack>
									<Spacer />
									<VStack justify="center" spacing={0} w="full">
										<Text fontFamily="heading" lineHeight="0.8">
											Chance to Win
										</Text>
										<HStack>
											{playerRoundInfo?.next_bull_amount !== "0" && (
												<Text fontFamily="heading" fontSize="1.2em" textAlign="center" w="full">
													{(
														(Number(playerRoundInfo?.next_bull_amount) /
															Number(roundInfo?.bull_amount)) *
														pricePool
													).toFixed(2)}
												</Text>
											)}
											{playerRoundInfo?.next_bear_amount !== "0" && (
												<Text fontFamily="heading" fontSize="1.2em" textAlign="center" w="full">
													{(Number(playerRoundInfo?.next_bear_amount) /
														Number(roundInfo?.bear_amount)) *
														pricePool}
												</Text>
											)}
											<Avatar h="1.25rem" src="/assets/electron.png" w="1.25rem" />
											<Text color="green.500" fontFamily="heading" fontWeight="900">
												(
												{Number(playerRoundInfo?.next_bull_amount) !== 0 && (
													<chakra.span px={0.5}>
														{convertDenomToMicroDenom(
															((Number(playerRoundInfo?.next_bull_amount) /
																Number(roundInfo?.bull_amount)) *
																pricePool) /
																Number(playerRoundInfo?.next_bull_amount),
															6
														).toString() + "x"}
													</chakra.span>
												)}
												{Number(playerRoundInfo?.next_bear_amount) !== 0 && (
													<chakra.span px={0.5}>
														{convertDenomToMicroDenom(
															((Number(playerRoundInfo?.next_bear_amount) /
																Number(roundInfo?.bear_amount)) *
																pricePool) /
																Number(playerRoundInfo?.next_bear_amount),
															6
														).toString() + "x"}
													</chakra.span>
												)}
												)
											</Text>
										</HStack>
									</VStack>
								</Flex>
							) : (
								<VStack pt={1} w="full">
									<Button
										_hover={{ filter: "brightness(120%)" }}
										bg="rgb(14, 255, 100)"
										color="gray.800"
										fontFamily="heading"
										onClick={() => {
											flipCard()
											setBetType("bull")
										}}
										rounded="0.8em"
										shadow="rgba(18, 225, 95, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(29, 198, 84) 0px 0px 15px inset"
										transition="0.2s all"
										w="full"
									>
										BTC Pumps
									</Button>
									<Button
										_hover={{ filter: "brightness(120%)" }}
										bg="rgb(255, 106, 106)"
										color="gray.800"
										fontFamily="heading"
										onClick={() => {
											flipCard()
											setBetType("bear")
										}}
										rounded="1em"
										shadow="rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset;"
										transition="0.2s all"
										w="full"
									>
										BTC Dumps
									</Button>
								</VStack>
							)}
						</MotionFlex>
						<Flex
							animation={`${bgSpin} infinite 2s linear`}
							bgGradient={
								playerRoundInfo
									? playerRoundInfo?.next_bull_amount !== "0"
										? "linear(45deg, green.600, green.400)"
										: playerRoundInfo?.next_bear_amount !== "0"
										? "linear(45deg, red.400, red.200)"
										: "linear(45deg, brand.1, brand.2)"
									: "linear(45deg, brand.1, brand.2)"
							}
							bgSize="200% 200%"
							flexDirection="column"
							gap={0}
							h="10rem"
							justify="center"
							left="calc(50% - 7.75rem)"
							pos="absolute"
							px={3}
							py={1}
							rounded="1em"
							shadow="md"
							top="calc(50% - 4rem)"
							w="15.5rem"
							zIndex={1}
						/>
						<VStack bottom="2rem" left="calc(50% - 7.25rem)" pos="absolute" w="14.5rem" zIndex="2">
							<Heading
								bgClip="text"
								bgGradient="linear(180deg, red.300, red.500)"
								fontSize="24"
								lineHeight="0.9"
							>
								{shortenNumber(convertMicroDenomToDenom(roundInfo?.bear_amount ?? "0", 6), 2)}
							</Heading>
						</VStack>
					</MotionFlex>
				)}
			</AnimatePresence>
		</MotionFlex>
	)
}
