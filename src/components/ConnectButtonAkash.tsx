import { Button, Flex, keyframes, Text } from "@chakra-ui/react"
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

const Akashwallet = () => {
	const { address, isWalletConnected, connect } = useChain("akash")
	const [walletAddress, setWalletAddress] = useState("")

	useEffect(() => {
		if (isWalletConnected && address) {
			setWalletAddress(address)
		}
	}, [isWalletConnected, address])

	const wallet = `${walletAddress.slice(0, 6)}..${walletAddress.slice(-4)}`

	return (
		<Flex alignItems="center">
			<Flex alignItems="center">
				<Button
					variant="outline"
					h={{ base: "1.5rem", md: "2rem" }}
					px={1}
					position="relative"
					rounded="0.5em"
					colorScheme="blue"
					onClick={connect}
					mr={isWalletConnected ? 5 : 40}
					mt={0}
					pos="relative"
					w={{ base: "25%", md: "100%" }}
					shadow="rgba(35, 233, 196, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(35, 233, 196) 0px 0px 15px inset"
				>
					Check
				</Button>
			</Flex>
			<Text
				fontFamily="body"
				fontSize={{ base: "0.6rem", md: "sm" }}
				fontWeight="900"
				position="relative"
				textAlign="center"
				w="full"
				alignItems="start"
				mr={isWalletConnected ? 20 : 220}
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

export default Akashwallet
