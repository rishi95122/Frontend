import { type IDOCardType } from "../types"
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useColorModeValue,
	VStack
} from "@chakra-ui/react"

export const IDOCard = ({ bannerImages, fullName, logo, shortDesc, tokenSymbol }: IDOCardType) => {
	return (
		<Box bg="gray.800" maxW="sm" overflow="hidden" rounded="1em" w="full">
			<Image h="10rem" objectFit="cover" src={bannerImages[0]} w="full" />
			<Flex align="center" gap={0} justify="start" mt={-12} px={4}>
				<Image bg="gray.700" roundedStart="2xl" src={logo} w="5rem" />
				<VStack
					align="start"
					backdropFilter="blur(12px)"
					h="5rem"
					justify="center"
					overflow="hidden"
					px={4}
					py={2}
					roundedEnd="2xl"
					spacing={0}
					w="full"
				>
					<Heading
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontSize="2xl"
						fontWeight={500}
					>
						{fullName}
					</Heading>
					<Text>${tokenSymbol}</Text>
				</VStack>
			</Flex>
			<Box p={6}>
				<Stack align="center" mb={5} spacing={0}>
					<Text color="gray.500">{shortDesc}</Text>
				</Stack>
				<Stack direction="row" justify="center" spacing={6}>
					<Stack align="center" spacing={0}>
						<Text fontWeight={600}>23k</Text>
						<Text color="gray.500" fontSize="sm">
							Followers
						</Text>
					</Stack>
					<Stack align="center" spacing={0}>
						<Text fontWeight={600}>23k</Text>
						<Text color="gray.500" fontSize="sm">
							Followers
						</Text>
					</Stack>
				</Stack>
				<Button
					_hover={{
						boxShadow: "lg",
						transform: "translateY(-2px)"
					}}
					bg={useColorModeValue("#151f21", "gray.900")}
					color="white"
					mt={8}
					rounded="md"
					w="full"
				>
					Follow
				</Button>
			</Box>
		</Box>
	)
}
