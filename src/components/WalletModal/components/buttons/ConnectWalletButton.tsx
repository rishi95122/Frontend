/* eslint-disable id-length */
import { type ConnectWalletButtonType } from "../types"
import { Button, Center, Icon } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { RiWallet3Fill } from "react-icons/ri"

export const ConnectWalletButtonBaseStyle = () => ({
	_dark: { color: "white" },
	_hover: {
		filter: "brightness(110%)"
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

export const ConnectWalletButton = ({
	buttonText = "Connect Wallet",
	loading,
	disabled,
	leftIcon = <Icon as={RiWallet3Fill} />,
	rightIcon,
	className,
	onClick
}: ConnectWalletButtonType) => {
	return (
		<Button
			as={motion.button}
			className={className}
			iconSpacing={buttonText ? 1.5 : 0}
			isDisabled={disabled}
			isLoading={loading}
			leftIcon={leftIcon ? <Center>{leftIcon}</Center> : undefined}
			maxW="13rem"
			onClick={onClick}
			rightIcon={rightIcon ? <Center>{rightIcon}</Center> : undefined}
			sx={ConnectWalletButtonBaseStyle()}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			{buttonText}
		</Button>
	)
}
