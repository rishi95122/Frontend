/* eslint-disable id-length */
import { AnimateBox } from "../Motion"
import { type QRCodeDisplayErrorType, type QRCodeType } from "../types"
import { QRCodeStatus } from "../types"
import {
	Box,
	Center,
	Flex,
	IconButton,
	Skeleton,
	Stack,
	Text,
	useColorMode
} from "@chakra-ui/react"
import { useRef } from "react"
import { IoReloadOutline } from "react-icons/io5"
import { QRCode as QRCodeImage } from "react-qrcode-logo"

export const QRCodeSkeleton = () => (
	<Center flexDirection="column" maxW={72} minH={40} px={6} textAlign="center" w="full">
		<Skeleton borderRadius="base" h={48} w={48} />
	</Center>
)

export const QRCodeDisplayError = ({ onRefresh }: QRCodeDisplayErrorType) => {
	return (
		<Center className="qr-code">
			<Box blur="md" className="qr-code-blur" filter="auto" />
			<Center className="qr-code-refresh-button-box">
				<IconButton
					aria-label="refresh-button"
					className="qr-code-refresh-button"
					icon={<IoReloadOutline />}
					onClick={onRefresh}
					size="lg"
				/>
			</Center>
			<Flex
				as={QRCodeImage}
				bgColor="#ffffff"
				ecLevel="L"
				eyeRadius={[
					[25, 25, 0, 25], // top/left eye
					[25, 25, 25, 0], // top/right eye
					[25, 0, 25, 25] // bottom/left
				]}
				fgColor="#2975CB"
				logoImage="/assets/electron.png"
				logoWidth={100}
				maxW="sm"
				overflow="hidden"
				qrStyle="dots"
				quietZone={20}
				rounded="3xl"
				size={350}
				value=""
			/>
		</Center>
	)
}

export const QRCodeBaseStyle = (theme: string) => {
	return {
		">.qr-code": {
			">.qr-code-blur": {
				bg: `qr-code-qr-blur-background-color-${theme}`,
				blur: "md",
				borderRadius: "lg",
				h: "full",
				position: "absolute",
				w: "full",
				zIndex: 2
			},
			">.qr-code-refresh-button-box": {
				">.qr-code-refresh-button": {
					bg: `qr-code-qr-background-color-${theme}`,
					borderRadius: "full",
					boxShadow: `qr-code-button-shadow-${theme}`,
					color: `qr-code-qr-text-color-${theme}`
				},
				h: "full",
				position: "absolute",
				w: "full",
				zIndex: 3
			},
			">.qr-code-svg": {
				opacity: 0.5
			},
			p: 5,
			position: "relative",
			w: "full"
		},
		">.qr-code-description": {
			fontWeight: "medium",
			opacity: 0.75,
			pb: 1.5,
			px: 4,
			textAlign: "center"
		},
		">.qr-code-error-desc-box": {
			">.qr-code-error-desc": {
				// For Firefox
				"&::-webkit-scrollbar": {
					// For Chrome and other browsers except Firefox
					display: "none"
				},

				fontSize: "sm",

				fontWeight: "base",

				lineHeight: "shorter",

				maxH: 16,
				opacity: 0.75,
				overflowX: "hidden",
				overflowY: "auto",
				px: 1,
				scrollbarWidth: "none",
				textAlign: "center"
			},
			">.qr-code-error-desc-animate-shadow": {
				bg: `qr-code-shadow-background-color-${theme}`,
				bottom: 0,
				left: 0,
				position: "absolute",
				w: "full"
			},
			position: "relative"
		},
		">.qr-code-error-title": {
			"&.qr-code-error": {
				color: `qr-code-qr-error-text-color-${theme}`
			},
			"&.qr-code-expired": {
				color: `qr-code-qr-expired-text-color-${theme}`
			},
			fontWeight: "medium",
			pt: 2,
			textAlign: "center"
		},
		alignItems: "center",
		justifyContent: "center",
		p: 6,
		pb: 10,
		spacing: 4,
		w: "full"
	}
}

export const QRCode = ({
	status,
	link,
	description,
	qrCodeSize = 230,
	errorTitle,
	errorDesc,
	className,
	onRefresh
}: QRCodeType) => {
	const descRef = useRef<HTMLDivElement>(null)
	const { colorMode } = useColorMode()

	return (
		<Stack className={className} sx={QRCodeBaseStyle(colorMode)}>
			{description ? <Text>{description}</Text> : undefined}
			{status === QRCodeStatus.Pending ? <QRCodeSkeleton /> : undefined}
			{status === QRCodeStatus.Done ? (
				<Center overflow="hidden" rounded="3xl">
					<Flex
						as={QRCodeImage}
						bgColor="#ffffff"
						ecLevel="L"
						eyeRadius={[
							[25, 25, 0, 25], // top/left eye
							[25, 25, 25, 0], // top/right eye
							[25, 0, 25, 25] // bottom/left
						]}
						fgColor="#2975CB"
						logoImage="/assets/tokens/electron.png"
						logoWidth={100}
						maxW="sm"
						overflow="hidden"
						qrStyle="dots"
						quietZone={20}
						rounded="3xl"
						size={350}
						value={link}
					/>
				</Center>
			) : undefined}
			{status === QRCodeStatus.Error || status === QRCodeStatus.Expired ? (
				<QRCodeDisplayError onRefresh={onRefresh!} qrCodeSize={qrCodeSize} theme={colorMode} />
			) : undefined}
			{errorTitle ? <Text>{errorTitle}</Text> : undefined}
			{errorDesc ? (
				<Box className="qr-code-error-desc-box">
					<Box className="qr-code-error-desc" ref={descRef}>
						<Text>{errorDesc}</Text>
					</Box>
					<AnimateBox
						animate={{
							height: 0,
							opacity: 0,
							transition: {
								duration: 0.2,
								type: "spring"
							}
						}}
						className="qr-code-error-desc-animate-shadow"
						initial={false}
					/>
				</Box>
			) : undefined}
		</Stack>
	)
}
