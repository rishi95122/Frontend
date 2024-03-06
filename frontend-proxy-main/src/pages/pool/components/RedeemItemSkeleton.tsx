import { Avatar, Button, Flex, HStack, Icon, Skeleton, Text, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { FaClock } from "react-icons/fa"

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

export const RedeemItemSkeleton = () => {
	return (
		<Flex _dark={{ bg: "gray.700" }} bg="gray.700" px={2} py={2} rounded="1em" shadow="md" w="full">
			<VStack align="start" flex={1} fontSize="18" spacing={0.5} w="full">
				<Skeleton isLoaded={false} rounded="0.8em">
					<HStack>
						<Text>0.00</Text>
						<Avatar size="xs" src="" />
					</HStack>
				</Skeleton>
				<Skeleton isLoaded={false} rounded="0.8em">
					<HStack>
						<Text>0.00</Text>
						<Avatar size="xs" src="" />
					</HStack>
				</Skeleton>
			</VStack>
			<VStack align="end">
				<Skeleton isLoaded={false} rounded="0.8em">
					<HStack align="start" justify="end" spacing={1}>
						<Icon _dark={{ color: "white" }} as={FaClock} color="gray.700" />
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontFamily="mono"
							fontWeight="900"
							lineHeight="1"
							textAlign="end"
							w="10.5rem"
						>
							00 Days, 00:00:00
						</Text>
					</HStack>
				</Skeleton>
				<Skeleton isLoaded={false} rounded="0.8em">
					<Button
						_disabled={{
							_active: {
								bg: "whiteAlpha.200",
								color: "whiteAlpha.500",
								cursor: "not-allowed"
							},
							_dark: { bg: "whiteAlpha.200" },
							_focus: {
								bg: "whiteAlpha.200",
								color: "whiteAlpha.500",
								cursor: "not-allowed"
							},
							bg: "blackAlpha.300",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						}}
						_hover={{ bgSize: "150%" }}
						bgGradient="linear(45deg, brand.1, brand.2)"
						isDisabled
						rounded="1em"
						size="sm"
						transition="0.2s all"
					>
						Redeem
					</Button>
				</Skeleton>
			</VStack>
		</Flex>
	)
}
