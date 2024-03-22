import { AssetsPanel } from "./components/AssetsPanel"
import { GovernancePanel } from "./components/GovernancePanel"
import { MyAssetsPanel } from "./components/MyAssetsPanel"
import { StakingPanel } from "./components/StakingPanel"
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
			mt={2}
			initial={{ opacity: 0 }}
			p={{ base: 5, lg: 24, md: 16 }}
			w="full"
		>
			<Heading>Welcome to ELECTRON</Heading>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<Grid
					gap={{ base: 4, md: 2 }}
					h="lg"
					minH="50vh"
					templateColumns="repeat(2, 1fr)"
					templateRows="repeat(2, 1fr) 1fr"
					w="full"
				>
					<SwapPanel />
					<AssetsPanel />
					<StakingPanel />
					<GovernancePanel />
					<Grid gridColumnStart="1" gridColumnEnd="3" gridRowStart="3" gridRowEnd="4">
						<MyAssetsPanel />
					</Grid>
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
						<StakingPanel />
						<GovernancePanel />
						<MyAssetsPanel />
					</Grid>
				</Grid>
			)}
		</Flex>
	)
}

export default Home
