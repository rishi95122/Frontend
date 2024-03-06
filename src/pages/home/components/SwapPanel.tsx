import { Box } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SwapPanel = () => {
	const [isHovering, setIsHovering] = useState(false)
	const navigate = useNavigate()

	return (
		<Box
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			_hover={{ cursor: "pointer" }}
			as={motion.div}
			bg="white"
			h="full"
			minH="18rem"
			onClick={() => {
				navigate("/trade")
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
			w="full"
			whileHover={{ scale: 1.02 }}
		>
			<BlurImage
				src="/assets/home/circuitboard_bg.jpg"
				blurHash="L77-=pIu02-O0:xY}mI=qIs,T^NL"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					//	backgroundImage: "linear-gradient(0deg, rgba(180, 120, 50, 0.6), transparent)",
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
				Trade
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
				Comfortable Swapping
			</motion.p>
		</Box>
	)
}
