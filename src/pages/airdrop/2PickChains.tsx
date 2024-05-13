/* eslint-disable no-console */
/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
/* eslint-disable eslint-comments/disable-enable-pair */
import Akashwallet from "../../components/ConnectButtonAkash"
import Celestiawallet from "../../components/ConnectButtonCelestia"
import Cosmoshubwallet from "../../components/ConnectButtonCosmoshub"
import Dydxwallet from "../../components/ConnectButtonDydx"
import Dymensionwallet from "../../components/ConnectButtonDymension"
import Junowallet from "../../components/ConnectButtonJuno"
import Noblewallet from "../../components/ConnectButtonNoble"
import Osmosiswallet from "../../components/ConnectButtonOsmosis"
import Seiwallet from "../../components/ConnectButtonSei"
import { Footer } from "../../components/Layout/Footer"
import { PortfolioSummary } from "./components/PortfolioSummary"
import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	HStack,
	Image,
	Skeleton,
	Text,
	VStack
} from "@chakra-ui/react"
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
	connect: () => void
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
	const [isNobleSelected, setIsNobleSelected] = useState(false)
	const [isCelestiaSelected, setIsCelestiaSelected] = useState(false)
	const [isCosmoshubSelected, setIsCosmoshubSelected] = useState(false)
	const [isDydxSelected, setIsDydxSelected] = useState(false)
	const [isDymensionSelected, setIsDymensionSelected] = useState(false)
	const [isJunoSelected, setIsJunoSelected] = useState(false)
	const [isAkashSelected, setIsAkashSelected] = useState(false)
	const [isOsmosisSelected, setIsOsmosisSelected] = useState(false)
	const [isSeiSelected, setIsSeiSelected] = useState(false)
	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")
	const [selectionCount, setSelectionCount] = useState(0)
	const [nextButtonClicked, setNextButtonClicked] = useState(false)

	const [isBoxSelected, setIsBoxSelected] = useState<{ [key: string]: boolean }>({
		"1": false,
		"2": false,
		"3": false,
		"4": false,
		"5": false,
		"6": false,
		"7": false,
		"8": false,
		"9": false
	})

	const areChainsSelected =
		isAkashSelected ||
		isCelestiaSelected ||
		isCosmoshubSelected ||
		isDydxSelected ||
		isDymensionSelected ||
		isJunoSelected ||
		isNobleSelected ||
		isOsmosisSelected ||
		isSeiSelected

	const { connect } = useChain("akash")

	const [pressed, setPressed] = useState(false)

	const handleClick = () => {
		setPressed(true)
		void connect() // Call the connect function from useChain
	}

	const handleImageClick = (id: string) => {
		if (id === "1") {
			setIsNobleSelected(!isNobleSelected)
			setIsBoxSelected({ ...isBoxSelected, "1": !isNobleSelected })
			if (!isNobleSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "2") {
			setIsCelestiaSelected(!isCelestiaSelected)
			setIsBoxSelected({ ...isBoxSelected, "2": !isCelestiaSelected })
			if (!isCelestiaSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "3") {
			setIsCosmoshubSelected(!isCosmoshubSelected)
			setIsBoxSelected({ ...isBoxSelected, "3": !isCosmoshubSelected })
			if (!isCosmoshubSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "4") {
			setIsDydxSelected(!isDydxSelected)
			setIsBoxSelected({ ...isBoxSelected, "4": !isDydxSelected })
			if (!isDydxSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "5") {
			setIsDymensionSelected(!isDymensionSelected)
			setIsBoxSelected({ ...isBoxSelected, "5": !isDymensionSelected })
			if (!isDymensionSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "6") {
			setIsJunoSelected(!isJunoSelected)
			setIsBoxSelected({ ...isBoxSelected, "6": !isJunoSelected })
			if (!isJunoSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "7") {
			setIsAkashSelected(!isAkashSelected)
			setIsBoxSelected({ ...isBoxSelected, "7": !isAkashSelected })
			if (!isAkashSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "8") {
			setIsOsmosisSelected(!isOsmosisSelected)
			setIsBoxSelected({ ...isBoxSelected, "8": !isOsmosisSelected })
			if (!isOsmosisSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		} else if (id === "9") {
			setIsSeiSelected(!isSeiSelected)
			setIsBoxSelected({ ...isBoxSelected, "9": !isSeiSelected })
			if (!isSeiSelected) {
				setSelectionCount(selectionCount + 1)
			} else {
				setSelectionCount(selectionCount - 1)
			}
		}
	}

	useEffect(() => {
		// If at least one selection is made, set selectionMade to true
		setSelectionMade(selectionCount > 0)
	}, [selectionCount])

	const handleSelectionMade = () => {
		// Check if at least one ID is selected
		return (
			isNobleSelected ||
			isCelestiaSelected ||
			isCosmoshubSelected ||
			isDydxSelected ||
			isDymensionSelected ||
			isJunoSelected ||
			isAkashSelected ||
			isOsmosisSelected ||
			isSeiSelected
		)
	}

	const handleNextClick = () => {
		// Check if at least one ID is selected before setting isVisible to false
		if (handleSelectionMade()) {
			setIsVisible(false) // Allow setting isVisible to false
		} else {
			// Handle case when no IDs are selected
			// eslint-disable-next-line eslint-comments/no-duplicate-disable
			// eslint-disable-next-line no-console
			console.log("Please select at least one Chain before proceeding.")
		}

		setNextButtonClicked(false)
	}

	const images: ImageData[] = [
		{ id: "1", src: "/assets/tokens/airdrop/noble.png", text: "Neutron" },
		{ id: "2", src: "/assets/tokens/airdrop/celestia.png", text: "Celestia" },
		{ id: "3", src: "/assets/tokens/airdrop/cosmoshub.png", text: "Cosmoshub" },
		{ id: "4", src: "/assets/tokens/airdrop/dydx.svg", text: "Dydx" },
		{ id: "5", src: "/assets/tokens/airdrop/dymension.png", text: "Dymension" },
		{ id: "6", src: "/assets/tokens/airdrop/juno.png", text: "Juno" },
		{ id: "7", src: "/assets/tokens/airdrop/akash.png", text: "Akash" },
		{ id: "8", src: "/assets/tokens/airdrop/osmosis.png", text: "Osmosis" },
		{ id: "9", src: "/assets/tokens/airdrop/sei.png", text: "Sei" }
	]

	const rows = []
	for (let index = 0; index < images.length; index += 3) {
		rows.push(images.slice(index, index + 3))
	}

	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={2}
			h="full"
			mt={-4}
			initial={{ opacity: 0 }}
			p={{ base: 5, lg: 24, md: 16 }}
			w="full"
			justifyContent="center"
		>
			<Heading>Verify Eligibility</Heading>
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
								fontSize={{ base: "0.6rem", md: "0.7rem" }}
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
										fontSize: "sm",
										marginRight: "0px",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent"
									}}
								>
									Ready to claim your $ELE? Connect the wallet you've used to interact with
									Electron, or the one where you're holding or staking the eligible Cosmos tokens we
									announced. Just a heads up—make sure your wallet is connected properly, or you
									won't be able to move on and snag your $ELE.
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
						<HStack w="full" justifyContent="center">
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
												w={{ base: "5em", md: 153.5 }}
												h={{ base: "4em", md: "80px" }}
												opacity={isBoxSelected[image.id] ? 0.9 : 0.4}
												display="flex" // Use flexbox for centering
												flexDirection="column" // Stack items vertically
												alignItems="center" // Center items horizontally
												justifyContent="space-between" // Space items evenly vertically
											>
												<Image
													src={image.src}
													boxSize="80px"
													w={{ base: "1.8em", md: "2em" }}
													h={{ base: "1.8em", md: "2em" }}
													mr="0px"
													opacity={0.9}
												/>
												<Text fontSize={{ base: "10px", md: "1em" }}>{image.text}</Text>
											</Box>
										))}
									</HStack>
								))}
							</VStack>
						</HStack>
					)}
					{!isVisible && areChainsSelected && (
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
							{pressed ? (
								<Button
									variant="outline"
									h={{ base: "1.8rem", md: "2rem" }}
									px={1}
									position="relative"
									fontSize={{ base: "0.5rem", md: "1rem" }}
									rounded="0.7em"
									colorScheme="blue" // Change color or any other property as needed
									onClick={() => console.log("Another action")}
									mt={0}
									pos="relative"
									w={{ base: "130%", md: "23%" }}
									shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
								>
									Claim
								</Button>
							) : (
								<Button
									variant="outline"
									h={{ base: "1.8rem", md: "2rem" }}
									px={1}
									position="relative"
									fontSize={{ base: "0.5rem", md: "1rem" }}
									rounded="0.7em"
									colorScheme="purple"
									onClick={handleClick}
									mt={0}
									pos="relative"
									w={{ base: "130%", md: "23%" }}
									shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
								>
									Check
								</Button>
							)}
						</Flex>
					)}
				</Flex>

				{/* Neutron activity */}
				{!isVisible && areChainsSelected && (
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
									Neutron activity
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
				{/* Celestia activity */}
				{!isVisible && areChainsSelected && (
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
				{/* Cosmoshub activity */}
				{!isVisible && areChainsSelected && (
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
				{!isVisible && areChainsSelected && (
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
				{!isVisible && areChainsSelected && (
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
				{!isVisible && areChainsSelected && (
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
				{/* Akash activity */}
				{!isVisible && areChainsSelected && (
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
				{/* Osmosis activity */}
				{!isVisible && areChainsSelected && (
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
				{/* Sei activity */}
				{!isVisible && areChainsSelected && (
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
				{!isVisible && (
					<Flex justifyContent="center" mt={2} mb={2} gap={{ base: 20, md: 250 }}>
						<PortfolioSummary />
					</Flex>
				)}
				<Flex justifyContent="center" mt={2} mb={2} gap={{ base: 20, md: 250 }}>
					{!isVisible && (
						<Button
							marginLeft={{ base: "0", md: "0em" }}
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
							fontSize={{ base: "8", md: "16" }}
							maxW={{ base: "6rem", md: "6rem" }}
							mt={2}
							rounded="0.9em"
							transition="all 0.5s"
							width={{ base: "120px", md: "120px" }}
						>
							Done
						</Button>
					)}
					{!nextButtonClicked && isVisible && (
						<Button
							onClick={handleNextClick}
							marginRight={{ base: "0em", md: "0em" }}
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
							fontSize={{ base: "8", md: "16" }}
							maxW="6rem"
							mt={2}
							ml={{ base: 0, md: 0 }}
							rounded="0.9em"
							transition="all 0.5s"
							width={{ base: "120px", md: "120px" }}
							disabled={!selectionMade}
							bg={selectionMade ? "linear(45deg, brand.1, brand.2)" : "gray"}
						>
							Next
						</Button>
					)}
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
