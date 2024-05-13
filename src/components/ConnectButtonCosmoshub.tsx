import { Flex, keyframes, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { useEffect, useState } from "react"

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const Cosmoshubwallet = () => {
	const { address, isWalletConnected } = useChain("cosmoshub")
	const [walletAddress, setWalletAddress] = useState("")

	useEffect(() => {
		if (isWalletConnected && address) {
			setWalletAddress(address)
		}
	}, [isWalletConnected, address])

	const wallet = `${walletAddress.slice(0, 6)}..${walletAddress.slice(-4)}`

	return (
		<Flex alignItems="center">
			<Text
				fontFamily="body"
				fontSize={{ base: "0.6rem", md: "sm" }}
				fontWeight="900"
				position="relative"
				textAlign="center"
				w="full"
				alignItems="start"
				mr={isWalletConnected ? 0 : 0}
			>
				<span
					style={{
						animation: `${gradientAnimation} 2s ease infinite`,
						background: "-webkit-linear-gradient(45deg, #61a9bb, #ec80fe)",
						backgroundSize: "100% 100%",
						fontSize: "larger",
						marginRight: "0px",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent"
					}}
				>
					{wallet}
				</span>
			</Text>
		</Flex>
	)
}

export default Cosmoshubwallet
