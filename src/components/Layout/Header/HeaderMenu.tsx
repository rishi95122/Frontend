import { HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
// import { CGWhite } from "components/Assets/CGWhite"
import { BsThreeDots } from "react-icons/bs"
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"

export const HeaderMenu = () => {
	return (
		<Menu>
			<MenuButton
				_active={{ bg: "blackAlpha.500" }}
				_dark={{
					_active: { bg: "whiteAlpha.400" },
					_hover: { bg: "whiteAlpha.300" },
					bg: "whiteAlpha.200"
				}}
				_hover={{ bg: "blackAlpha.400" }}
				as={IconButton}
				bg="blackAlpha.300"
				icon={<BsThreeDots />}
				p={0}
				rounded="full"
				shadow="md"
				size="sm"
			/>
			<MenuList
				_dark={{ bgGradient: "linear(to-b, gray.700, gray.800)" }}
				bg="white"
				border="none"
				overflow="hidden"
				py={0}
				rounded="1em"
				shadow="md"
			>
				{/* <MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://io.gitbook.io/documents"
					icon={<FaBook size="18" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">Documentation</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem> */}
				<MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://github.com/Electron-Protocol"
					icon={<FaGithub size="18" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">Github</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem>
				{/* <MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://www.coingecko.com/en/coins/Electronnetwork"
					icon={<CGWhite h="1.2rem" w="1.2rem" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">CoinGecko</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem> */}
				<MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://electron.network/social/telegram"
					icon={<FaTelegram size="18" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">Telegram</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem>
				<MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://x.com/Electronnetwork"
					icon={<FaTwitter size="18" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">Twitter</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem>
				<MenuItem
					_dark={{ _hover: { bg: "whiteAlpha.200" } }}
					_hover={{ bg: "blackAlpha.100" }}
					as="a"
					bg="transparent"
					href="https://electron.network/social/discord"
					icon={<FaDiscord size="18" />}
					target="_blank"
				>
					<HStack>
						<Text w="full">Discord</Text>
						<HiExternalLink />
					</HStack>
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
