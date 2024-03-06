/* eslint-disable id-length */
import { AnimateBox, LoadingVariants } from "../Motion"
import { type ConnectModalContentType } from "../types"
import { LogoStatus } from "../types"
import {
	Box,
	Center,
	Flex,
	HStack,
	Icon,
	IconButton,
	Image,
	Text,
	useColorMode
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { motion } from "framer-motion"
import { BsFillCheckCircleFill } from "react-icons/bs"

const handleStatusColor = (theme: string, status: LogoStatus) => {
	switch (status) {
		case LogoStatus.Loading:
			return {
				border: "rgba(2, 226, 150, 1)",
				text: theme === "dark" ? "white" : "gray.800"
			}
		case LogoStatus.Warning:
			return {
				border: "yellow.400",
				text: theme === "dark" ? "white" : "gray.800"
			}
		case LogoStatus.Error:
			return {
				border: "red.500",
				text: theme === "dark" ? "white" : "gray.800"
			}
		default:
			return undefined
	}
}

export const SimpleDisplayModalContentBaseStyle = (theme: string, status: LogoStatus) => {
	return {
		">.modal-content-address-button": {
			pt: 2.5,
			px: 8,
			w: "full"
		},
		">.modal-content-bottom-button": {
			pt: 3.5,
			px: 5,
			w: "full"
		},
		">.modal-content-bottom-link": {
			pt: 2,
			w: "full"
		},
		">.modal-content-description": {
			">.modal-content-description-animate-shadow": {
				bg: `simple-display-modal-content-shadow-background-color-${theme}`,
				bottom: 0,
				left: 0,
				position: "absolute",
				w: "full"
			},
			">.modal-content-description-box": {
				// For Chrome and other browsers except Firefox
				"&::-webkit-scrollbar": {
					display: "none"
				},

				fontSize: "sm",

				lineHeight: 1.3,

				maxH: 28,

				opacity: 0.7,

				overflowY: "scroll",

				pt: 1,

				px: 8,

				// For Firefox
				scrollbarWidth: "none",

				whiteSpace: "pre-line"
			},
			position: "relative"
		},
		">.modal-content-header": {
			color: handleStatusColor(theme, status)?.text,
			fontWeight: "semibold"
		},
		">.modal-content-logo": {
			">.modal-content-image": {
				p: status ? 3.5 : 0
			},
			">.modal-content-logo-status": {
				border: "2px solid",
				borderBottomColor:
					status === LogoStatus.Loading ? "transparent" : handleStatusColor(theme, status)?.border,
				borderLeftColor: handleStatusColor(theme, status)?.border,
				borderRadius: "full",
				borderRightColor: handleStatusColor(theme, status)?.border,
				borderTopColor:
					status === LogoStatus.Loading ? "transparent" : handleStatusColor(theme, status)?.border,
				bottom: status === LogoStatus.Loading ? -1.5 : -2,
				left: status === LogoStatus.Loading ? -1.5 : -2,
				position: "absolute",
				right: status === LogoStatus.Loading ? -1.5 : -2,
				top: status === LogoStatus.Loading ? -1.5 : -2
			},
			h: 20,
			maxH: 20,
			maxW: 20,
			mb: 4,
			minH: 20,
			minW: 20,
			mx: "auto",
			position: "relative",
			w: 20
		},
		">.modal-content-username": {
			">.modal-content-username-image": {
				h: 4,
				maxH: 4,
				maxW: 4,
				minH: 4,
				minW: 4,
				w: 4
			},
			alignItems: "center",
			fontSize: "lg",
			fontWeight: "semibold"
		},
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		pb: 8,
		pt: 6,
		px: 4,
		textAlign: "center",
		w: "full"
	}
}

export const ConfirmButtonBaseStyle = () => ({
	_dark: { color: "white" },
	_hover: {
		filter: "brightness(110%)"
	},
	alignItems: "center",
	bgGradient: "linear(45deg, brand.1, brand.2)",
	color: "gray.800",
	display: "flex",
	fontSize: "lg",
	h: "3rem",
	rounded: "1em",
	shadow: "md",
	w: "3rem"
})

export const SimpleDisplayModalContent = ({
	status,
	contentHeader,
	contentDesc,
	username,
	walletIcon,
	addressButton,
	bottomButton,
	bottomLink,
	className,
	logo
}: ConnectModalContentType) => {
	const { colorMode } = useColorMode()
	const { closeView } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	return (
		<Flex className={className} sx={SimpleDisplayModalContentBaseStyle(colorMode, status!)}>
			{logo ? (
				<Center className="modal-content-logo">
					{status === "loading" ? (
						<AnimateBox
							animate="animate"
							className="modal-content-logo-status"
							initial="hidden"
							variants={LoadingVariants}
						/>
					) : undefined}
					{status === "warning" || status === "error" ? (
						<Box className="modal-content-logo-status" />
					) : undefined}
					<Center className="modal-content-image">
						{typeof logo === "string" ? (
							<Image alt="logo" h="full" src={logo} w="full" />
						) : (
							<Icon as={logo} h="full" w="full" />
						)}
					</Center>
				</Center>
			) : undefined}
			{contentHeader ? <Text className="modal-content-header">{contentHeader}</Text> : undefined}
			{contentDesc ? (
				<Box className="modal-content-description">
					<Box className="modal-content-description-box">
						<Text>{contentDesc}</Text>
					</Box>
				</Box>
			) : undefined}
			<HStack>
				{username ? (
					<HStack
						_dark={{ bg: "gray.800" }}
						bg="gray.800"
						gap={1}
						px={2}
						py={2}
						rounded="1em"
						shadow="md"
					>
						<Center boxSize="1.5rem">
							<Image alt="wallet-icon" src={walletIcon} />
						</Center>
						<Text color="white" fontSize="lg" fontWeight="600" lineHeight="1">
							{username}
						</Text>
						{addressButton ? (
							<Box className="modal-content-address-button">{addressButton}</Box>
						) : undefined}
					</HStack>
				) : undefined}
			</HStack>
			{bottomButton ? (
				<HStack justify="center" mt={4} spacing={4} w="full">
					{bottomButton}
					<IconButton
						alignItems="center"
						aria-label="Confirm Wallet Selection"
						as={motion.button}
						display="flex"
						icon={<Icon as={BsFillCheckCircleFill} />}
						onClick={() => closeView()}
						rounded="0.9em"
						sx={ConfirmButtonBaseStyle()}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					/>
				</HStack>
			) : undefined}
			{bottomLink ? <Center className="modal-content-bottom-link">{bottomLink}</Center> : undefined}
		</Flex>
	)
}
