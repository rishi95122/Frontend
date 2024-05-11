/* eslint-disable no-negated-condition */
/* eslint-disable eslint-comments/disable-enable-pair */
import Akashwallet from "../../components/ConnectButtonAkash"
// import Axelarwallet from "../../components/ConnectButtonAxelar"
// import Celestiawallet from "../../components/ConnectButtonCelestia"
// import Chihuahuawallet from "../../components/ConnectButtonChihuahua"
// import Cosmoshubwallet from "../../components/ConnectButtonCosmoshub"
// import Dydxwallet from "../../components/ConnectButtonDydx"
// import Dymensionwallet from "../../components/ConnectButtonDymension"
// import Junowallet from "../../components/ConnectButtonJuno"
// import Kavawallet from "../../components/ConnectButtonKava"
// import Marswallet from "../../components/ConnectButtonMars"
// import Noblewallet from "../../components/ConnectButtonNoble"
// import Osmosiswallet from "../../components/ConnectButtonOsmosis"
// import Sagawallet from "../../components/ConnectButtonSaga"
// import Seiwallet from "../../components/ConnectButtonSei"
// import Stargazewallet from "../../components/ConnectButtonStargaze"
import { Footer } from "../../components/Layout/Footer"
import { Box, Button, Flex, Grid, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react"
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
	const [EleBalance] = useTokenBalance("factory/neutron13r3st22qa04c8q0d6elg4eyc55vcyrdhgcjm9f/ELE")
	const [selectionCount, setSelectionCount] = useState(0)

	const handleImageClick = (id: string) => {
		if (id === "1") {
			setIsAkashSelected(!isAkashSelected)
			if (!isAkashSelected) {
				setSelectionCount(selectionCount + 1) // Increment count when selected
			} else {
				setSelectionCount(selectionCount - 1) // Decrement count when unselected
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
		return isAkashSelected /* add other ID checks as needed */
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
									<HStack key={Image.id} spacing={2} justifyContent="center">
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
												opacity={isAkashSelected && image.id === "1" ? 0.9 : 0.4}
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
				</Flex>

				{/* Akash activity */}
				{!isVisible && isAkashSelected && (
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
