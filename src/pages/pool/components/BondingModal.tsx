import { BondTokens } from "./BondTokens"
import { RedeemTokens } from "./RedeemTokens"
import { UnbondTokens } from "./UnbondTokens"
import {
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
	Tabs
} from "@chakra-ui/react"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { useParams } from "react-router-dom"

export const BondingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay backdropFilter="blur(70px)" />
			<ModalContent
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
				bg="gray.700"
				bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
				h="31rem"
				rounded="1.25em"
			>
				<ModalHeader color="white" textAlign="center" w="full">
					Manage Bonding
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Tabs h="full" isFitted isLazy variant="soft-rounded">
						<TabList
							_dark={{ bg: "whiteAlpha.200", color: "white" }}
							bg="whiteAlpha.200"
							color="white"
							gap={2}
							h="3rem"
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
								Bond
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
								rounded="1.25em"
							>
								Unbond
							</Tab>
							<Tab
								_dark={{
									_selected: { color: "gray.800" },
									color: "white"
								}}
								_selected={{
									bgGradient: "linear(45deg, brand.1, brand.2)",
									color: "gray.800"
								}}
								color="white"
								rounded="1.25em"
							>
								Redeem
							</Tab>
						</TabList>
						<TabPanels h="calc(100% - 3rem)">
							<TabPanel h="full">
								<BondTokens />
							</TabPanel>
							<TabPanel h="full">
								<UnbondTokens pool={pool?.pool!} />
							</TabPanel>
							<TabPanel h="full">
								<RedeemTokens />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
