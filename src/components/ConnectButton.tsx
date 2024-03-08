import {
	Button,
	type ButtonProps,
	Divider,
	HStack,
	Icon,
	IconButton,
	Image,
	Text,
	useClipboard,
	VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { type FC, useEffect } from "react"
import { FaClipboardList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"
import truncateAddress from "utils/ui/truncateAddress"

export type ConnectButtonProps = ButtonProps & {
	activeIndex?: number
}

const connectWalletVariants: Variants = {
	hide: {
		opacity: 0,
		transition: {
			duration: 0.5,
			type: "tween"
		},
		y: -30
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.5,
			type: "tween"
		},
		y: 0
	}
}

export const walletToolbarVariants: Variants = {
	hide: {
		transition: {
			staggerChildren: 0.25,
			transition: {
				duration: 0.5,
				type: "tween"
			}
		}
	},
	show: {
		transition: {
			delayChildren: 0.25,
			staggerChildren: 0.2,
			transition: {
				duration: 1,
				type: "tween"
			}
		}
	}
}

export const walletToolbarItemVariants: Variants = {
	hide: { opacity: 0, y: -0 },
	show: { opacity: 1, y: 0 }
}

const ConnectButton: FC<ConnectButtonProps> = () => {
	const { address, openView, isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const { onCopy, setValue } = useClipboard("")

	// TODO: Add Electron denom once minted
	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")
	const [ntrnBalance] = useTokenBalance("untrn")

	useEffect(() => {
		if (isWalletConnected && address) {
			setValue(address)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isWalletConnected])

	if (isWalletConnected) {
		return (
			<AnimatePresence mode="wait">
				{isWalletConnected && (
					<VStack align="center" as={motion.div} p={2} w="full">
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1,brand.2)"
							fontFamily="heading"
							fontSize="md"
							fontWeight="900"
							textAlign="center"
							w="full"
						>
							{truncateAddress(address!, 8, 8)}
						</Text>
						<Divider maxW="95%" />
						<HStack
							align="end"
							animate="show"
							as={motion.div}
							exit="hide"
							fontSize="md"
							h="full"
							initial="hide"
							justify="end"
							key="walletConnected"
							spacing="0.2rem"
							variants={connectWalletVariants}
							w="full"
						>
							<VStack align="start" spacing={0.25} w="full">
								<HStack justify="start" w="full">
									<Image src="/assets/tokens/electron.png" w="1.4rem" />
									<Text fontFamily="body" fontSize="md" fontWeight="900" textAlign="start" w="full">
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
								</HStack>
								<HStack justify="start" w="full">
									<Image src="/assets/tokens/ntrn.png" w="1.4rem" />
									<Text fontFamily="body" fontSize="md" fontWeight="900" textAlign="start" w="full">
										{shortenNumber(convertMicroDenomToDenom(ntrnBalance, 6), 2)}
									</Text>
								</HStack>
							</VStack>
							<HStack
								align="end"
								animate="show"
								as={motion.div}
								exit="hide"
								initial="hide"
								justify="end"
								spacing={1}
								variants={walletToolbarVariants}
								w="full"
							>
								<IconButton
									_active={{ background: "rgba(255,255,255,0.1)" }}
									_hover={{
										background: "rgba(255,255,255,0.2)",
										cursor: "pointer"
									}}
									aria-label="Copy wallet address to clipboard"
									as={motion.div}
									bg="rgba(255,255,255,0.1)"
									h="2rem"
									shadow="md"
									icon={<FaClipboardList size="1rem" />}
									onClick={() => {
										onCopy()
										toast("Copied address!", {
											progressStyle: {
												background: "rgba(2, 226, 150, 1)",
												boxShadow: "var(--chakra-shadows-md)",
												height: "0.6rem"
											}
										})
									}}
									rounded="0.6rem"
									size="none"
									variants={walletToolbarItemVariants}
									w="2rem"
								/>
								<IconButton
									_active={{ background: "rgba(255,255,255,0.1)" }}
									_hover={{
										background: "rgba(255,255,255,0.2)",
										cursor: "pointer"
									}}
									aria-label="Open Wallet Modal"
									as={motion.div}
									bg="rgba(255,255,255,0.1)"
									h="2rem"
									icon={<FaSignOutAlt size="1rem" />}
									onClick={() => {
										openView()
									}}
									shadow="md"
									rounded="0.6rem"
									size="none"
									variants={walletToolbarItemVariants}
									w="2rem"
								/>
							</HStack>
						</HStack>
					</VStack>
				)}
			</AnimatePresence>
		)
	}

	return (
		<Button
			_active={{ filter: "brightness(120%)" }}
			_hover={{ cursor: "pointer", filter: "brightness(110%)" }}
			alignItems="center"
			as={motion.div}
			bgGradient="linear(45deg, brand.1, brand.2)"
			bgSize="100% 100%"
			color="white"
			h={{ base: "5rem", md: "3.5rem" }}
			justifyItems="center"
			onClick={() => {
				openView()
			}}
			overflow="hidden"
			px={2}
			rounded="1em"
			shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
			w="full"
		>
			<AnimatePresence mode="wait">
				{!isWalletConnected && (
					<HStack
						animate="show"
						as={motion.div}
						exit="hide"
						initial={false}
						key="walletDisconnected"
						variants={connectWalletVariants}
					>
						<Icon as={FaSignInAlt} h="1.4rem" w="1.4rem" />
						<Text fontFamily="heading" fontSize="xl" textAlign="center" w="full">
							Log In
						</Text>
					</HStack>
				)}
			</AnimatePresence>
		</Button>
	)
}

export default ConnectButton
