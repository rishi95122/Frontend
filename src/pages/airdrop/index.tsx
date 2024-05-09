/* eslint-disable eslint-comments/disable-enable-pair */
import { Footer } from "../../components/Layout/Footer"
import { Flex, Grid, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { keyframes } from "@emotion/react"
// import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import ConnectButtonAkash from "components/ConnectButtonAkash"
import ConnectButtonAxelar from "components/ConnectButtonAxelar"
import ConnectButtonCelestia from "components/ConnectButtonCelestia"
import ConnectButtonChihuahua from "components/ConnectButtonChihuahua"
import ConnectButtonCosmoshub from "components/ConnectButtonCosmoshub"
import ConnectButtonDydx from "components/ConnectButtonDydx"
import ConnectButtonDymension from "components/ConnectButtonDymension"
import ConnectButtonJuno from "components/ConnectButtonJuno"
import ConnectButtonKava from "components/ConnectButtonKava"
import ConnectButtonMars from "components/ConnectButtonMars"
import ConnectButtonNoble from "components/ConnectButtonNoble"
import ConnectButtonOsmosis from "components/ConnectButtonOsmosis"
import ConnectButtonSaga from "components/ConnectButtonSaga"
import ConnectButtonSei from "components/ConnectButtonSei"
import ConnectButtonStargaze from "components/ConnectButtonStargaze"
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

const Airdrop = () => {
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
						<ConnectButtonAkash />

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
						<ConnectButtonAxelar />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/celestia.png"
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
								Celestia activity
							</span>
						</Text>
						<ConnectButtonCelestia />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/chihuahua.png"
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
								Chihuahua activity
							</span>
						</Text>
						<ConnectButtonChihuahua />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/cosmoshub.png"
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
								Cosmoshub activity
							</span>
						</Text>
						<ConnectButtonCosmoshub />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/dymension.png"
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
								Dymension activity
							</span>
						</Text>
						<ConnectButtonDymension />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/dydx.svg"
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
								Dydx activity
							</span>
						</Text>
						<ConnectButtonDydx />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/kava.png"
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
								Kava activity
							</span>
						</Text>
						<ConnectButtonKava />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/juno.png"
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
								Juno activity
							</span>
						</Text>
						<ConnectButtonJuno />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/mars.png"
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
								Mars activity
							</span>
						</Text>
						<ConnectButtonMars />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/noble.png"
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
								Noble activity
							</span>
						</Text>
						<ConnectButtonNoble />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/osmosis.png"
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
								Osmosis activity
							</span>
						</Text>
						<ConnectButtonOsmosis />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/saga.png"
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
								Saga activity
							</span>
						</Text>
						<ConnectButtonSaga />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/sei.png"
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
								Sei activity
							</span>
						</Text>
						<ConnectButtonSei />

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
					<HStack w="full">
						<Image
							src="/assets/tokens/airdrop/stars.png"
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
								Stargaze activity
							</span>
						</Text>
						<ConnectButtonStargaze />

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
