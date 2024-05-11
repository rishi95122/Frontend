/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
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
import { Box, Button, Flex, Grid, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { keyframes } from "@emotion/react"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { convertMicroDenomToDenom } from "@utils/tokens/helpers"
import shortenNumber from "@utils/ui/shortenNumber"
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

type PickchainsProps = {
	onNext: () => void
	onPrev: () => void
}

type ImageData = {
	id: string
	src: string
	text: string
}

const Pickchains: React.FC<PickchainsProps> = ({ onPrev }) => {
	const [selectionMade, setSelectionMade] = useState(false)
	const [isVisible, setIsVisible] = useState(true)
	const [isAkashSelected, setIsAkashSelected] = useState(false)
	const [isAxelarSelected, setIsAxelarSelected] = useState(false)
	const [isCelestiaSelected, setIsCelestiaSelected] = useState(false)
	const [isChihuahuaSelected, setIsChihuahuaSelected] = useState(false)
	const [isCosmoshubSelected, setIsCosmoshubSelected] = useState(false)
	const [isDydxSelected, setIsDydxSelected] = useState(false)
	const [isDymensionSelected, setIsDymensionSelected] = useState(false)
	const [isJunoSelected, setIsJunoSelected] = useState(false)
	const [isKavaSelected, setIsKavaSelected] = useState(false)
	const [isMarsSelected, setIsMarsSelected] = useState(false)
	const [isNobleSelected, setIsNobleSelected] = useState(false)
	const [isOsmosisSelected, setIsOsmosisSelected] = useState(false)
	const [isSagaSelected, setIsSagaSelected] = useState(false)
	const [isSeiSelected, setIsSeiSelected] = useState(false)
	const [isStargazeSelected, setIsStargazeSelected] = useState(false)
	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")
	const [selectionCount, setSelectionCount] = useState(0)

	const [isBoxSelected, setIsBoxSelected] = useState<{ [key: string]: boolean }>({
		"1": false,
		"2": false,
		"3": false,
		"4": false,
		"5": false,
		"6": false,
		"7": false,
		"8": false,
		"9": false,
		"10": false,
		"11": false,
		"12": false,
		"13": false,
		"14": false,
		"15": false
	})

	const { isWalletConnected, connect } = useChain("akash")

	const handleImageClick = (id: string) => {
		if (id === "1") {
			setIsAkashSelected(!isAkashSelected)
			setIsBoxSelected({ ...isBoxSelected, "1": !isAkashSelected })
			if (!isAkashSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "2") {
			setIsAxelarSelected(!isAxelarSelected)
			setIsBoxSelected({ ...isBoxSelected, "2": !isAxelarSelected })
			if (!isAxelarSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "3") {
			setIsCelestiaSelected(!isCelestiaSelected)
			setIsBoxSelected({ ...isBoxSelected, "3": !isCelestiaSelected })
			if (!isCelestiaSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "4") {
			setIsChihuahuaSelected(!isChihuahuaSelected)
			setIsBoxSelected({ ...isBoxSelected, "4": !isChihuahuaSelected })
			if (!isChihuahuaSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "5") {
			setIsCosmoshubSelected(!isCosmoshubSelected)
			setIsBoxSelected({ ...isBoxSelected, "5": !isCosmoshubSelected })
			if (!isCosmoshubSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "6") {
			setIsDydxSelected(!isDydxSelected)
			setIsBoxSelected({ ...isBoxSelected, "6": !isDydxSelected })
			if (!isDydxSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "7") {
			setIsDymensionSelected(!isDymensionSelected)
			setIsBoxSelected({ ...isBoxSelected, "7": !isDymensionSelected })
			if (!isDymensionSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "8") {
			setIsJunoSelected(!isJunoSelected)
			setIsBoxSelected({ ...isBoxSelected, "8": !isJunoSelected })
			if (!isJunoSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "9") {
			setIsKavaSelected(!isKavaSelected)
			setIsBoxSelected({ ...isBoxSelected, "9": !isKavaSelected })
			if (!isKavaSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "10") {
			setIsMarsSelected(!isMarsSelected)
			setIsBoxSelected({ ...isBoxSelected, "10": !isMarsSelected })
			if (!isMarsSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "11") {
			setIsNobleSelected(!isNobleSelected)
			setIsBoxSelected({ ...isBoxSelected, "11": !isNobleSelected })
			if (!isNobleSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "12") {
			setIsOsmosisSelected(!isOsmosisSelected)
			setIsBoxSelected({ ...isBoxSelected, "12": !isOsmosisSelected })
			if (!isOsmosisSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "13") {
			setIsSagaSelected(!isSagaSelected)
			setIsBoxSelected({ ...isBoxSelected, "13": !isSagaSelected })
			if (!isSagaSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "14") {
			setIsSeiSelected(!isSeiSelected)
			setIsBoxSelected({ ...isBoxSelected, "14": !isSeiSelected })
			if (!isSeiSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "15") {
			setIsStargazeSelected(!isStargazeSelected)
			setIsBoxSelected({ ...isBoxSelected, "15": !isStargazeSelected })
			if (!isStargazeSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		}
		// Handle other image clicks if needed
	}

	useEffect(() => {
		// If at least one selection is made, set selectionMade to true
		setSelectionMade(selectionCount > 0)
	}, [selectionCount])

	const handleSelectionMade = () => {
		// Check if at least one ID is selected
		return (
			isAkashSelected ||
			isAxelarSelected ||
			isCelestiaSelected ||
			isChihuahuaSelected ||
			isCosmoshubSelected ||
			isDydxSelected ||
			isDymensionSelected ||
			isJunoSelected ||
			isKavaSelected ||
			isMarsSelected ||
			isNobleSelected ||
			isOsmosisSelected ||
			isSagaSelected ||
			isSeiSelected ||
			isStargazeSelected
		)
	}

	const handleNextClick = () => {
		// Check if at least one ID is selected before setting isVisible to false
		if (handleSelectionMade()) {
			setIsVisible(false) // Allow setting isVisible to false
		} else {
			// Handle case when no IDs are selected
			// eslint-disable-next-line no-console
			console.log("Please select at least one Chain before proceeding.")
		}
	}

	const images: ImageData[] = [
		{ id: "1", src: "/assets/tokens/airdrop/akash.png", text: "Akash" },
		{ id: "2", src: "/assets/tokens/airdrop/axelar.png", text: "Axelar" },
		{ id: "3", src: "/assets/tokens/airdrop/celestia.png", text: "Celestia" },
		{ id: "4", src: "/assets/tokens/airdrop/chihuahua.png", text: "Chihuahua" },
		{ id: "5", src: "/assets/tokens/airdrop/cosmoshub.png", text: "Cosmoshub" },
		{ id: "6", src: "/assets/tokens/airdrop/dydx.svg", text: "Dydx" },
		{ id: "7", src: "/assets/tokens/airdrop/dymension.png", text: "Dymension" },
		{ id: "8", src: "/assets/tokens/airdrop/juno.png", text: "Juno" },
		{ id: "9", src: "/assets/tokens/airdrop/kava.png", text: "Kava" },
		{ id: "10", src: "/assets/tokens/airdrop/mars.png", text: "Mars" },
		{ id: "11", src: "/assets/tokens/airdrop/noble.png", text: "Noble" },
		{ id: "12", src: "/assets/tokens/airdrop/osmosis.png", text: "Osmosis" },
		{ id: "13", src: "/assets/tokens/airdrop/saga.png", text: "Saga" },
		{ id: "14", src: "/assets/tokens/airdrop/sei.png", text: "Sei" },
		{ id: "15", src: "/assets/tokens/airdrop/stars.png", text: "Stargaze" }
	]

	const rows = []
	for (let index = 0; index < images.length; index += 5) {
		rows.push(images.slice(index, index + 5))
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
				{isVisible && (
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
									Pick your chains
								</span>
							</Text>
						</HStack>
					</Flex>
				)}
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
					{isVisible && (
						<HStack w="full">
							<VStack spacing={4}>
								{rows.map((row) => (
									<HStack key={-1} spacing={2} justifyContent="center">
										{row.map((image) => (
											<Box
												key={image.id}
												onClick={() => handleImageClick(image.id)}
												border="0.5px solid"
												borderRadius="md"
												p={2}
												cursor="pointer"
												w={153.5}
												h="80px"
												opacity={isBoxSelected[image.id] ? 0.9 : 0.4}
											>
												<Image
													src={image.src}
													boxSize="80px"
													w="2em"
													h="2em"
													mr="-15px"
													opacity={0.9}
												/>
												<Text>{image.text}</Text>
											</Box>
										))}
									</HStack>
								))}
							</VStack>
						</HStack>
					)}
					{!isVisible &&
						(isAkashSelected ||
							isAxelarSelected ||
							isCelestiaSelected ||
							isChihuahuaSelected ||
							isCosmoshubSelected ||
							isDydxSelected ||
							isDymensionSelected ||
							isJunoSelected ||
							isKavaSelected ||
							isMarsSelected ||
							isNobleSelected ||
							isOsmosisSelected ||
							isSagaSelected ||
							isSeiSelected ||
							isStargazeSelected) && (
							<Flex alignItems="center" justifyContent="space-between">
								<Text
									fontFamily="body"
									fontSize={{ base: "0.6rem", md: "sm" }}
									fontWeight="900"
									position="relative"
									textAlign="left"
									w="full"
									alignItems="start"
									mr={20}
								>
									Chains
								</Text>
								<Text
									fontFamily="body"
									fontSize={{ base: "0.6rem", md: "sm" }}
									fontWeight="900"
									position="relative"
									textAlign="left"
									w="full"
									alignItems="start"
									mr={10}
								>
									Wallets
								</Text>
								<Button
									variant="outline"
									h={{ base: "1.5rem", md: "2rem" }}
									px={1}
									position="relative"
									marginLeft="auto"
									rounded="0.7em"
									colorScheme="purple"
									onClick={connect}
									mr={isWalletConnected ? 0 : 40}
									mt={0}
									pos="relative"
									w={{ base: "25%", md: "23%" }}
									shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
								>
									Check
								</Button>
							</Flex>
						)}
				</Flex>

				{/* Akash activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
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
							display={isAkashSelected ? "flex" : "none"}
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
					)}
				{/* Axelar activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="axelar"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isAxelarSelected ? "flex" : "none"}
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
								{/* Akash wallet and balance */}
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
					)}
				{/* Celestia activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="celestia"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isCelestiaSelected ? "flex" : "none"}
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
					)}
				{/* Chihuahua activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="chihuahua"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isChihuahuaSelected ? "flex" : "none"}
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
					)}
				{/* Cosmoshub activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="cosmoshub"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isCosmoshubSelected ? "flex" : "none"}
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
					)}
				{/* Dydx activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="dydx"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isDydxSelected ? "flex" : "none"}
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
					)}
				{/* Dymension activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="dymension"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isDymensionSelected ? "flex" : "none"}
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
					)}
				{/* Juno activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="juno"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isJunoSelected ? "flex" : "none"}
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
					)}
				{/* Kava activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="kava"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isKavaSelected ? "flex" : "none"}
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
					)}
				{/* Mars activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="mars"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isMarsSelected ? "flex" : "none"}
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
					)}
				{/* Noble activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="noble"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isNobleSelected ? "flex" : "none"}
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
					)}
				{/* Osmosis activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="osmosis"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isOsmosisSelected ? "flex" : "none"}
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
					)}
				{/* Saga activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="saga"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isSagaSelected ? "flex" : "none"}
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
					)}
				{/* Sei activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="sei"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isSeiSelected ? "flex" : "none"}
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
					)}
				{/* Stargaze activity */}
				{!isVisible &&
					(isAkashSelected ||
						isAxelarSelected ||
						isCelestiaSelected ||
						isChihuahuaSelected ||
						isCosmoshubSelected ||
						isDydxSelected ||
						isDymensionSelected ||
						isJunoSelected ||
						isKavaSelected ||
						isMarsSelected ||
						isNobleSelected ||
						isOsmosisSelected ||
						isSagaSelected ||
						isSeiSelected ||
						isStargazeSelected) && (
						<Flex
							key="stargaze"
							bgGradient="linear(rgba(33, 33, 33, 0.9))"
							flexDir="column"
							px={5}
							py={3}
							rounded="1.25em"
							shadow="md"
							w="full"
							maxW="100%"
							display={isStargazeSelected ? "flex" : "none"}
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
					)}
				<Flex justifyContent="space-between" mt={4}>
					<Button
						marginLeft="12em"
						onClick={onPrev}
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
						maxW="6rem"
						mt={2}
						rounded="0.9em"
						transition="all 0.5s"
						width="120px"
					>
						Previous
					</Button>
					<Button
						onClick={handleNextClick}
						marginRight="12em"
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
						maxW="6rem"
						mt={2}
						rounded="0.9em"
						transition="all 0.5s"
						width="120px"
						disabled={!selectionMade}
						bg={selectionMade ? "linear(45deg, brand.1, brand.2)" : "gray"}
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

export default Pickchains

Pickchains.propTypes = {
	onPrev: () => null
}
