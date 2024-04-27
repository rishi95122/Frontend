import { Box, Flex, Icon, useBreakpoint } from "@chakra-ui/react"
import { FaGithub, FaMedium, FaTelegram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export const Footer = () => {
	const breakpoint = useBreakpoint({ ssr: false })

	return (
		<Box display={{ base: "flex", md: "none" }} flexDirection="column" alignItems="center">
			<Flex justifyContent="center">
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://twitter.com/Hopers_io"
					target="_blank"
					alignItems="center"
					justifyContent="center"
					mx={2}
					mb={2}
				>
					<Icon as={FaXTwitter} h="1.2rem" w="1.2rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://t.me/hoperscommunity"
					target="_blank"
					alignItems="center"
					justifyContent="center"
					mx={2}
					mb={2}
				>
					<Icon as={FaTelegram} h="1.2rem" w="1.2rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://medium.com/@Electron-Protocol"
					target="_blank"
					alignItems="center"
					justifyContent="center"
					mx={2}
					mb={2}
				>
					<Icon as={FaMedium} h="1.3rem" w="1.3rem" />
				</Flex>
				<Flex
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://github.com/Electron-Protocol"
					target="_blank"
					alignItems="center"
					justifyContent="center"
					mx={2}
					mb={2}
				>
					<Icon as={FaGithub} h="1.3rem" w="1.3rem" />
				</Flex>
			</Flex>
			{(breakpoint === "base" || breakpoint === "sm") && (
				<p style={{ fontSize: "0.65rem" }} className="text-center text-white mt-2">
					&copy; Electron 2024. All rights reserved.
				</p>
			)}
		</Box>
	)
}
