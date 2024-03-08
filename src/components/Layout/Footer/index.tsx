import {
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Link,
	Spacer,
	Stack,
	Text
} from "@chakra-ui/react"
import DefaultToast from "@components/Toasts/DefaultToast"
// import { useTokenDollarPrice } from "hooks/swap/useTokenDollarPrice"
import { FaArrowRight, FaDiscord, FaTelegramPlane, FaTwitter } from "react-icons/fa"
// import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Footer = () => {
	// const [tokenDollarPrice] = useTokenDollarPrice({
	//   token: TokenType["Unknown"]
	// })

	const handleBuyButtonClick = () => {
		toast(<DefaultToast isPromise={false} toastText="Coming soon!" />, {
			autoClose: 5_000,
			progressStyle: {
				background: "rgba(2, 226, 150, 1)",
				boxShadow: "var(--chakra-shadows-md)",
				height: "0.6rem"
			},
			type: "default"
		})
	}

	// const navigate = useNavigate()

	return (
		<Flex
			_dark={{
				bg: "gray.800"
			}}
			align="center"
			bg="white"
			flexDir="column"
			justify="center"
			pos="relative"
			w="full"
		>
			<Flex
				justify="center"
				pos={{ base: "relative", md: "absolute" }}
				right={{ base: "0rem", lg: "5rem", md: "5rem" }}
				top="1rem"
			>
				<Image alt="Electron Logo" height="5rem" src="/assets/electron.png" width="4rem" />
			</Flex>
			<Stack
				align={{ base: "center", md: "space-between" }}
				direction={{
					base: "column",
					md: "row"
				}}
				justify={{ base: "center", md: "space-between" }}
				maxW={{ base: "none", lg: "75%" }}
				pt={{ base: 3, md: 10 }}
				px={10}
				w={{ base: "100%", md: "75%" }}
			>
				<Stack
					_dark={{
						color: "white"
					}}
					alignItems="start"
					color="gray.800"
					direction={{
						base: "column",
						md: "row"
					}}
					flex={1}
					fontSize={{
						base: "14px",
						md: "1em"
					}}
					gap={{ base: "1rem", md: "3rem" }}
					justify="center"
					py={4}
					textAlign={{
						base: "center",
						md: "left"
					}}
				>
					<Flex direction="column" justify="center" w="full">
						<Heading
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontSize="18"
							fontWeight="600"
							letterSpacing={1.2}
							pb={2}
						>
							ABOUT
						</Heading>
						<Link href="https://t.me/Electronnetworkofficial" target="_blank">
							Community
						</Link>
					</Flex>
					<Flex direction="column" justify="center" w="full">
						<Heading
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontSize="18"
							fontWeight="600"
							letterSpacing={1.2}
							pb={2}
						>
							HELP
						</Heading>
						<Link href="https://t.me/Electronnetworkofficial" target="_blank">
							Troubleshooting
						</Link>
					</Flex>
					<Flex direction="column" justify="center" w="full">
						<Heading
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontSize="18"
							fontWeight="600"
							letterSpacing={1.2}
							pb={2}
						>
							DEVELOPERS
						</Heading>
						<Link href="https://github.com/Electron-Protocol/" target="_blank">
							GitHub
						</Link>
					</Flex>
				</Stack>
			</Stack>
			<HStack
				alignSelf="center"
				justify={{ base: "center", md: "center" }}
				maxW={{ lg: "45%", md: "none" }}
				px={14}
				py={3}
				spacing={1}
				w={{ base: "100%", md: "45%" }}
			>
				<Link href="https://electron.network/social/telegram" target="_blank">
					<IconButton
						_dark={{
							_hover: {
								bg: "gray.700"
							},
							bg: "gray.800",
							color: "white"
						}}
						_hover={{ bg: "offwhite.3" }}
						aria-label="Electron Telegram"
						bg="transparent"
						color="gray.800"
						icon={<FaTelegramPlane size="20" />}
						rounded="1em"
					/>
				</Link>
				<Link href="https://x.com/Electronnetwork" target="_blank">
					<IconButton
						_dark={{
							_hover: {
								bg: "gray.700"
							},
							bg: "gray.800",
							color: "white"
						}}
						_hover={{ bg: "offwhite.3" }}
						aria-label="Electron X Account"
						bg="transparent"
						color="gray.800"
						icon={<FaTwitter size="20" />}
						rounded="1em"
					/>
				</Link>
				<Link href="https://electron.network/social/discord" target="_blank">
					<IconButton
						_dark={{
							_hover: {
								bg: "gray.700"
							},
							bg: "gray.800",
							color: "white"
						}}
						_hover={{ bg: "offwhite.3" }}
						aria-label="Join the Electron Discord"
						bg="transparent"
						color="gray.800"
						icon={<FaDiscord size="20" />}
						rounded="1em"
					/>
				</Link>
			</HStack>
			<Divider
				bgGradient="linear(45deg, brand.1, brand.2)"
				border="none"
				h="0.2rem"
				maxW={{ base: "none", md: "75%" }}
				rounded="full"
				w={{ base: "80%", md: "75%" }}
			/>
			<Stack
				align="center"
				direction={{ base: "column", md: "row" }}
				justify="start"
				maxW={{ base: "none", md: "75%" }}
				py={3}
				spacing={{ base: 0.5, md: 4 }}
				w={{ base: "80%", md: "75%" }}
			>
				<HStack spacing={4}>
					<Text fontFamily="heading">Electron v{import.meta.env.VITE_APPVERSION}</Text>
				</HStack>
				<Spacer />
				<HStack spacing={4}>
					<HStack spacing={2}>
						{/* <Image h="1.5rem" src="/assets/electron.png" w="1.5rem" /> */}
						{/* <Text fontWeight="600">
              ${convertMicroDenomToDenom(tokenDollarPrice ?? 0, 6).toFixed(3)}
            </Text> */}
					</HStack>
					<Button
						_active={{
							filter: "brightness(90%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
						}}
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						h="2rem"
						// onClick={() => navigate("/trade/swap?from=ntrn&to=Unknown")}
						onClick={() => handleBuyButtonClick()}
						py={0}
						rightIcon={<FaArrowRight />}
						rounded="full"
						transition="all 0.2s"
					>
						Buy Electron
					</Button>
				</HStack>
			</Stack>
		</Flex>
	)
}
