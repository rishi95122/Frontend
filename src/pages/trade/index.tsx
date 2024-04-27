// eslint-disable-next-line canonical/filename-match-exported
import { Footer } from "../../components/Layout/Footer"
import { PoolsPanel } from "./components/PoolsPanel"
import { SwapPanel } from "./components/SwapPanel"
import { Flex, Grid, Heading, useBreakpoint } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Trade = () => {
	const breakpoint = useBreakpoint({ ssr: false })
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
			mt={{ base: -3, md: -10 }}
		>
			<Heading>Trade</Heading>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<Grid gap={4} h="full" minH="54vh" templateColumns="1fr" templateRows="1fr 1fr" w="full">
					<SwapPanel />
					<PoolsPanel />
				</Grid>
			) : (
				<Grid
					gap={{ base: 3, md: 6 }}
					h="full"
					templateColumns={{ base: "1fr", md: "1fr" }}
					w="full"
				>
					<SwapPanel />

					<PoolsPanel />
				</Grid>
			)}
			<Grid
				placeItems="center" // Center items horizontally and vertically
				gridColumnStart="1"
				gridColumnEnd="3"
				gridRowStart="4"
				gridRowEnd="5"
				mt="8px"
			>
				<Footer />
			</Grid>
		</Flex>
	)
}

export default Trade
