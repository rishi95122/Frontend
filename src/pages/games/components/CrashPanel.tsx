import { Box, Heading } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"

export const CrashPanel = () => {
	const [isHovering, setIsHovering] = useState(false)

	return (
		<Box
			as={motion.div}
			bg="white"
			h="full"
			minH="18rem"
			overflow="hidden"
			pos="relative"
			rounded="1.25em"
			shadow="md"
			w="full"
			onHoverEnd={() => {
				setIsHovering(false)
			}}
			// onClick={() => {
			//   navigate("/earn")
			// }}
			whileHover={{ scale: 1.02 }}
			_dark={{ bgGradient: "linear(to-br, gray.600, gray.800)" }}
			// _hover={{ cursor: "pointer" }}
			onHoverStart={() => {
				setIsHovering(true)
			}}
		>
			<BlurImage
				src="/assets/games/crash.png"
				blurHash="LXBhMxIuALwNQ7w[kENGK%o{wJVt"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					backgroundImage: "linear-gradient(0deg, rgba(250, 112, 50, 0.8), transparent)",
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
				Crash
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
				Fortune Rewards the Brave.
			</motion.p>
		</Box>
	)
}
