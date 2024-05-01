import { Footer } from "../../components/Layout/Footer"
import WhitelistComponent from "./components/Whitelist"
import { Button, Flex, Grid, Heading } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Airdrop = () => {
	const [isEligible, setIsEligible] = useState<boolean | null>(null) // Initialize with null to indicate no check has been made yet
	const whitelist = WhitelistComponent()
	const [buttonClicked, setButtonClicked] = useState(false) // Track if the button has been clicked
	const { address, isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [stake, setStake] = useState(null)

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
			<Button onClick={handleCheckEligibility}>Check Eligibility</Button>
			{renderEligibilityMessage()}
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

export default Airdrop
