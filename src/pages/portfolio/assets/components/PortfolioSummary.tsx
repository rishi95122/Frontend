import { Flex, Heading, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react"
import { useTotalBondedValue } from "@hooks/portfolio/query/useTotalBondedValue"
import { useTotalUnbondedValue } from "@hooks/portfolio/query/useTotalUnbondedValue"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"

export const PortfolioSummary = () => {
	const [tokenList] = useTokenList()
	const [totalBondedValue, isLoadingTotalBondedValue] = useTotalBondedValue()
	const [totalUnbondedValue, isLoadingTotalUnbondedValue] = useTotalUnbondedValue({
		tokenList: tokenList ?? []
	})

	return (
		<SimpleGrid
			_dark={{
				bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
			}}
			bg="gray.700"
			bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
			columns={{ base: 1, md: 4, sm: 2 }}
			px={4}
			py="1rem"
			rounded="1.25em"
			shadow="md"
			maxW="6xl"
			spacing={{ base: 2, lg: 10, md: 6, sm: 4 }}
			w="full"
		>
			<Flex
				_dark={{ bg: "gray.700" }}
				align="start"
				bg="gray.700"
				h="full"
				pos="relative"
				px={3}
				py={3}
				rounded="1.25em"
				shadow="md"
				w={{ base: "full", md: "full" }}
			>
				<VStack align="start" h="full" spacing={0} w="full">
					<Heading as="h2" fontSize="22" fontWeight="400" mb={1}>
						Total
					</Heading>
					<Flex align="center" flex={1} w="full">
						<Skeleton
							isLoaded={Boolean(!isLoadingTotalBondedValue && !isLoadingTotalUnbondedValue)}
							rounded="1em"
							w="full"
						>
							<Heading
								as="h1"
								bgClip="text"
								bgGradient="linear(45deg, brand.1, brand.2)"
								fontSize={{ base: "30", lg: "36" }}
								fontWeight="900"
								noOfLines={1}
							>
								{convertMicroDenomToDenom(totalBondedValue, 6)
									.plus(totalUnbondedValue)
									.toNumber()
									.toLocaleString("en-US", {
										currency: "USD",
										minimumFractionDigits: 2,
										style: "currency"
									})}
							</Heading>
						</Skeleton>
					</Flex>
				</VStack>
			</Flex>
			<Flex
				_dark={{ bg: "gray.700" }}
				align="start"
				bg="gray.700"
				h="full"
				pos="relative"
				px={3}
				py={3}
				rounded="1.25em"
				shadow="md"
				w={{ base: "full", md: "full" }}
			>
				<VStack align="start" h="full" spacing={0} w="full">
					<Heading as="h2" fontSize="22" fontWeight="400" mb={1}>
						Bonded
					</Heading>
					<Flex align="center" flex={1} w="full">
						<Skeleton isLoaded={Boolean(!isLoadingTotalBondedValue)} rounded="1em" w="full">
							<Heading
								as="h1"
								bgClip="text"
								bgGradient="linear(45deg, brand.1, brand.2)"
								fontSize={{ base: "30", lg: "36" }}
								fontWeight="900"
								noOfLines={1}
							>
								{`${convertMicroDenomToDenom(totalBondedValue, 6)
									.toNumber()
									.toLocaleString("en-US", {
										currency: "USD",
										minimumFractionDigits: 2,
										style: "currency"
									})}`}
							</Heading>
						</Skeleton>
					</Flex>
				</VStack>
			</Flex>
			<Flex
				_dark={{ bg: "gray.700" }}
				align="start"
				bg="gray.700"
				h="full"
				pos="relative"
				px={3}
				py={3}
				rounded="1.25em"
				shadow="md"
				w={{ base: "full", md: "full" }}
			>
				<VStack align="start" h="full" spacing={0} w="full">
					<Heading as="h2" fontSize="22" fontWeight="400" mb={1}>
						Unbonded
					</Heading>
					<Flex align="center" flex={1} w="full">
						<Skeleton isLoaded={Boolean(!isLoadingTotalUnbondedValue)} rounded="1em" w="full">
							<Heading
								as="h1"
								bgClip="text"
								bgGradient="linear(45deg, brand.1, brand.2)"
								fontSize={{ base: "30", lg: "36" }}
								fontWeight="900"
								noOfLines={1}
							>
								{totalUnbondedValue.toLocaleString("en-US", {
									currency: "USD",
									minimumFractionDigits: 2,
									style: "currency"
								})}
							</Heading>
						</Skeleton>
					</Flex>
				</VStack>
			</Flex>
			<Flex
				_dark={{ bg: "gray.700" }}
				align="start"
				bg="gray.700"
				h="full"
				pos="relative"
				px={3}
				py={3}
				rounded="1.25em"
				shadow="md"
				w={{ base: "full", md: "full" }}
			>
				<VStack align="start" h="full" spacing={0} w="full">
					<Heading as="h2" fontSize="22" fontWeight="400" mb={1}>
						Staked
					</Heading>
					<Flex align="center" flex={1}>
						<Heading
							as="h1"
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontSize="22"
							fontWeight="900"
						>
							Coming Soon
						</Heading>
					</Flex>
				</VStack>
			</Flex>
		</SimpleGrid>
	)
}
