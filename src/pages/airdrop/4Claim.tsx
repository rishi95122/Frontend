/* eslint-disable eslint-comments/disable-enable-pair */
import { Footer } from "../../components/Layout/Footer"
import { Button, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { keyframes } from "@emotion/react"
// import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
type ClaimProps = {
	onNext: () => void
	onPrev: () => void
}

const Claim: React.FC<ClaimProps> = ({ onNext }) => {
	// Initialize with null to indicate no check has been made yet
	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [stake, setStake] = useState(null)

	const handleWalletConnect = () => {
		// Your wallet connection logic here...

		// Reset isEligible to null and stake to null upon wallet connection

		setStake(null)
	}

	// UseEffect to listen for changes in wallet connection status
	useEffect(() => {
		if (isWalletConnected) {
			handleWalletConnect()
		}
	}, [isWalletConnected])

	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={2}
			h="full"
			initial={{ opacity: 0 }}
			p={{ base: 4, lg: 24, md: 16 }}
			w="full"
			mt={{ base: -3, md: -4 }}
		>
			<Flex
				bgGradient="linear(to-b, #0a2b33, #1a001e)"
				flexDir="column"
				px={2}
				py={3}
				rounded="1.25em"
				shadow="md"
				w="full"
				maxW="5xl"
				justifyContent="space-between" // Added this line
				mt="1rem"
			>
				{/* Akash activity */}
				<Flex
					bgGradient="linear(rgba(33, 33, 33, 0.9))"
					flexDir="column"
					px={5}
					py={3}
					rounded="1.25em"
					shadow="md"
					w="full"
					maxW="100%"
				>
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/akash.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.6rem", md: "lg" }}
							fontWeight="900"
							textAlign="start"
							w="full"
							alignItems="start"
						>
							<span
								style={{
									animation: `${gradientAnimation} 2s ease infinite`,
									background: "-webkit-linear-gradient(45deg, #61a9bb, #ec80fe)",
									backgroundSize: "100% 100%",
									fontSize: "larger",
									marginRight: "0px",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent"
								}}
							>
								Akash activity
							</span>
						</Text>

						<Text
							fontFamily="body"
							fontSize={{ base: "lg", md: "xl" }}
							fontWeight="900"
							textAlign="right"
							marginBottom="0.95"
							w="full"
							ml={{ base: "-5rem", md: "-10rem" }}
						>
							{/*	{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)} */}
						</Text>
						<Image
							src="/assets/tokens/electron.png"
							w="1.5rem"
							ml={{ base: "0rem", md: "-18rem" }}
						/>
					</HStack>
				</Flex>
				{/* Axelar activity */}
				<Flex
					bgGradient="linear(rgba(33, 33, 33, 0.9))"
					flexDir="column"
					px={5}
					py={3}
					rounded="1.25em"
					shadow="md"
					w="full"
					maxW="100%"
				>
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/axelar.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.6rem", md: "lg" }}
							fontWeight="900"
							textAlign="start"
							w="full"
							alignItems="start"
						>
							<span
								style={{
									animation: `${gradientAnimation} 2s ease infinite`,
									background: "-webkit-linear-gradient(45deg, #61a9bb, #ec80fe)",
									backgroundSize: "100% 100%",
									fontSize: "larger",
									marginRight: "0px",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent"
								}}
							>
								Axelar activity
							</span>
						</Text>

						<Text
							fontFamily="body"
							fontSize={{ base: "lg", md: "xl" }}
							fontWeight="900"
							textAlign="right"
							marginBottom="0.95"
							w="full"
							ml={{ base: "-5rem", md: "-10rem" }}
						>
							{/*	{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)} */}
						</Text>
						<Image
							src="/assets/tokens/electron.png"
							w="1.5rem"
							ml={{ base: "0rem", md: "-18rem" }}
						/>
					</HStack>
				</Flex>
				<Flex justifyContent="center" mt={4}>
					<Button
						onClick={onNext}
						_active={{
							filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						shadow="rgba(35, 233, 196, 0.42) 0px 0px 5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
						alignSelf="end"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.100"
						fontSize="16"
						// leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
						maxW="6rem"
						mt={2}
						rounded="0.9em"
						transition="all 0.5s"
						width="120px"
					>
						CLAIM
					</Button>
				</Flex>

				<Grid
					placeItems="center"
					gridColumnStart="1"
					gridColumnEnd="3"
					gridRowStart="4"
					gridRowEnd="5"
					mt="8px"
				>
					<Footer />
				</Grid>
			</Flex>
		</Flex>
	)
}

export default Claim

Claim.propTypes = {
	onNext: () => null
}
