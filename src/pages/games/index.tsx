import { Flex, Grid, Heading, useBreakpoint } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { CrashPanel } from "pages/games/components/CrashPanel"
import { FuturesPanel } from "pages/games/components/FuturesPanel"
import { JungleLootPanel } from "pages/games/components/JungleLootPanel"
import { PredictionPanel } from "pages/games/components/PredictionPanel"
import { TribalSpearsPanel } from "pages/games/components/TribalSpearsPanel"

const Games = () => {
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
			<Heading>Speculate</Heading>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<Grid
					gap={4}
					h="full"
					minH="200vh"
					templateColumns="1fr"
					templateRows="1fr 1fr 1fr 1fr 1fr"
					w="full"
				>
					<PredictionPanel />
					<CrashPanel />
					<TribalSpearsPanel />
					<JungleLootPanel />
					<FuturesPanel />
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
						<PredictionPanel />
						<CrashPanel />
					</Grid>
					<Grid
						gap={{ base: 3, md: 6 }}
						templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
						templateRows={{ base: "1fr 1fr 1fr", md: "1fr" }}
						w="full"
					>
						<TribalSpearsPanel />
						<JungleLootPanel />
						<FuturesPanel />
					</Grid>
				</Grid>
			)}
		</Flex>
	)
}

export default Games
