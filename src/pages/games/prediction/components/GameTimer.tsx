import { Flex, Heading, HStack } from "@chakra-ui/react"
import { type FormattedRes } from "ahooks/lib/useCountDown"

export const GameTimer = ({ time }: { time: FormattedRes }) => {
	return (
		<Flex
			align="center"
			bg="slate.700"
			gap={0}
			h="3rem"
			overflow="hidden"
			px={3}
			rounded="1em"
			shadow="md"
			w="8rem"
		>
			{((time.minutes !== 0 && time.seconds !== 0) || (time.minutes <= 1 && time.seconds >= 6)) && (
				<HStack w="full">
					<Heading
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						filter="drop-shadow(0 0 0.3rem rgba(81, 167, 233, 1))"
						fontFamily="number"
						fontSize="24"
						fontWeight="900"
						textAlign="center"
						w="full"
					>
						{time.minutes.toLocaleString(undefined, {
							minimumIntegerDigits: 2
						})}
						:
						{time.seconds.toLocaleString(undefined, {
							minimumIntegerDigits: 2
						})}
					</Heading>
				</HStack>
			)}
			{time.minutes === 0 && time.seconds <= 5 && (
				<Heading
					bgClip="text"
					bgGradient="linear(45deg, brand.1, brand.2)"
					filter="drop-shadow(0 0 0.2rem rgba(41, 147, 203, 1))"
					fontFamily="number"
					fontSize="18"
					fontWeight="900"
					textAlign="center"
					w="full"
				>
					Round Ending
				</Heading>
			)}
		</Flex>
	)
}
