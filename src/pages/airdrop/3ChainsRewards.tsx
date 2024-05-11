/* eslint-disable eslint-comments/disable-enable-pair */
import Akashwallet from "../../components/ConnectButtonAkash"
import Axelarwallet from "../../components/ConnectButtonAxelar"
import Celestiawallet from "../../components/ConnectButtonCelestia"
import Chihuahuawallet from "../../components/ConnectButtonChihuahua"
import Cosmoshubwallet from "../../components/ConnectButtonCosmoshub"
import Dydxwallet from "../../components/ConnectButtonDydx"
import Dymensionwallet from "../../components/ConnectButtonDymension"
import Junowallet from "../../components/ConnectButtonJuno"
import Kavawallet from "../../components/ConnectButtonKava"
import Marswallet from "../../components/ConnectButtonMars"
import Noblewallet from "../../components/ConnectButtonNoble"
import Osmosiswallet from "../../components/ConnectButtonOsmosis"
import Sagawallet from "../../components/ConnectButtonSaga"
import Seiwallet from "../../components/ConnectButtonSei"
import Stargazewallet from "../../components/ConnectButtonStargaze"
import { Footer } from "../../components/Layout/Footer"
import { Button, Flex, Grid, HStack, Image, Skeleton, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { keyframes } from "@emotion/react"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { convertMicroDenomToDenom } from "@utils/tokens/helpers"
import shortenNumber from "@utils/ui/shortenNumber"
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
type ChainsrewardsProps = {
	onNext: () => void
	onPrev: () => void
	selectedImages: () => void
}

const Chainsrewards: React.FC<ChainsrewardsProps> = ({ onNext, onPrev }) => {
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

	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")

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
			w="100%"
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
				justifyContent="center"
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
					h="rem"
				>
					<HStack w="100%">
						<Text
							fontFamily="body"
							fontSize={{ base: "sm", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
							alignItems="start"
						>
							Chains
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: "0rem", md: "10rem" }}
							ml={{ base: "2.5rem", md: "0rem" }}
						>
							<HStack>
								<Text fontSize="15">Wallets</Text>
							</HStack>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "10%" }}
							position="relative"
							ml={{ base: "0.3rem", md: "3rem" }}
						>
							<HStack>
								<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
									Balance
								</Text>
							</HStack>
						</HStack>
					</HStack>
				</Flex>
				{/* Akash activity */}
				<Flex
					key="akash"
					bgGradient="linear(rgba(33, 33, 33, 0.9))"
					flexDir="column"
					px={5}
					py={3}
					rounded="1.25em"
					shadow="md"
					w="full"
					maxW="100%"
				>
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/akash.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Akashwallet)}>
								<HStack>
									<Text fontSize="15">
										<Akashwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/axelar.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Axelarwallet)}>
								<HStack>
									<Text fontSize="15">
										<Axelarwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Celestia activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/celestia.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Celestia activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Celestiawallet)}>
								<HStack>
									<Text fontSize="15">
										<Celestiawallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Chihuahua activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/chihuahua.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Chihuahua activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Chihuahuawallet)}>
								<HStack>
									<Text fontSize="15">
										<Chihuahuawallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Cosmoshub activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/cosmoshub.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Cosmoshub activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Cosmoshubwallet)}>
								<HStack>
									<Text fontSize="15">
										<Cosmoshubwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Dydx activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/dydx.svg"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Dydx activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Dydxwallet)}>
								<HStack>
									<Text fontSize="15">
										<Dydxwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Dymension activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/dymension.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Dymension activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Dymensionwallet)}>
								<HStack>
									<Text fontSize="15">
										<Dymensionwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Juno activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/juno.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Juno activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Junowallet)}>
								<HStack>
									<Text fontSize="15">
										<Junowallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Kava activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/kava.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Kava activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Kavawallet)}>
								<HStack>
									<Text fontSize="15">
										<Kavawallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Mars activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/mars.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Mars activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Marswallet)}>
								<HStack>
									<Text fontSize="15">
										<Marswallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Noble activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/noble.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Noble activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Noblewallet)}>
								<HStack>
									<Text fontSize="15">
										<Noblewallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Osmosis activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/osmosis.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Osmosis activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Osmosiswallet)}>
								<HStack>
									<Text fontSize="15">
										<Osmosiswallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Saga activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/saga.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Saga activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Sagawallet)}>
								<HStack>
									<Text fontSize="15">
										<Sagawallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Sei activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/sei.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Sei activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Seiwallet)}>
								<HStack>
									<Text fontSize="15">
										<Seiwallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				{/* Stargaze activity */}
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
					<HStack w="100%">
						<Image
							src="/assets/tokens/airdrop/stars.png"
							w="1.5rem"
							ml={{ base: "-0.5rem", md: "0rem" }}
						/>
						<Text
							fontFamily="body"
							fontSize={{ base: "0.5rem", md: "sm" }}
							fontWeight="900"
							textAlign="start"
							w="82%"
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
								Stargaze activity
							</span>
						</Text>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							minW={{ base: "35%", md: "8rem" }}
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "80%", md: "20%" }}
							position="relative"
							mr={{ base: 0, md: "12rem" }}
						>
							<Skeleton isLoaded={Boolean(Stargazewallet)}>
								<HStack>
									<Text fontSize="15">
										<Stargazewallet />
									</Text>
								</HStack>
							</Skeleton>
						</HStack>
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.2)", color: "white" }}
							bg="offwhite.2"
							color="gray.800"
							h="2rem"
							justify="center"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w={{ base: "75%", md: "20%" }}
							position="relative"
						>
							<Skeleton isLoaded={Boolean(EleBalance)}>
								<HStack>
									<Text fontSize="15" mr={{ base: "-0.5rem", md: "0rem" }}>
										{shortenNumber(convertMicroDenomToDenom(EleBalance, 6), 2)}
									</Text>
									<Image
										src="/assets/tokens/electron.png"
										w={{ base: "1.2rem", md: "1.5rem" }}
										mr={{ base: "0.5rem", md: "0rem" }}
									/>
								</HStack>
							</Skeleton>
						</HStack>
					</HStack>
				</Flex>
				<Flex justifyContent="space-between" mt={4}>
					<Button
						_active={{
							filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						marginLeft={{ base: "7.5em", md: "12em" }}
						shadow="rgba(35, 233, 196, 0.42) 0px 0px 5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
						alignSelf="end"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.100"
						fontSize={{ base: "9", md: "16" }}
						// leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
						mt={2}
						rounded="0.9em"
						transition="all 0.5s"
						width={{ base: "80px", md: "120px" }}
						onClick={onPrev}
					>
						Previous
					</Button>

					<Button
						_active={{
							filter: "brightness(80%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 1px 3px rgba(2,226,150, 1))"
						}}
						marginRight={{ base: "70px", md: "12em" }}
						shadow="rgba(35, 233, 196, 0.42) 0px 0px 5px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
						alignSelf="end"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.100"
						fontSize={{ base: "9", md: "16" }}
						// leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
						mt={2}
						rounded="0.9em"
						transition="all 0.5s"
						width={{ base: "80px", md: "120px" }}
						onClick={onNext}
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

export default Chainsrewards

Chainsrewards.propTypes = {
	onNext: () => null,
	onPrev: () => null
}
