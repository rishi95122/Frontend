/* eslint-disable id-length */
import { type SimpleModalHeadType } from "../types"
import { IconButton, Stack, Text, useColorMode } from "@chakra-ui/react"
import { FiChevronLeft, FiX } from "react-icons/fi"

export const SimpleModalHeadBaseStyle = (theme: string, backButton: boolean) => {
	return {
		">.icon-button": {
			">svg": { h: 5, w: 5 },
			_focus: { outline: "none" },
			alignItems: "center",
			borderRadius: "md",
			color: `simple-modal-head-button-icon-color-${theme}`,
			display: "flex",
			h: 8,
			justifyContent: "center",
			maxH: 8,
			maxW: 8,
			minH: 8,
			minW: 8,
			p: 0,
			w: 8
		},
		">.modal-header-text": {
			color: `simple-modal-head-text-color-${theme}`,
			flex: 1,
			fontSize: "lg",
			fontWeight: "semibold",
			mr: backButton ? 0 : -10,
			textAlign: "center"
		},
		alignItems: "center",
		h: "fit-content",
		mb: 1,
		p: 4,
		pb: 1.5,
		w: "full"
	}
}

export const SimpleModalHead = ({
	title,
	backButton,
	className,
	styleProps,
	onBack,
	onClose
}: SimpleModalHeadType) => {
	const { colorMode } = useColorMode()
	return (
		<Stack
			className={className}
			isInline
			sx={styleProps ? styleProps : SimpleModalHeadBaseStyle(colorMode, Boolean(backButton))}
		>
			{backButton ? (
				<IconButton
					aria-label="back"
					className="icon-button"
					color="white"
					icon={<FiChevronLeft />}
					onClick={onBack}
					variant="ghost"
				/>
			) : undefined}
			<Text
				align="center"
				className="modal-header-text"
				color="white"
				flex={1}
				fontFamily="heading"
			>
				{title}
			</Text>
			<IconButton
				aria-label="close"
				color="white"
				icon={<FiX size="20" />}
				onClick={onClose}
				rounded="full"
				size="sm"
				variant="ghost"
			/>
		</Stack>
	)
}
