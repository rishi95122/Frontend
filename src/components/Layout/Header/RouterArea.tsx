import { type NavigationButtonProps } from "./NavigationButton"
import NavigationButton from "./NavigationButton"
import {
	Accordion,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerOverlay,
	Flex,
	HStack,
	Icon,
	IconButton,
	Text,
	useBreakpoint,
	useDisclosure
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
// import { CGWhite } from "components/Assets/CGWhite"
import { LiquidityIcon } from "components/Assets/earn/LiquidityIcon"
import { FarmIcon } from "components/Assets/FarmIcon"
import { PortfolioIcon } from "components/Assets/portfolio/PortfolioIcon"
import { SwapIcon } from "components/Assets/SwapIcon"
import ConnectButton from "components/ConnectButton"
import { motion } from "framer-motion"
import { type ReactElement } from "react"
import { useCallback, useEffect, useMemo } from "react"
import { FaBook, FaDiscord, FaGithub, FaTelegram, FaTwitter, FaUser } from "react-icons/fa"
import { FaHouseLock } from "react-icons/fa6"
import { HiExternalLink, HiOutlineMenuAlt3 } from "react-icons/hi"
import { MdHowToVote } from "react-icons/md"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeIndexState, activeRouteState } from "state/UIState"

export const RouterArea = () => {
	const location = useLocation()
	const [, setActiveRoute] = useRecoilState(activeRouteState)
	const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState)

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	// @ts-expect-error types
	const data: NavigationButtonProps[] = useMemo(() => {
		return [
			{
				icon: <Icon as={SwapIcon} h="full" w="full" zIndex={1} />,
				isDisabled: false,
				label: "Trade",
				navId: 0,
				subLinks: {
					Pools: {
						icon: <Icon as={FarmIcon} h="1.5rem" w="1.5rem" zIndex={1} />,
						url: "/pools"
					},
					Swap: {
						icon: <Icon as={SwapIcon} h="1.5rem" w="1.5rem" zIndex={1} />,
						url: "/swap"
					}
				},
				url: "/trade"
			},
			{
				icon: <Icon as={PortfolioIcon} h="full" w="full" zIndex={1} />,
				isDisabled: false,
				label: "Assets",
				navId: 3,
				url: "/portfolio/assets"
			},
			{
				icon: <Icon as={FaHouseLock} h="full" w="full" zIndex={1} />,
				isDisabled: true,
				label: "Staking",
				navId: 4,
				url: "/governance"
			},
			{
				icon: <Icon as={MdHowToVote} h="full" w="full" zIndex={1} />,
				isDisabled: true,
				label: "Governance",
				navId: 3,
				url: "/governance"
			},
			{
				icon: <Icon as={FaUser} h="full" w="1rem" zIndex={1} />,
				isDisabled: !isWalletConnected,
				label: "My Account",
				navId: 5,
				subLinks: {
					"My Assets": {
						icon: <Icon as={PortfolioIcon} h="1.25rem" w="1.25rem" zIndex={1} />,
						url: "/assets"
					},
					"My Pools": {
						icon: <Icon as={LiquidityIcon} h="1.25rem" w="1.25rem" zIndex={1} />,
						url: "/pools"
					}
					// IFO: {
					//   url: "/ifo",
					//   icon: <Icon zIndex={1} as={PredictionIcon} h="1.5rem" w="1.5rem" />
					// }
				},
				url: "/portfolio"
			}
		]
	}, [isWalletConnected])

	const initialIndex = useCallback(() => {
		let initialIndexId = 0
		switch (location.pathname.split("/")[1]) {
			case "trade":
				initialIndexId = 0
				setActiveRoute(data[0].subLinks)
				break
			case "games":
				initialIndexId = 1
				setActiveRoute(data[1].subLinks)
				break
			case "launchpad":
				initialIndexId = 2
				setActiveRoute(data[2].subLinks)
				break
			case "governance":
				initialIndexId = 3
				setActiveRoute(data[3].subLinks)
				break
			case "staking":
				initialIndexId = 4
				setActiveRoute(data[4].subLinks)
				break
			case "portfolio":
				initialIndexId = 5
				setActiveRoute(data[5].subLinks)
				break
			default:
				initialIndexId = -1
				setActiveRoute(undefined)
				break
		}

		return initialIndexId
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const breakpoint = useBreakpoint({ ssr: false })
	const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

	useEffect(() => {
		setActiveIndex(initialIndex())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleClick = (
		navid: number,
		subLinks: Record<string, { icon: ReactElement; url: string }> | undefined
	) => {
		setActiveIndex(navid)
		setActiveRoute(subLinks)
	}

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Flex align="start" justify="start" pos="relative" w="full">
			{isMobile ? (
				<>
					<IconButton
						_active={{ bg: "blackAlpha.500" }}
						_dark={{
							_active: { bg: "whiteAlpha.400" },
							_hover: { bg: "whiteAlpha.300" },
							bg: "whiteAlpha.200"
						}}
						_hover={{ bg: "blackAlpha.400" }}
						aria-label="Open Menu"
						bg="blackAlpha.300"
						h={{ base: "3rem", md: "4rem" }}
						icon={<HiOutlineMenuAlt3 size="25" />}
						isActive={isOpen}
						minWidth="2rem"
						onClick={() => onOpen()}
						rounded="1.25em"
						w={{ base: "3rem", md: "4rem" }}
					/>
					<Drawer isOpen={isOpen} onClose={onClose} placement="right">
						<DrawerOverlay backdropFilter="blur(70px)" bg="transparent" />
						<DrawerContent
							_dark={{ bgGradient: "linear(to-b, gray.600, gray.800)" }}
							bgGradient="linear(to-b, white, white)"
							overflow="hidden"
							roundedStart="2em"
							shadow="md"
						>
							<DrawerBody bg="transparent" flex={1} flexDirection="column" p={3}>
								<Flex direction="column" gap={{ base: 3, md: 1 }}>
									{data.map((props: NavigationButtonProps) => {
										return (
											<motion.div
												key={props.navId}
												layout
												onClick={() => {
													handleClick(props.navId, props.subLinks)
												}}
											>
												<NavigationButton activeIndex={activeIndex} {...props} icon={props.icon} />
											</motion.div>
										)
									})}
								</Flex>
								<Flex
									bgGradient="linear(45deg, brand.1, brand.2)"
									h="0.3rem"
									mb={4}
									mt={2}
									rounded="full"
									w="full"
								/>
								<Flex direction="column" gap={{ base: 4, md: 1 }} px={3}>
									<Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={FaBook} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													Documentation
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex>
									<Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										href="https://github.com/Electron-Protocol"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={FaGithub} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													Github
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex>
									{/* <Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										href="https://www.coingecko.com/en/coins/Electronnetwork"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={CGWhite} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													CoinGecko
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex> */}
									<Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										href="https://electron.network/social/telegram"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={FaTelegram} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													Telegram
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex>
									<Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										href="https://x.com/Electronnetwork"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={FaTwitter} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													Twitter
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex>
									<Flex
										_dark={{ _hover: { bg: "whiteAlpha.200" } }}
										_hover={{ bg: "blackAlpha.100" }}
										as="a"
										bg="transparent"
										href="https://discord.com/invite/BfKPacc5jF"
										target="_blank"
									>
										<HStack justify="space-between" w="full">
											<HStack>
												<Icon as={FaDiscord} h="1.5rem" w="1.5rem" zIndex={1} />
												<Text fontSize="20" w="full">
													Discord
												</Text>
											</HStack>
											<HiExternalLink />
										</HStack>
									</Flex>
								</Flex>
							</DrawerBody>
							<DrawerFooter>
								<HStack flex={1}>
									<ConnectButton />
								</HStack>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</>
			) : (
				<Accordion allowToggle as={motion.div} border="0px" layout w="full">
					{data.map((props: NavigationButtonProps) => {
						return (
							<NavigationButton
								activeIndex={activeIndex}
								isDisabled={props.isDisabled}
								key={props.navId}
								onClick={() => {
									handleClick(props.navId, props.subLinks)
								}}
								{...props}
							/>
						)
					})}
				</Accordion>
			)}
		</Flex>
	)
}
