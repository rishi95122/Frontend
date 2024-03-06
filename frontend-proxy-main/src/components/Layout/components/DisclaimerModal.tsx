/* eslint-disable prettier/prettier */
/* eslint-disable complexity */
import {
	Button,
	Checkbox,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useBreakpoint,
	useDisclosure,
	VStack
} from "@chakra-ui/react"
import { useLocalStorageState } from "ahooks"
import { useEffect, useRef, useState } from "react"

export const DisclaimerModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const focusRef = useRef(null)

	const [disclaimer, setDisclaimer] = useLocalStorageState<boolean>("disclaimer", {
		defaultValue: false
	})

	const breakpoint = useBreakpoint({ ssr: false })

	useEffect(() => {
		if (!disclaimer) {
			onOpen()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [isChecked, setIsChecked] = useState(false)

	if (breakpoint === "base" || breakpoint === "sm") {
		return (
			<Drawer
				closeOnEsc={false}
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom"
				size="md"
			>
				<DrawerOverlay backdropFilter="blur(70px)" />
				<DrawerContent
					_dark={{
						bg: "gray.700",
						bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
					}}
					bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
					roundedTop="1.25em"
				>
					<DrawerHeader color="white" ref={focusRef} textAlign="center" w="full">
						Discla
					</DrawerHeader>
					<DrawerBody maxH="lg" overflowY="scroll" pb={4}>
						<VStack spacing={4}>
							<VStack>
								<Heading
									color="white"
									fontFamily="body"
									fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
									fontWeight="900"
								>
									No Investment Advice
								</Heading>
								<Text fontSize="15">
									https://app.electron.network offers information, not advice. We don't suggest buying,
									selling, or holding any cryptocurrency. Make sure to conduct your own due
									diligence, consult your financial advisor, and carefully evaluate the risks before
									making any investment decisions, especially when it comes to dApps in the gambling
									and DeFi sectors.
								</Text>
							</VStack>
							<VStack>
								<Heading
									color="white"
									fontFamily="body"
									fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
									fontWeight="900"
								>
									Accuracy of Information
								</Heading>
								<Text fontSize="15">
									We aim for accuracy, but we can't guarantee it. The information on
									https://app.electron.network is presented 'as is'. You bear full responsibility for
									using this information and do so at your own risk.
								</Text>
							</VStack>
							<VStack>
								<Heading
									color="white"
									fontFamily="body"
									fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
									fontWeight="900"
								>
									Non-Endorsement
								</Heading>
								<Text fontSize="15">
									Links and ads for third-party services, whether gambling or DeFi dApps, don't mean
									we endorse them. Do your own research before deciding to use any external
									services.
								</Text>
								<Text fontSize="15" pt={4}>
									By using Electron, you acknowledge that you have read, understood, and agreed to
									these Terms.
								</Text>
							</VStack>
							<HStack>
								<Checkbox
									isChecked={isChecked}
									onChange={(event) => setIsChecked(event.target.checked)}
									rounded="2em"
									size="lg"
								/>
								<Text fontFamily="body" fontSize="sm" fontWeight="600">
									I have read and agreed to these terms
								</Text>
							</HStack>
							<Button
								_active={{
									filter: isChecked
										? "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
										: ""
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
								onClick={() => {
									if (isChecked) {
										setDisclaimer(true)
										onClose()
									}
								}}
								rounded="0.9em"
								transition="all 0.5s"
								w="full"
							>
								Enter App
							</Button>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Modal
			closeOnEsc={false}
			closeOnOverlayClick={false}
			isCentered={!(breakpoint === "base" || breakpoint === "sm")}
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior={breakpoint === "base" || breakpoint === "sm" ? "inside" : "outside"}
			size="xl"
		>
			<ModalOverlay backdropFilter="blur(70px)" />
			<ModalContent
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
				bg="gray.700"
				bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
				rounded="1.25em"
			>
				<ModalHeader color="white" textAlign="center" w="full">
					Disclaimer
				</ModalHeader>
				<ModalBody color="white" pb={4}>
					<VStack spacing={6}>
						<Text color="white">
							Welcome to Electron Network, your hub for innovative speculation and decentralized
							finance services. Accessing or using our services means you accept these terms:
						</Text>
						<VStack align="start">
							<Heading
								fontFamily="body"
								fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
								fontWeight="900"
							>
								No Investment Advice
							</Heading>
							<Text fontSize="15">
								Our services provide a platform for speculation and decentralized finance
								transactions. However, we don't offer financial or investment advice. Users must
								make their decisions independently.
							</Text>
						</VStack>
						<VStack align="start">
							<Heading
								fontFamily="body"
								fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
								fontWeight="900"
							>
								Accuracy of Information
							</Heading>
							<Text fontSize="15">
								While we strive for accuracy, we can't guarantee that all information presented
								within our service is entirely accurate, complete, or current. The reliance on this
								information and any subsequent action is entirely at your own risk.
							</Text>
						</VStack>
						<VStack align="start">
							<Heading
								fontFamily="body"
								fontSize={breakpoint === "base" || breakpoint === "sm" ? "22" : "26"}
								fontWeight="900"
							>
								Non Endorsement
							</Heading>
							<Text fontSize="15">
								Links and ads for third-party services, whether gambling or DeFi dApps, don't mean
								we endorse them. Do your own research before deciding to use any external services.
							</Text>
							<Text fontSize="15" pt={4}>
								By using our service, you affirm being over 18 years old. If you disagree with these
								terms, do not use our services.
							</Text>
						</VStack>
						<HStack>
							<Checkbox
								isChecked={isChecked}
								onChange={(event) => setIsChecked(event.target.checked)}
								rounded="2em"
								size="lg"
							/>
							<Text fontFamily="heading">I have read and agreed to these terms</Text>
						</HStack>
						<Button
							_active={{
								filter: isChecked
									? "brightness(80%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
									: ""
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
							onClick={() => {
								if (isChecked) {
									setDisclaimer(true)
									onClose()
								}
							}}
							rounded="0.9em"
							transition="all 0.5s"
							w="full"
						>
							Enter App
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
