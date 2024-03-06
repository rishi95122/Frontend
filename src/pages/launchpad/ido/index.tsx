import { IDOCard } from "./components/IDOCard"
import { type IDOCardType } from "./types"
import { Button, Flex, Heading, HStack, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const IDOMockup: IDOCardType[] = [
	{
		bannerImages: [
			"https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/ido_banner.png"
		],
		fullName: "UNKNOWN Network",
		logo: "https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/logo.svg",
		shortDesc: "Welcome to the jungle!",
		tokenSymbol: "UNKNOWN"
	},
	{
		bannerImages: [
			"https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/ido_banner.png"
		],
		fullName: "UNKNOWN Network II",
		logo: "https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/logo.svg",
		shortDesc: "Welcome to the jungle again!",
		tokenSymbol: "UNKNOWN"
	},
	{
		bannerImages: [
			"https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/ido_banner.png"
		],
		fullName: "UNKNOWN Network III",
		logo: "https://raw.githubusercontent.com/MikeVerse/Branding-proxy/main/logo.svg",
		shortDesc: "Welcome to the jungle again again!",
		tokenSymbol: "UNKNOWN"
	}
]

const IDO = () => {
	const navigate = useNavigate()
	return (
		<Flex
			align="start"
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			justify="start"
			px={5}
			py={5}
			w="full"
		>
			<VStack align="start" w="full">
				<HStack justify="space-between" w="full">
					<Heading>Upcoming IDOs</Heading>
					<Button onClick={() => navigate("/launchpad/ido/create")}>Create IDO</Button>
				</HStack>
				<HStack w="full">
					{IDOMockup.map((idoCard) => {
						// eslint-disable-next-line react/jsx-key
						return <IDOCard {...idoCard} />
					})}
				</HStack>
			</VStack>
		</Flex>
	)
}

export default IDO
