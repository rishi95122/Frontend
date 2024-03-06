/* eslint-disable id-length */
import { type CopyAddressType } from "../types"
import { Button, Center, Icon, Text, useClipboard } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FiCopy } from "react-icons/fi"
import truncateAddress from "utils/ui/truncateAddress"

const defaultText = "address not identified yet"

export const CopyAddressButtonBaseStyle = () => ({
	_disabled: {
		_active: {
			boxShadow: "none"
		},
		_focus: {
			boxShadow: "none"
		},
		_hover: {
			bg: "transparent",
			opacity: 0.6
		},
		cursor: "not-allowed",
		opacity: 0.6
	},
	_focus: {
		boxShadow: "none"
	},
	_hover: {
		opacity: 0.9
	},
	_loading: {
		cursor: "progress",
		py: 3.5
	},
	alignItems: "center",
	bgClip: "text",
	bgGradient: "linear(45deg, brand.1, brand.2)",
	display: "flex",
	fontSize: "md",
	fontWeight: "bold",
	h: "1rem",
	justifyContent: "center",
	letterSpacing: "0.4px",
	lineHeight: 6,
	minH: "fit-content",
	px: 2,
	py: 1,
	transition: "all .3s ease-in-out",
	w: "full"
})

export const CopyAddressButton = ({
	address = defaultText,
	loading,
	disabled,
	className,
	maxDisplayLength = 6
}: CopyAddressType) => {
	const [displayAddress, setDisplayAddress] = useState(address)
	const [displayIsDisabled, setDisplayIsDisabled] = useState(disabled)
	const { hasCopied, onCopy, setValue } = useClipboard("")

	useEffect(() => {
		// default
		if (address === defaultText) {
			setDisplayAddress(defaultText)
			setDisplayIsDisabled(true)
		}

		if (address !== defaultText) setValue(address)
		// has address and address length > max display length
		if (address !== defaultText && address.length >= maxDisplayLength) {
			setDisplayAddress(truncateAddress(address, 5, 8))
			if (disabled) setDisplayIsDisabled(true)
			if (!disabled) setDisplayIsDisabled(false)
		}

		// has address and address length < max display length
		if (address !== defaultText && address.length <= maxDisplayLength) {
			setDisplayAddress(address)
			if (disabled) setDisplayIsDisabled(true)
			if (!disabled) setDisplayIsDisabled(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, maxDisplayLength, disabled])

	return (
		<Button
			className={className}
			gap={2}
			isDisabled={displayIsDisabled}
			isLoading={loading}
			onClick={onCopy}
			sx={CopyAddressButtonBaseStyle()}
			title={!loading && !disabled && address !== defaultText ? address : ""}
			variant="unstyled"
		>
			{/* eslint-disable-next-line no-negated-condition */}
			<Text>{!loading ? displayAddress : undefined}</Text>
			{!loading && address !== defaultText ? (
				<Center
					_dark={{
						bg: "gray.600",
						color: hasCopied ? "brand.2" : "white"
					}}
					as={motion.div}
					bg="gray.600"
					boxSize="1.5rem"
					color={hasCopied ? "brand.2" : "white"}
					rounded="full"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<Icon as={hasCopied ? FaCheckCircle : FiCopy} />
				</Center>
			) : undefined}
		</Button>
	)
}
