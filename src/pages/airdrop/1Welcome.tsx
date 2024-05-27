/* eslint-disable eslint-comments/disable-enable-pair */
import { Footer } from "../../components/Layout/Footer"
import { DisclaimerModal } from "./components/DisclaimerModal"
import { Button, Checkbox, Flex, Grid, HStack, Spacer, Text, VStack } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
// import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { motion } from "framer-motion"
import { useState } from "react"
import { type ZodVoidDef } from "zod"

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
	onNext: () => ZodVoidDef
}
const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	const [isChecked, setIsChecked] = useState(false)
	const [isBoxClicked, setIsBoxClicked] = useState(false)

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
									background: "-webkit-linear-gradient(72deg, #61a9bb, #ec80fe)",
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
					<VStack w="full" align="center" spacing={4}>
						<Spacer />
						<Text
							fontFamily="arial-regular"
							fontSize={{ base: "0.6rem", md: "sm" }}
							fontWeight="100"
							textAlign="center"
							w={{ base: "80%", md: "50%" }}
						>
							Electron is leveling up! We're pushing for deeper decentralization, and this airdrop
							is all about getting there by spreading the love to our early stakeholders.
						</Text>
						<Spacer />
						<Text
							fontFamily="arial-regular"
							fontSize={{ base: "0.6rem", md: "sm" }}
							fontWeight="100"
							textAlign="center"
							w={{ base: "80%", md: "50%" }}
						>
							Think you might snag some $ELE? You're in luck if you've interacted with Electron,
							hold specific tokens, or have staked tokens within the eligible Cosmos communities.
						</Text>
						<Spacer />
						<Text
							fontFamily="arial-regular"
							fontSize={{ base: "0.6rem", md: "sm" }}
							fontWeight="200"
							textAlign="center"
							w={{ base: "80%", md: "50%" }}
						>
							Oh, and just so you know, we snapped a snapshot on May 15th, 2024. Ready to see if
							you're on the list? Head over to claim your $ELE now!
						</Text>
					</VStack>
				</Flex>

				<Flex justifyContent="center" mt={2}>
					<HStack>
						<Checkbox
							onChange={(event) => {
								setIsChecked(event.target.checked)
								setIsBoxClicked(true)
							}}
							rounded="2em"
							size="lg"
						/>
						<Text fontFamily="heading" fontSize={10}>
							I have read and agreed to these terms
						</Text>
					</HStack>
					{isBoxClicked && <DisclaimerModal />}
				</Flex>
				<Flex justifyContent="center" mt={4} mb={2} w="full">
					<Button
						_active={{
							filter: isChecked ? "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))" : ""
						}}
						_dark={{
							_disabled: {
								bg: "whiteAlpha.500",
								color: "whiteAlpha.500",
								cursor: "not-allowed"
							}
						}}
						_disabled={{
							bg: "offwhite.4",
							color: "gray.800",
							cursor: "not-allowed",
							opacity: 0.5
						}}
						_hover={{
							filter: isChecked
								? "brightness(110%) drop-shadow(0px 0px 6px rgba(2,226,150, 1))"
								: ""
						}}
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						isDisabled={!isChecked}
						onClick={onNext}
						rounded="0.9em"
						transition="all 0.5s"
						w="30%"
					>
						Enter
					</Button>
				</Flex>
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
	)
}

export default Welcome

Welcome.propTypes = {
	onNext: () => null
}
