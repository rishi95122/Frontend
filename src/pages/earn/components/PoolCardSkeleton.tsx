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
import { BannerIcon } from "components/Assets/earn/BannerIcon"
import { FarmIcon } from "components/Assets/FarmIcon"

export const PoolCardSkeleton = ({
	icon,
	bannerColor
}: {
	bannerColor: string
	icon: React.ReactNode
}) => {
	return (
		<Flex
			_dark={{
				bg: "gray.700",
				bgGradient: "linear(to-b, gray.600 1%, gray.700 80%)"
			}}
			align="start"
			bg="white"
			minH="20rem"
			pb={{ base: 10, md: 3 }}
			pos="relative"
			pt={3}
			px={3}
			rounded="1.25em"
			shadow="md"
			w={{ base: "full", md: "full" }}
		>
			<Flex direction="column" gap={2} w="full">
				<AvatarGroup>
					<SkeletonCircle h="4rem" w="4rem">
						<Avatar border="none" name="" size="lg" src="" />
					</SkeletonCircle>
					<SkeletonCircle h="4rem" pos="relative" right="3" w="4rem">
						<Avatar border="none" name="" size="lg" src="" />
					</SkeletonCircle>
				</AvatarGroup>
				<VStack align="start" h="full" spacing={0.5}>
					<Skeleton rounded="1em">
						<Heading fontSize="2xl" fontWeight="400">
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
								<Text fontFamily="heading" fontSize="20" ps={1}>
									Up to 000%
								</Text>
								<Avatar h="2rem" src="" w="2rem" />
							</HStack>
						</Skeleton>
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
						<Text fontFamily="heading">TVL</Text>
						<Skeleton isLoaded={false} rounded="1em" w="11rem">
							<Text fontFamily="heading" fontSize="20" ps={1}>
								$0
							</Text>
						</Skeleton>
					</HStack>
				</Flex>
				<Skeleton mt={2} rounded="1em">
					<Button
						_active={{
							filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 2px 6px rgba(2,226,150, 1))"
						}}
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
						rounded="0.9em"
						transition="all 0.5s"
					>
						Start Earning
					</Button>
				</Skeleton>
			</Flex>
			<BannerIcon bannerColor={bannerColor} icon={icon} right={3} top={-3} />
		</Flex>
	)
}
