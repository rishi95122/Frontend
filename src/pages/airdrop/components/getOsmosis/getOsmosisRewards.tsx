/* eslint-disable no-negated-condition */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { Flex, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import axios from "axios"
import { useEffect, useState } from "react"

type AddressData = {
	delegator_address: string
	share_percentage: number
}

const OsmosisRewards = () => {
	const { address, isWalletConnected } = useChain("osmosis")
	const [walletAddress, setWalletAddress] = useState<string>("")
	const [percentage, setPercentage] = useState<number | null>(null)

	useEffect(() => {
		if (isWalletConnected && address) {
			setWalletAddress(address)
		}
	}, [isWalletConnected, address])

	useEffect(() => {
		const fetchPercentage = async (): Promise<void> => {
			try {
				const response = await axios.get<AddressData[]>(
					"https://raw.githubusercontent.com/Electron-Protocol/airdrop/main/Osmosis/Osmosis_percentage_Rewards.json"
				)
				const data = response.data
				const addressData = data.find(
					// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
					(item) => item.delegator_address.slice(0, 12) === walletAddress.slice(0, 12)
				)
				if (addressData) {
					setPercentage(addressData.share_percentage)
				} else {
					setPercentage(0) // Set percentage to 0 if wallet address not found
				}
			} catch (error) {
				console.error("Error fetching percentage:", error)
			}
		}

		if (walletAddress) {
			void fetchPercentage()
		}
	}, [walletAddress])

	return (
		<Flex alignItems="center" flexDirection="column">
			<Text fontSize={{ base: "0.35rem", md: "0.5rem" }} ml="0">
				Collect Rewards
			</Text>
			<Text fontSize={{ base: "0.35rem", md: "0.5rem" }} ml="0">
				{percentage !== null ? percentage + "%" : "Percentage: N/A"}
			</Text>
		</Flex>
	)
}

export default OsmosisRewards
