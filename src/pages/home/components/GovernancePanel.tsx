import { Box, Heading, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"

export const GovernancePanel = () => {
	const [isHovering, setIsHovering] = useState(false)
	const [isMobile] = useMediaQuery("(max-width: 768px)")

	const headingFontSize = useBreakpointValue({ base: "1.5rem", md: "2rem", sm: "2.5rem" })
	const paragraphFontSize = useBreakpointValue({ base: "1rem", md: "1,5rem", sm: "2,5rem" })
	const centeredFontSize = useBreakpointValue({ base: "1rem", md: "1,5rem", sm: "2,5rem" })
	return (
		<Box
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			as={motion.div}
			bg="white"
			h="full"
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
				src={isMobile ? "/assets/home/Governance_Square.mp4" : "/assets/home/Governance.mp4"}
				blurHash="LA6]tNoy00WC.jfkDRaf8zaz??oK"
				isHovering={false}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					//	backgroundImage: "linear-gradient(0deg, rgba(100, 250, 150, 0.8), transparent)",
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
				<Heading color="gray" size={centeredFontSize}>
					Coming Soon
				</Heading>
			</motion.div>
			<motion.h1
				animate={isHovering ? { top: -50 } : { top: 10 }}
				initial={{ bottom: 0 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: headingFontSize,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Governance
			</motion.h1>
			<motion.p
				animate={isHovering ? { bottom: 20 } : { bottom: -60 }}
				initial={{ bottom: -30 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: paragraphFontSize,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Join the Council
			</motion.p>
		</Box>
	)
}
