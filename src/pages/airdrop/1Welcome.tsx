/* eslint-disable eslint-comments/disable-enable-pair */
import { Footer } from "../../components/Layout/Footer"
import { Button, Flex, Grid, HStack, Text } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
// import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { motion } from "framer-motion"

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
type WelcomeProps = {
	onNext: () => void // Define the type of onNext prop
}
const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
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
			mt={{ base: -3, md: -90 }}
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
						<Text
							fontFamily="body"
							fontSize={{ base: "0.6rem", md: "2xl" }}
							fontWeight="900"
							textAlign="center"
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
								Welcome to the Electron Airdrop
							</span>
						</Text>
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
						<Text
							fontFamily="arial-regular"
							fontSize={{ base: "0.6rem", md: "sm" }}
							fontWeight="200"
							textAlign="center"
							w="full"
							alignItems="start"
						>
							The Electron platform is moving towards further decentralization. The purpose of this
							airdrop is to support that vision by meaningfully distributing stakeholders from the
							start. You may be eligible for this ELE airdrop if you've interacted with Cosmos
							ecosystem chains, applications, or the community in the past. Please proceed to check
							your eligibility and claim your ELE.
						</Text>
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
						Next
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

export default Welcome

Welcome.propTypes = {
	onNext: () => null
}
