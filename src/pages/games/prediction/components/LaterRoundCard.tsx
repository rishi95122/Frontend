import { Flex, Heading, Icon, keyframes, Spacer, Text } from "@chakra-ui/react"
import { type FormattedRes } from "ahooks/lib/useCountDown"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { type Variants } from "framer-motion"
import { motion, useMotionValue } from "framer-motion"
import { FaClock } from "react-icons/fa"
import MotionFlex from "theme/motion/components/MotionFlex"

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(duration)

const cardVariants: Variants = {
	animate: { rotateY: 180, transition: { duration: 0.75 } },
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

export const LaterRoundCard = ({ time, id }: { id: number; time: FormattedRes }) => {
	const timePlusFiveMinutes = { ...time, minutes: time.minutes + 5 }
	const bgGradient = useMotionValue(`linear-gradient(
        0deg,
        hsl(225deg 30% 24%) 1%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 50%,
        hsl(225deg 30% 24%) 99%
      )`)

	return (
		<MotionFlex
			animate={{ rotateY: 0, transition: { duration: 0.75 } }}
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
			<MotionFlex
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				key="notFlipped"
				w="full"
			>
				<MotionFlex
					align="center"
					bg="slate.700"
					color="brand.1"
					gap={1}
					h="2rem"
					px={2}
					py={2}
					roundedTop="1em"
					w="full"
				>
					<Icon as={FaClock} />
					<Text
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontFamily="heading"
						fontWeight="900"
						letterSpacing={0.9}
						textTransform="capitalize"
					>
						Later
					</Text>
					<Spacer />
					<Text fontFamily="heading">#{id}</Text>
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
					align="center"
					animate={{ opacity: 1 }}
					borderRadius="0"
					clipPath="url(#myClip)"
					exit={{ opacity: 0 }}
					h="16rem"
					initial={{ opacity: 0 }}
					justify="center"
					left="calc(50% - 6.5rem)"
					pos="absolute"
					style={{ backgroundImage: bgGradient }}
					top="calc(50% - 7rem)"
					transition={{ type: "spring" }}
					w="13rem"
					zIndex={2}
				/>
				<Flex
					bg="slate.800"
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
					w="14.5rem"
					zIndex={2}
				>
					<Text fontSize="13" textAlign="center" w="full" zIndex={2}>
						Game starts in:
					</Text>
					<Heading fontSize="32" textAlign="center" w="full" zIndex={2}>
						{timePlusFiveMinutes.minutes.toLocaleString(undefined, {
							minimumIntegerDigits: 2
						})}
						:
						{timePlusFiveMinutes.seconds.toLocaleString(undefined, {
							minimumIntegerDigits: 2
						})}
					</Heading>
				</Flex>
				<Flex
					animation={`${bgSpin} infinite 2s linear`}
					bgGradient="linear(45deg, brand.1, brand.2)"
					bgSize="200% 200%"
					flexDirection="column"
					gap={0}
					h="10rem"
					justify="center"
					left="calc(50% - 7.48rem)"
					pos="absolute"
					px={3}
					py={1}
					rounded="1em"
					shadow="md"
					top="calc(50% - 4rem)"
					w="15rem"
					zIndex={1}
				/>
			</MotionFlex>
		</MotionFlex>
	)
}
