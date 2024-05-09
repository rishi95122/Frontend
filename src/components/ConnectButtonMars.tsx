/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unassigned-import
import "react-tooltip/dist/react-tooltip.css"
import {
	Button,
	type ButtonProps,
	HStack,
	Icon,
	Text,
	useBreakpointValue,
	useClipboard,
	VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { type FC, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
// eslint-disable-next-line import/no-extraneous-dependencies
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

const ConnectButtonMars: FC<ConnectButtonProps> = () => {
	const { address, openView, isWalletConnected } = useChain("mars")

	const { setValue } = useClipboard("")

	// TODO: Add Electron denom once minted
	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")

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
									<Text
										bgClip="text"
										bgGradient="linear(45deg, brand.1,brand.2)"
										fontFamily="heading"
										fontSize="md"
										fontWeight="900"
										mb={-2}
										textAlign="center"
										w="full"
									>
										{truncateAddress(address!, 8, 8)}
									</Text>
									<Text fontFamily="body" fontSize="md" fontWeight="900" textAlign="end" w="full">
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
								</HStack>
							</VStack>
						</HStack>
					</VStack>
				)}
			</AnimatePresence>
		)
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const isMobile = useBreakpointValue({ base: true, md: false })
	return (
		<Button
			_active={{ filter: "brightness(120%)" }}
			_hover={{ cursor: "pointer", filter: "brightness(110%)" }}
			alignItems="center"
			as={motion.div}
			bgGradient="linear(45deg, brand.1, brand.2)"
			bgSize="100% 100%"
			color="white"
			h={{ base: "1.5rem", md: "2rem" }}
			justifyItems="center"
			onClick={() => {
				openView()
			}}
			overflow="hidden"
			px={2}
			rounded="0.5em"
			shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
			w={{ base: "25%", md: "35%" }}
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
						{!isMobile && (
							<Text
								fontFamily="heading"
								fontSize={{ base: "0.2rem", md: "0.8rem" }}
								textAlign="center"
								w="full"
							>
								Check eligibility
							</Text>
						)}
					</HStack>
				)}
			</AnimatePresence>
		</Button>
	)
}

export default ConnectButtonMars
