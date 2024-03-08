import { Box, Flex } from "@chakra-ui/react"
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
					//	backgroundImage: "linear-gradient(0deg, rgba(200, 180, 30, 0.6), transparent)",
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
					<Flex maxW="12.5rem" pos="relative" top="-5" w="full">
						<ConnectButton />
					</Flex>
				</motion.div>
			)}
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
				My Assets
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
				Your personal stash
			</motion.p>
		</Box>
	)
}
