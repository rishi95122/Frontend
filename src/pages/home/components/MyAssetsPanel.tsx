import { Box, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { BlurImage } from "components/BlurImage"
import ConnectButton from "components/ConnectButton"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const MyAssetsPanel = () => {
	const [isHovering, setIsHovering] = useState(false)
	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const navigate = useNavigate()
	const [isMobile] = useMediaQuery("(max-width: 768px)")
	const headingFontSize = useBreakpointValue({ base: "1.5rem", md: "2rem", sm: "2.5rem" })
	const paragraphFontSize = useBreakpointValue({ base: "1,5rem", md: "1rem", sm: "2.5rem" })

	return (
		<Box
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			_hover={{ cursor: "pointer" }}
			as={motion.div}
			bg="white"
			h="full"
			onClick={() => {
				if (isWalletConnected) navigate("/portfolio")
			}}
			onHoverEnd={() => {
				setIsHovering(false)
			}}
			onHoverStart={() => {
				setIsHovering(true)
			}}
			overflow="hidden"
			pos="relative"
			rounded="1.25em"
			shadow="md"
			w="full"
			whileHover={{ scale: 1.02 }}
			style={{ zIndex: 1 }} // Set the z-index of the box
		>
			<BlurImage
				src={isMobile ? "/assets/home/mobile/11-4_my_asset.mp4" : "/assets/home/My_Asset.mp4"}
				blurHash="L7D8%:3d00:eG^tO:ijK00{p^*CD"
				isHovering={false} // Always pass true to isHovering
			/>
			<motion.div
				animate={
					isHovering
						? { backdropFilter: "blur(4px)", opacity: 1, scale: 1.1 }
						: { backdropFilter: "blur(6px)", opacity: 0, scale: 1 }
				}
				initial={{ opacity: 0 }}
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					justifyContent: "center",
					position: "absolute",
					width: "100%",
					zIndex: 1 // Set a higher z-index for the button
				}}
				transition={{ type: "tween" }}
			/>
			<motion.h1
				animate={isHovering ? { top: 5 } : { top: -50 }}
				initial={{ bottom: 0 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: headingFontSize,
					justifyContent: "center",
					position: "absolute",
					textAlign: "center",
					width: "100%",
					zIndex: 2 // Set a lower z-index for the text
				}}
			>
				My Assets
			</motion.h1>
			{!isMobile && (
				<motion.p
					animate={isHovering ? { bottom: 45 } : { bottom: -60 }}
					initial={{ bottom: -30 }}
					style={{
						fontFamily: "var(--chakra-fonts-heading)",
						fontSize: paragraphFontSize,
						justifyContent: "center",
						position: "absolute",
						textAlign: "center",
						width: "75%", // Adjusted width to 100%
						// eslint-disable-next-line canonical/sort-keys
						left: "50%", // Center horizontally
						transform: "translateX(-50%)", // Center horizontally
						zIndex: 2 // Set a lower z-index for the text
					}}
				>
					<ConnectButton
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					/>
				</motion.p>
			)}
			<motion.p
				animate={isHovering ? { bottom: 20 } : { bottom: -60 }}
				initial={{ bottom: -30 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: paragraphFontSize,
					justifyContent: "center",
					position: "absolute",
					textAlign: "center",
					width: "100%",
					zIndex: 2 // Set a lower z-index for the text
				}}
			>
				Your personal stash
			</motion.p>
		</Box>
	)
}
