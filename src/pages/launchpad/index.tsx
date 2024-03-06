import { Center, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Launchpad = () => {
	return (
		<Center
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
		>
			<Heading>Launchpad</Heading>
		</Center>
	)
}

export default Launchpad
