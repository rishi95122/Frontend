import LogoArea from "./LogoArea"
import { RouterArea } from "./RouterArea"
import { Flex, Spacer } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import ConnectButton from "components/ConnectButton"

const Navigation = () => {
	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	return (
		<Flex
			align="start"
			as="nav"
			bgGradient="linear(to-b, #0a2b33, #1a001e)"
			direction={{ base: "row", md: "column" }}
			gap={2}
			justifyContent="start"
			pb={0}
			pt={2}
			px={0}
			transition="0.5s all"
			w={{ base: "full", md: "14rem" }}
			zIndex={5}
		>
			<LogoArea />
			<RouterArea />
			<Spacer />
			<Flex pb={isWalletConnected ? 0 : 2} px={isWalletConnected ? 0 : 2} w="full">
				<ConnectButton />
			</Flex>
		</Flex>
	)
}

export default Navigation
