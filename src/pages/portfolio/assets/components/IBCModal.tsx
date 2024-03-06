import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useBreakpoint
} from "@chakra-ui/react"
import { type Token } from "@utils/tokens/tokens"

export const IBCModal = ({
	isOpen,
	onClose,
	token,
	type
}: {
	isOpen: boolean
	onClose: () => void
	token: Token
	type: "deposit" | "withdraw"
}) => {
	const breakpoint = useBreakpoint({ ssr: false })

	if (breakpoint === "base" || breakpoint === "sm") {
		return (
			<Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent roundedTop="1.25em">
					<DrawerHeader w="full" textAlign="center">
						Manage your {token?.symbol}
					</DrawerHeader>

					<DrawerBody>
						<Tabs
							defaultIndex={type === "deposit" ? 0 : 1}
							isFitted
							isLazy
							variant="soft-rounded"
							h="full"
						>
							<TabList
								color="gray.800"
								_dark={{ bg: "whiteAlpha.200", color: "white" }}
								gap={2}
								h="3rem"
								bg="blackAlpha.200"
								rounded="1.25em"
							>
								<Tab
									fontWeight="900"
									color="gray.800"
									rounded="1.25em"
									_dark={{
										_selected: { color: "gray.800" },
										color: "white"
									}}
									_selected={{
										bgGradient: "linear(45deg, brand.1, brand.2)",
										color: "gray.800"
									}}
								>
									Deposit
								</Tab>
								<Tab
									color="gray.800"
									rounded="1.25em"
									_dark={{
										_selected: { color: "gray.800" },
										color: "white"
									}}
									_selected={{
										bgGradient: "linear(45deg, brand.1, brand.2)",
										color: "gray.800"
									}}
								>
									Withdraw
								</Tab>
							</TabList>
							<TabPanels h="calc(100% - 3rem)">
								<TabPanel>
									<Deposit token={token} />
								</TabPanel>
								<TabPanel>
									<Withdraw token={token} />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent
				rounded="1.25em"
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
			>
				<ModalHeader>Manage your {token?.symbol}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Tabs
						defaultIndex={type === "deposit" ? 0 : 1}
						isFitted
						isLazy
						variant="soft-rounded"
						h="full"
					>
						<TabList
							color="gray.800"
							_dark={{ bg: "whiteAlpha.200", color: "white" }}
							gap={2}
							h="3rem"
							bg="blackAlpha.200"
							rounded="1.25em"
							shadow="md"
						>
							<Tab
								_dark={{
									_selected: { color: "gray.800" },
									color: "white"
								}}
								_selected={{
									bgGradient: "linear(45deg, brand.1, brand.2)",
									color: "gray.800",
									shadow: "glowMd"
								}}
								color="white"
								fontWeight="900"
								rounded="1.25em"
							>
								Deposit
							</Tab>
							<Tab
								_dark={{
									_selected: { color: "gray.800" },
									color: "white"
								}}
								_selected={{
									bgGradient: "linear(45deg, brand.1, brand.2)",
									color: "gray.800",
									shadow: "glowMd"
								}}
								color="white"
								fontWeight="900"
								rounded="1.25em"
							>
								Withdraw
							</Tab>
						</TabList>
						<TabPanels h="calc(100% - 3rem)">
							<TabPanel>
								<Deposit token={token} />
							</TabPanel>
							<TabPanel>
								<Withdraw token={token} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
