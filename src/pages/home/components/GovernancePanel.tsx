import { Box, Heading } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"

export const GovernancePanel = () => {
	const [isHovering, setIsHovering] = useState(false)
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
				src="/assets/home/circuitboard_bg.jpg"
				blurHash="L9A]y;Sh00v}2xbF{]R,0Lr??FOY"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
				//	backgroundImage: "linear-gradient(0deg, rgba(162, 42, 40, 0.6), transparent)",
					bottom: "0",
					position: "absolute",
					width: "100%"
				}}
			/>
			<motion.div
				animate={
					isHovering
						? { backdropFilter: "blur(6px)", opacity: 1, scale: 1.1 }
						: { backdropFilter: "blur(0px)", opacity: 0, scale: 1 }
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
				<Heading color="white">Coming Soon</Heading>
			</motion.div>
			<motion.h1
				animate={isHovering ? { bottom: 40 } : { bottom: 0 }}
				initial={{ bottom: 0 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: 40,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Governance
			</motion.h1>
			<motion.p
				animate={isHovering ? { bottom: 20 } : { bottom: -30 }}
				initial={{ bottom: -20 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: 20,
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
