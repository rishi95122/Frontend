import {
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
import { type FinishedRound } from "@fuzio/contracts/types/FuzioNativePrediction.types"
import { BigNumber } from "bignumber.js"
import { type Variants } from "framer-motion"
import { animate, motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import { FaBan } from "react-icons/fa"
import MotionFlex from "theme/motion/components/MotionFlex"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

const cardVariants: Variants = {
	animate: { rotateY: 180, transition: { duration: 0.75 } },
	initial: { rotateY: 0 }
}

export const PreviousRoundCard = ({
	roundInfo,
	isLoading
}: {
	isLoading: boolean
	roundInfo?: FinishedRound
}) => {
	const [startPrice, setStartPrice] = useState(0)
	const [percentageChange, setPercentageChange] = useState(0)
	const [pricePool, setPricePool] = useState(0)

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

		setStartPrice(Number(roundInfo.open_price))

		const changeValue = Number(
			(Number(roundInfo?.close_price) / Number(roundInfo?.open_price)) * 100 - 100
		)

		const pricePoolAmount = Number(roundInfo.bear_amount) + Number(roundInfo.bull_amount)

		setPercentageChange(Number(changeValue.toFixed(2)))
		setPricePool(convertMicroDenomToDenom(pricePoolAmount, 6).toNumber())

		if (Number(roundInfo.open_price) < Number(roundInfo.close_price)) {
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
		} else if (Number(roundInfo.close_price) === Number(roundInfo.open_price)) {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roundInfo])

	return (
		<MotionFlex
			bg="gray.800"
			h="20rem"
			initial="initial"
			opacity={0.6}
			pos="relative"
			rounded="1em"
			shadow="md"
			variants={cardVariants}
			w="17rem"
			whileHover={{ opacity: 1 }}
			zIndex={100}
		>
			<MotionFlex
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				key="notFlipped"
				w="full"
			>
				<MotionFlex
					align="center"
					bg="slate.800"
					color="gray.300"
					gap={1}
					h="2rem"
					px={2}
					py={2}
					roundedTop="1em"
					w="full"
				>
					<Icon as={FaBan} />
					<Text
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontFamily="heading"
						fontWeight="900"
						letterSpacing={0.9}
						textTransform="capitalize"
					>
						Expired
					</Text>
					<Spacer />
					<Skeleton isLoaded={!isLoading} rounded="1.25em">
						<Text fontFamily="heading">#{roundInfo?.id ?? "000"}</Text>
					</Skeleton>
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
				<VStack left="calc(50% - 7.25rem)" pos="absolute" top="4rem" w="14.5rem" zIndex="2">
					<Heading color="white" fontFamily="number" fontSize="24">
						UP
					</Heading>
				</VStack>
				<Flex
					bg="slate.700"
					flexDirection="column"
					gap={0}
					h="8rem"
					justify="center"
					left="calc(50% - 7.25rem)"
					pos="absolute"
					px={3}
					py={1}
					rounded="1em"
					shadow="md"
					top="calc(50% - 3rem)"
					w="15rem"
					zIndex={2}
				>
					<Text fontSize="13">Closed Price</Text>
					<Flex align="center" justifyContent="space-between">
						<Heading fontFamily="number" fontSize="24">
							$
							{Number(roundInfo?.close_price ?? 0).toLocaleString("en-us", {
								currency: "USD",
								maximumFractionDigits: 2
							})}
						</Heading>
						<Skeleton isLoaded={!isLoading} minW="4rem" rounded="1.25em">
							<Tag
								bg={
									Number(roundInfo?.close_price) === startPrice
										? "rgb(53, 62, 90)"
										: Number(roundInfo?.close_price) > startPrice
										? "rgb(134, 244, 84)"
										: "rgb(255, 106, 106)"
								}
								color="gray.800"
								justifyContent="center"
								minW="4rem"
								shadow={
									Number(roundInfo?.close_price) === startPrice
										? "rgba(23, 32, 50, 0.4) 0px 0px 10px"
										: Number(roundInfo?.close_price) > startPrice
										? "rgba(118, 255, 25, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(59, 198, 14) 0px 0px 15px inset"
										: "rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset"
								}
							>
								<HStack spacing={0}>
									<Heading fontSize="13">{percentageChange}</Heading>
									<Heading fontSize="13">%</Heading>
								</HStack>
							</Tag>
						</Skeleton>
					</Flex>
					<Flex fontSize="13" justifyContent="space-between" pt={3}>
						<Text>Start Price:</Text>
						<Text>${startPrice.toLocaleString("en-us", { currency: "USD" })}</Text>
					</Flex>
					<Flex fontSize="16" fontWeight="600" justifyContent="space-between">
						<Text>Prize Pool:</Text>
						<HStack spacing={0.5}>
							<Text>{shortenNumber(BigNumber(pricePool), 2)}</Text>
							<Image src="/assets/electron.png" w="1.5rem" />
						</HStack>
					</Flex>
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
