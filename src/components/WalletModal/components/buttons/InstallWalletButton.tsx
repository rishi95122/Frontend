/* eslint-disable id-length */
import { type InstallWalletButtonType } from "../types"
import { Button, Icon, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const InstallWalletButtonBaseStyle = (theme: string) => ({
	_dark: { color: "white" },
	_disabled: {
		_active: {
			bg: `connect-wallet-button-disabled-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-disabled-text-color-${theme}`
		},
		_focus: {
			bg: `connect-wallet-button-disabled-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-disabled-text-color-${theme}`
		},
		_hover: {
			bg: `connect-wallet-button-disabled-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-disabled-text-color-${theme}`
		},
		bg: `connect-wallet-button-disabled-background-color-${theme}`,
		color: `connect-wallet-button-disabled-text-color-${theme}`,
		cursor: "not-allowed",
		opacity: 0.8
	},
	_hover: {
		filter: "brightness(110%)"
	},
	_loading: {
		_active: {
			bg: `connect-wallet-button-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-text-color-${theme}`
		},
		_focus: {
			bg: `connect-wallet-button-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-text-color-${theme}`
		},
		_hover: {
			bg: `connect-wallet-button-background-color-${theme}`,
			boxShadow: "none",
			color: `connect-wallet-button-text-color-${theme}`
		},
		bg: `connect-wallet-button-background-color-${theme}`,
		color: `connect-wallet-button-text-color-${theme}`,
		cursor: "progress"
	},
	alignItems: "center",
	bgGradient: "linear(45deg, brand.1, brand.2)",
	color: "gray.800",
	display: "flex",
	fontSize: "lg",
	h: "auto",
	minH: 12,
	rounded: "1em",
	shadow: "md",
	w: "full"
})

export const InstallWalletButton = ({
	icon,
	buttonText = "Install Wallet",
	disabled = false,
	className,
	onClick
}: InstallWalletButtonType) => {
	const { colorMode } = useColorMode()

	return (
		<Button
			as={motion.button}
			className={className}
			isDisabled={disabled}
			leftIcon={icon ? <Icon as={icon} /> : undefined}
			maxW="16rem"
			onClick={onClick}
			sx={InstallWalletButtonBaseStyle(colorMode)}
			variant="unstyled"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			{buttonText}
		</Button>
	)
}
