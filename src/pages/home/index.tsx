import { AssetsPanel } from "./components/AssetsPanel"
import { GovernancePanel } from "./components/GovernancePanel"
import { LaunchpadPanel } from "./components/LaunchpadPanel"
import { MyAssetsPanel } from "./components/MyAssetsPanel"
import { SwapPanel } from "./components/SwapPanel"
import { Flex, Grid, Heading, useBreakpoint } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Home = () => {
	const breakpoint = useBreakpoint({ ssr: false })
	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={4}
			h="full"
			initial={{ opacity: 0 }}
			p={{ base: 4, lg: 24, md: 16 }}
			w="full"
		>
			<Heading>Welcome to ELECTRON</Heading>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<Grid
					gap={4}
					h="full"
					minH="200vh"
					templateColumns="1fr"
					templateRows="1fr 1fr 1fr 1fr 1fr"
					w="full"
				>
					<SwapPanel />
					<AssetsPanel />
					<LaunchpadPanel />
					<GovernancePanel />
					<MyAssetsPanel />
				</Grid>
			) : (
				<Grid
					gap={{ base: 3, md: 6 }}
					h="full"
					templateColumns="1fr"
					templateRows="1.5fr 1fr"
					w="full"
				>
					<Grid
						gap={{ base: 3, md: 6 }}
						templateColumns={{ base: "1fr", md: "1fr 1fr" }}
						templateRows={{ base: "1fr 1fr", md: "1fr" }}
						w="full"
					>
						<SwapPanel />
						<AssetsPanel />
					</Grid>
					<Grid
						gap={{ base: 3, md: 6 }}
						templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
						templateRows={{ base: "1fr 1fr 1fr", md: "1fr" }}
						w="full"
					>
						<LaunchpadPanel />
						<GovernancePanel />
						<MyAssetsPanel />
					</Grid>
				</Grid>
			)}
		</Flex>
	)
}

export default Home
