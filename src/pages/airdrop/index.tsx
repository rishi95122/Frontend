import { Footer } from "../../components/Layout/Footer"
import WhitelistComponent from "./components/Whitelist"
import { Button, Flex, Grid, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { keyframes } from "@emotion/react"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

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

const Airdrop = () => {
	const [isEligible, setIsEligible] = useState<boolean | null>(null) // Initialize with null to indicate no check has been made yet
	const whitelist = WhitelistComponent()
	const [buttonClicked, setButtonClicked] = useState(false) // Track if the button has been clicked
	const { address, isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [stake, setStake] = useState(null)

	const [EleBalance] = useTokenBalance(
		import.meta.env.VITE_NEUTRONNETWORK === "neutron"
			? "untrn"
			: "factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE"
	)
	const handleWalletConnect = () => {
		// Your wallet connection logic here...

		// Reset isEligible to null and stake to null upon wallet connection
		setIsEligible(null)
		setStake(null)
	}

	// UseEffect to listen for changes in wallet connection status
	useEffect(() => {
		if (isWalletConnected) {
			handleWalletConnect()
		}
	}, [isWalletConnected])

	// Function to verify address against the whitelist
	const handleCheckEligibility = async () => {
		try {
			// Fetch currently connected wallet address (this is a placeholder)
			const connectedAddress = isWalletConnected ? address : ""

			// Check if the connected wallet address is in the whitelist
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			setIsEligible(whitelist.includes(connectedAddress))
			setButtonClicked(true) // Set buttonClicked to true after the button is clicked
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error checking eligibility:", error)
		}
	}

	// Render eligibility message based on the state and whether the button has been clicked
	const renderEligibilityMessage = () => {
		if (!buttonClicked) {
			return null // Render nothing if the button hasn't been clicked
		} else if (!isWalletConnected) {
			return <p>Please connect your wallet</p>
		} else if (isEligible === null) {
			return null // No eligibility status yet, wait for it to be determined
		} else if (isEligible) {
			return <p>Wallet is eligible for airdrop</p>
		} else {
			return <p>Wallet is not eligible for airdrop</p>
		}
	}

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
			<Heading>Airdrop</Heading>

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
							src="/assets/tokens/electron.png"
							w="1.5rem"
							ml={{ base: "2.1rem", md: "51rem" }}
						/>

						<Text
							fontFamily="body"
							fontSize="2xl"
							fontWeight="900"
							textAlign="right"
							marginBottom="0.95"
							w="full"
						>
							{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
						</Text>
						<Text
							fontFamily="body"
							fontSize="sm"
							fontWeight="900"
							textAlign="start"
							w="full"
							alignItems="start"
						>
							<span
								style={{
									animation: `${gradientAnimation} 2s ease infinite`,
									background: "-webkit-linear-gradient(45deg, #61a9bb, #ec80fe)",
									backgroundSize: "400% 400%",
									fontSize: "larger",
									marginRight: "4px",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent"
								}}
							>
								ELE
							</span>
						</Text>
					</HStack>
				</Flex>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button
						onClick={handleCheckEligibility}
						style={{
							background: "linear-gradient(to bottom, #61a9bb, #ec80fe)",
							borderRadius: "20px",
							marginTop: "1rem",
							width: "80%"
						}}
					>
						Check Eligibility
					</Button>
				</div>
				<div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
					{renderEligibilityMessage()}
				</div>
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

export default Airdrop
