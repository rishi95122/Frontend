import { Box } from "@chakra-ui/react"
import { BlurImage } from "components/BlurImage"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const PoolsPanel = () => {
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
				navigate("/trade/pools")
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
			w={{ base: "90%", lg: "60%", md: "70%", sm: "80%", xl: "50%" }}
			whileHover={{ scale: 1.02 }}
			style={{ margin: "0 auto" }}
		>
			<BlurImage
				src="/assets/home/Pool.mp4"
				blurHash="L53Kf+L#L~yrUZiIsCSzUbcDY5q^"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					//	backgroundImage: "linear-gradient(0deg, rgba(50, 112, 200, 0.8), transparent)",
					bottom: "0",
					position: "absolute",
					width: "100%"
				}}
			/>
			{/* <motion.div
        initial={{ opacity: 0 }}
        transition={{ type: "tween" }}
        animate={
          isHovering
            ? { scale: 1.1, backdropFilter: "blur(6px)", opacity: 1 }
            : { scale: 1, backdropFilter: "blur(0px)", opacity: 0 }
        }
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Heading color="white">Coming Soon</Heading>
      </motion.div> */}
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
				Pools
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
				Dive Into Liquidity Pools
			</motion.p>
		</Box>
	)
}
