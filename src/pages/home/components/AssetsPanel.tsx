import { Box, Heading, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AssetsPanel = () => {
	const [isHovering, setIsHovering] = useState(false)
	const navigate = useNavigate()

	const headingFontSize = useBreakpointValue({ base: "1.5rem", md: "2rem", sm: "2.5rem" })
	const paragraphFontSize = useBreakpointValue({ base: "1rem", md: "1,5rem", sm: "2,5rem" })
	const [isMobile] = useMediaQuery("(max-width: 768px)")

	const panelWidth = useBreakpointValue({
		base: "calc(50% - 1rem)",
		md: "calc(50% - 1rem)",
		sm: "calc(100% - 1rem)"
	})

	return (
		<Box
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			_hover={{ cursor: "pointer" }}
			as={motion.div}
			bg="gray.800"
			h="full"
			minH={panelWidth}
			onClick={() => {
				navigate("/portfolio/assets")
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
		>
			<BlurImage
				src={isMobile ? "/assets/home/Asset.mp4" : "/assets/home/Asset.mp4"}
				blurHash="L56cQlnj*KkVQ8bauPi{00WpH9bb"
				isHovering={false}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					//	backgroundImage: "linear-gradient(0deg, rgba(200, 90, 150, 0.8), transparent)",
					bottom: "0",
					position: "absolute",
					width: "100%"
				}}
			/>
			<motion.div
				animate={
					isHovering
						? { backdropFilter: "blur(0px)", opacity: 0, scale: 1.1 }
						: { backdropFilter: "blur(6px)", opacity: 1, scale: 1 }
				}
				initial={{ opacity: 0 }}
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					justifyContent: "center",
					position: "absolute",
					width: "100%"
				}}
				transition={{ type: "tween" }}
			>
				<Heading color="white" />
			</motion.div>
			<motion.h1
				animate={isHovering ? { top: -50 } : { top: 20 }}
				initial={{ top: 0 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: headingFontSize,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Assets
			</motion.h1>
			<motion.p
				animate={isHovering ? { bottom: 20 } : { bottom: -40 }}
				initial={{ bottom: -30 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: paragraphFontSize,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Explore the Assets
			</motion.p>
		</Box>
	)
}
