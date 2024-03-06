import {
	Avatar,
	AvatarGroup,
	Button,
	chakra,
	Flex,
	Heading,
	HStack,
	Skeleton,
	SkeletonCircle,
	Text,
	VStack
} from "@chakra-ui/react"
import { FarmIcon } from "components/Assets/FarmIcon"

export const MyPoolCardSkeleton = () => {
	return (
		<Flex
			_dark={{
				bg: "gray.700",
				bgGradient: "linear(to-br, gray.600 1%, gray.700 80%)"
			}}
			align="start"
			bg="white"
			pb={{ base: 10, md: 3 }}
			pos="relative"
			pt={3}
			px={3}
			rounded="1.25em"
			shadow="md"
			w={{ base: "full", md: "full" }}
		>
			<Flex direction="column" flex={1} gap={2} h="full" w="full">
				<HStack>
					<AvatarGroup>
						<SkeletonCircle h="3.5rem" w="3.5rem">
							<Avatar border="none" name="" size="md" src="" />
						</SkeletonCircle>
						<SkeletonCircle h="3.5rem" pos="relative" right="3" w="3.5rem">
							<Avatar border="none" name="" src="" />
						</SkeletonCircle>
					</AvatarGroup>
					<VStack align="start" h="full" spacing={0.5}>
						<Skeleton rounded="1em">
							<Heading fontSize="xl" fontWeight="400">
								Token 1
								<chakra.span color="gray.400" fontWeight="900" px="4px">
									/
								</chakra.span>
								Token 2
							</Heading>
						</Skeleton>
						<Skeleton rounded="1em">
							<Text fontSize="lg">
								<chakra.span color="gray.400" fontSize="sm" fontWeight="900" pe="2px">
									#
								</chakra.span>
								00
							</Text>
						</Skeleton>
					</VStack>
				</HStack>
				<Flex direction="column" flex={1} gap={2} h="full" w="full">
					<HStack
						_dark={{ bg: "gray.800", color: "white" }}
						bg="offwhite.2"
						color="gray.800"
						h="3rem"
						justify="space-between"
						px={3}
						py={1}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<Text fontFamily="heading">APR</Text>
						<Skeleton isLoaded={false} overflow="hidden" rounded="1em" w="11rem">
							<HStack>
								<Text fontSize="20">Up to 000%</Text>
								<Avatar h="2rem" src="" w="2rem" />
							</HStack>
						</Skeleton>
					</HStack>
					<HStack
						_dark={{ bg: "gray.800", color: "white" }}
						bg="offwhite.2"
						color="gray.800"
						justify="space-between"
						px={3}
						py={1}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<VStack align="start">
							<Text fontFamily="heading">Unbonded</Text>
							<Text fontFamily="heading">Bonded</Text>
							<Text fontFamily="heading">Redeemable</Text>
						</VStack>
						<VStack align="end">
							<Skeleton isLoaded={false} rounded="1em">
								<HStack>
									<Text
										bgClip="text"
										bgGradient="linear(45deg, brand.1, brand.2)"
										fontFamily="heading"
										ps={1}
									>
										{Number(0).toLocaleString("en-US", {
											currency: "USD",
											minimumFractionDigits: 2,
											style: "currency"
										})}
									</Text>
								</HStack>
							</Skeleton>
							<Skeleton isLoaded={false} rounded="1em">
								<HStack>
									<Text
										bgClip="text"
										bgGradient="linear(45deg, brand.1, brand.2)"
										fontFamily="heading"
										ps={1}
									>
										{Number(0).toLocaleString("en-US", {
											currency: "USD",
											minimumFractionDigits: 2,
											style: "currency"
										})}
									</Text>
								</HStack>
							</Skeleton>
							<Skeleton isLoaded={false} rounded="1em">
								<HStack>
									<Text
										bgClip="text"
										bgGradient="linear(45deg, brand.1, brand.2)"
										fontFamily="heading"
										ps={1}
									>
										{Number(0).toLocaleString("en-US", {
											currency: "USD",
											minimumFractionDigits: 2,
											style: "currency"
										})}
									</Text>
								</HStack>
							</Skeleton>
						</VStack>
					</HStack>
					<HStack
						_dark={{ bg: "gray.800", color: "white" }}
						bg="offwhite.2"
						color="gray.800"
						h="3rem"
						justify="space-between"
						px={3}
						py={1}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<Text fontFamily="heading">Rewards</Text>
						<Skeleton isLoaded={false} rounded="1em">
							<HStack>
								<Text fontSize={20}>
									<chakra.span
										bgClip="text"
										bgGradient="linear(45deg, brand.1, brand.2)"
										fontFamily="heading"
										fontSize="20"
										ps={1}
									>
										0.00
									</chakra.span>
								</Text>
								<Avatar h="2rem" src="" w="2rem" />
							</HStack>
						</Skeleton>
					</HStack>
				</Flex>
				<HStack justify="center" mt={2} w="full">
					<Skeleton isLoaded={false} rounded="1em" w="full">
						<Button
							_active={{
								filter: "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							_hover={{
								filter: "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="gray.800"
							fontSize="16"
							leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
							rounded="0.9em"
							transition="all 0.25s"
							w="full"
						/>
					</Skeleton>
					<Skeleton isLoaded={false} rounded="1em" w="full">
						<Button
							_active={{
								filter: "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							_hover={{
								filter: "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="gray.800"
							fontSize="16"
							leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
							rounded="0.9em"
							transition="all 0.25s"
							w="full"
						/>
					</Skeleton>
					<Skeleton isLoaded={false} rounded="1em" w="full">
						<Button
							_active={{
								filter: "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							_hover={{
								filter: "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
							}}
							aria-label="Claim Pool Rewards"
							bgGradient="linear(45deg, brand.1, brand.2)"
							color="gray.800"
							fontSize="16"
							leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
							rounded="0.9em"
							transition="all 0.25s"
						/>
					</Skeleton>
				</HStack>
			</Flex>
		</Flex>
	)
}
