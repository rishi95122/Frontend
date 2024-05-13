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
					bgGradient: "linear(to-b, #0a2b33, #1a001e)"
				}}
				bg="gray.700"
				bgGradient="linear(to-b, #0a2b33, #1a001e)"
				rounded="1.25em"
			>
				<ModalHeader color="white" textAlign="center" w="full">
					Token airdrop terms
				</ModalHeader>
				<ModalBody color="white" pb={4}>
					<VStack spacing={6}>
						<Text color="white" fontSize="12">
						Welcome to the Supplemental Token Airdrop Terms (these “Airdrop Terms”) 
						for the ELE token airdrop (the “Airdrop”) by Electron limited (“Organization”, “we” or “us”). 
						These Airdrop Terms are supplemental to, and incorporate by reference, our general Terms of 
						Service (“General Terms”). Defined terms used but not defined herein have the meaning set 
						forth in the General Terms. The Airdrop, and your participation in it, is a Service defined
						under the General Terms. These Airdrop Terms govern your ability to use our Services in order 
						to participate in the Airdrop. Please read these Airdrop Terms carefully, as they include 
						important information about your legal rights. By participating in the Airdrop or claiming 
						Airdrop tokens, you are agreeing to these Airdrop Terms. If you do not understand or agree 
						to these Airdrop Terms, please do not participate in the Airdrop.						
						</Text>
						<VStack align="start">
							<Text fontSize="10">
							SECTION 7 OF THE GENERAL TERMS CONTAINS AN ARBITRATION CLAUSE AND CLASS ACTION WAIVER. PLEASE REVIEW SUCH CLAUSES CAREFULLY, SINCE IT AFFECTS YOUR RIGHTS. BY AGREEING TO THESE AIRDROP TERMS, YOU AGREE TO RESOLVE ALL DISPUTES RELATED TO THE AIRDROP THROUGH BINDING INDIVIDUAL ARBITRATION AND TO WAIVE YOUR RIGHT TO PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS OR REPRESENTATIVE ACTIONS, AS SET FORTH IN THE GENERAL TERMS. YOU HAVE THE RIGHT TO OPT-OUT OF THE ARBITRATION CLAUSE AND THE CLASS ACTION WAIVER AS EXPLAINED IN SECTION 7 OF THE GENERAL TERMS.
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							You agree and acknowledge that you have the sole responsibility and liability for all taxes in connection with your participation in the Airdrop and you should consult a tax advisor.							
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							You agree and acknowledge that you are solely responsible for complying with all applicable laws of the jurisdiction you are located or participating in the Airdrop from
							</Text>
							<Text fontSize="10" pt={4}>
							You agree and acknowledge that you (a) may receive tokens for free via the Airdrop (other than applicable taxes, if any), (b) were not previously promised any tokens, and (c) took no action in anticipation of or in reliance on receiving any tokens or an Airdrop.							
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							Your eligibility to receive Airdrop tokens or participate in the Airdrop is subject to our sole discretion. To the extent you believe you should have received any airdropped tokens based on any documentation or points system released by us from time to time, such documentation does not entitle you to any tokens or to participate in the Airdrop and therefore you have no claim for any such tokens.						
							</Text>
							</VStack>
						<VStack align="start">
							<Text fontSize="10">
							You agree not to engage in any activities that are designed to obtain more Airdrop tokens than you are entitled to. You agree that you are the legal owner of the blockchain address that you use to access or participate in the Airdrop.							
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							You agree and acknowledge that you are not a Prohibited Person and you will not use a VPN or other tool to circumvent any geoblock or other restrictions that we may have implemented for Airdrop recipients. Any such circumvention, or attempted circumvention, may permanently disqualify you from participation in the Airdrop in our discretion.
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							To participate in the Airdrop, you will need to connect a compatible third-party digital wallet (“Wallet”). By using a Wallet, you agree that you are using the Wallet under the terms and conditions of the applicable third-party provider of such Wallet. Wallets are not associated with, maintained by, supported by or affiliated with the Organization.							
							</Text>
						</VStack>
						<VStack align="start">
							<Text fontSize="10">
							When you interact with the Services, you retain control over your digital assets at all times. We accept no responsibility or liability to you in connection with your use of a Wallet, and we make no representations or warranties regarding how the Services will operate or be compatible with any specific Wallet.							
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
