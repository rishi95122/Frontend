import { Box, Divider, Flex, HStack, Skeleton, Text, useColorModeValue } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { tokenSwapState } from "state/swapState"

export const Rate = ({ tokenInputValue }: { tokenInputValue: string }) => {
	const { from, to } = useRecoilValue(tokenSwapState)

	return (
		<Box bg={useColorModeValue("offwhite.2", "gray.800")} p={6} rounded="1em" shadow="lg">
			<Flex
				align="start"
				color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
				fontSize={{ md: "lg" }}
				fontWeight="bold"
				justify="space-between"
				mb={1}
			>
				<Text flex={1} mr={2}>
					Rate
				</Text>
				{from && to ? (
					<HStack as="span" justify="end" maxW={{ base: 56, sm: "initial" }} wrap="wrap">
						<Text>{`${tokenInputValue} ${from.token?.fullName}`}</Text>
						<Text>=</Text>
						<Text>0 {from.token?.fullName}</Text>
					</HStack>
				) : (
					<Skeleton h={{ base: 6, sm: 8 }} w={{ base: 32, sm: 48 }} />
				)}
			</Flex>
			<Flex justify="end" mb={4}>
				{from.token && to.token ? (
					<HStack
						as="span"
						// eslint-disable-next-line react-hooks/rules-of-hooks
						color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
						fontSize={{ base: "sm", md: "md" }}
						fontWeight="bold"
						justify="end"
						maxW={{ base: 56, sm: "initial" }}
						wrap="wrap"
					>
						<Text>3.265358&ensp;{to.token?.fullName}</Text>
						<Text>=</Text>
						<Text>
							{tokenInputValue}&ensp;{from.token?.fullName}
						</Text>
					</HStack>
				) : (
					<Skeleton h={{ base: 4, sm: 6 }} w={{ base: 28, sm: 40 }} />
				)}
			</Flex>
			<Flex
				color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
				fontSize={{ md: "lg" }}
				fontWeight="bold"
				justify="space-between"
			>
				<Text>Swap Fee</Text>
				<Text>0.3%</Text>
			</Flex>
			<Divider
				borderColor={useColorModeValue("blackAlpha.400", "whiteAlpha.600")}
				my={{ base: 4, md: 6 }}
			/>
			<Flex
				color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}
				fontSize={{ md: "lg" }}
				fontWeight="bold"
				justify="space-between"
			>
				<Text>Estimated Slippage</Text>
				<Text>&lt;&nbsp;0.001%</Text>
			</Flex>
		</Box>
	)
}
