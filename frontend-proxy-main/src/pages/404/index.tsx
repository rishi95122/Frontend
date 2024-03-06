import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
	const navigate = useNavigate()

	const handleBackToHome = () => navigate("/")

	return (
		<Center
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			initial={{ opacity: 0 }}
			textAlign="center"
		>
			<Heading fontSize="5em">Page Not Found</Heading>
			<VStack gap={3} pt={2}>
				<Text fontSize="2xl">There's nothing here. Want to go back?</Text>
				<Button
					_hover={{ bg: "gray.100" }}
					bg="white"
					fontSize="1.3em"
					onClick={handleBackToHome}
					rounded="1em"
					shadow="md"
				>
					Let&apos;s Head Back!
				</Button>
			</VStack>
		</Center>
	)
}

export default Page404
