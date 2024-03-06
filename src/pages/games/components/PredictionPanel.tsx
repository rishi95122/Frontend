import { Box } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const PredictionPanel = () => {
	const [isHovering, setIsHovering] = useState(false)
	const navigate = useNavigate()

	return (
		<Box
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			_hover={{ cursor: "pointer" }}
			as={motion.div}
			bg="gray.800"
			h="full"
			minH="18rem"
			onClick={() => {
				navigate("/games/prediction")
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
				src="/assets/games/prediction.png"
				blurHash="L415r8bxUbi0mdbuc4i#Ube-pycC"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					backgroundImage: "linear-gradient(0deg, rgba(1, 212, 150, 0.8), transparent)",
					bottom: "0",
					position: "absolute",
					width: "100%"
				}}
			/>
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
				Prediction
			</motion.h1>
			<motion.p
				animate={isHovering ? { bottom: 20 } : { bottom: -30 }}
				initial={{ bottom: -30 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: 20,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				Bullish or Bearish
			</motion.p>
		</Box>
	)
}
