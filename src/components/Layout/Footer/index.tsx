import { Box, Flex, Icon } from "@chakra-ui/react"
import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export const Footer = () => {
	return (
		<Box display={{ base: "flex", md: "none" }}>
			<Flex
				pos="fixed"
				bottom="0.8rem"
				left="0"
				right="0"
				justifyContent="center"
				pl={{ base: 4, md: 9, sm: 20 }} // Padding left responsive
				pt={{ base: 2, md: 9, sm: 2 }} // Padding top responsive
			>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href=""
					target="_blank"
					alignItems="center" // Align items vertically
					justifyContent="center" // Align items horizontally
					mx={2} // Add margin between icons
				>
					<Icon as={FaXTwitter} h="1.2rem" w="1.2rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href=""
					target="_blank"
					alignItems="center" // Align items vertically
					justifyContent="center" // Align items horizontally
					mx={2} // Add margin between icons
				>
					<Icon as={FaDiscord} h="1.5rem" w="1.5rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href=""
					target="_blank"
					alignItems="center" // Align items vertically
					justifyContent="center" // Align items horizontally
					mx={2} // Add margin between icons
				>
					<Icon as={FaTelegram} h="1.3rem" w="1.3rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href=""
					target="_blank"
					alignItems="center" // Align items vertically
					justifyContent="center" // Align items horizontally
					mx={2} // Add margin between icons
				>
					<Icon as={FaGithub} h="1.3rem" w="1.3rem" />
				</Flex>
			</Flex>
		</Box>
	)
}
