import { Box, Flex, useBreakpointValue } from "@chakra-ui/react"
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

	const headingFontSize = useBreakpointValue({ base: "1.5rem", md: "2rem", sm: "2.5rem" })
	const paragraphFontSize = useBreakpointValue({ base: "1,5rem", md: "1rem", sm: "2.5rem" })
	const maxFlexWidth = useBreakpointValue({ base: "10rem", md: "12.5rem", sm: "10rem" })

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
		>
			<BlurImage
				src="/assets/home/Myassets.mp4"
				blurHash="L7D8%:3d00:eG^tO:ijK00{p^*CD"
				isHovering={isHovering}
			/>
			<motion.div
				animate={isHovering ? { height: "15rem" } : { height: "10rem" }}
				initial={{ height: "10rem" }}
				style={{
					bottom: "0",
					position: "absolute",
					width: "100%"
				}}
			/>
			{!isWalletConnected && (
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
					<Flex maxW={maxFlexWidth} pos="relative" top="1" w="full">
						<ConnectButton />
					</Flex>
				</motion.div>
			)}
			<motion.h1
				animate={isHovering ? { top: 10 } : { top: -50 }}
				initial={{ bottom: 0 }}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: headingFontSize,
					position: "absolute",
					textAlign: "center",
					width: "100%"
				}}
			>
				My Assets
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
				Your personal stash
			</motion.p>
		</Box>
	)
}
