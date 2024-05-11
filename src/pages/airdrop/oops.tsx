/* eslint-disable eslint-comments/disable-enable-pair */
import { Footer } from "../../components/Layout/Footer"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Button, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
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
const Welcome: React.FC<WelcomeProps> = () => {
	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={2}
			h="full"
			alignContent="center"
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
				justifyContent="space-between"
				mt="1rem"
			>
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
								Join our community on testnet
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
					<VStack spacing={4} fontSize={13}>
						<Text fontWeight="bold">Early Stakeholder</Text>
						<Text fontSize={11} maxW={650} textAlign="center">
							This isn't just any testnet - it's an opportunity to become an early stakeholder in
							the Electron ecosystem. By joining the Neutron Testnet, you're positioning yourself at
							the forefront of cutting-edge technology and innovation.
						</Text>

						<Text fontWeight="bold">Airdrop</Text>
						<Text fontSize={11} maxW={650} textAlign="center">
							Who doesn't love free tokens? We're spreading the love to our early supporters through
							an exclusive airdrop. By participating in the Neutron Testnet, you stand a chance to
							snag some $ELE tokens and be part of our thriving community from the get-go.
						</Text>

						<Text fontWeight="bold">Inclusive Eligibility</Text>
						<Text fontSize={11} maxW={650} textAlign="center">
							Wondering if you qualify? If you've interacted with Electron, hold specific tokens, or
							have staked tokens within eligible Cosmos communities, you're already in the running!
							It's our way of thanking you for your support and commitment.
						</Text>

						<Text fontWeight="bold">Snapshot</Text>
						<Text fontSize={11} maxW={650} textAlign="center">
							Mark your calendars - we've already snapped a snapshot on May 15th, 2024. If you've
							been actively involved in the Electron ecosystem, now's the time to claim your spot on
							the list and reap the rewards.
						</Text>

						<Text fontWeight="bold">Mainnet Prep</Text>
						<Text fontSize={11} maxW={650} textAlign="center">
							While the mainnet launch is on the horizon, getting involved in the Neutron Testnet is
							your chance to familiarize yourself with our platform, provide valuable feedback, and
							help shape the future of Electron.
						</Text>
					</VStack>
				</Flex>
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
					<HStack w="full" justifyContent="center">
						<a href="https://testnet.electronprotocol.io" target="_blank" rel="noopener noreferrer">
							<Button
								_active={{
									filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
								}}
								_hover={{
									filter: "brightness(110%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
								}}
								shadow="rgba(35, 233, 196, 0.42) 0px 0px 5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
								alignSelf="center"
								bgGradient="linear(45deg, brand.1, brand.2)"
								color="gray.100"
								fontSize="16"
								maxW="12rem"
								mt={2}
								rounded="0.9em"
								transition="all 0.5s"
								width="140px"
							>
								Join Testnet <ExternalLinkIcon mx="2px" />
							</Button>
						</a>
					</HStack>
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
