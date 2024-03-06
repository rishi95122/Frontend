import { Text, VStack } from "@chakra-ui/react"

export const NoOptionsText = () => {
	return (
		<VStack>
			<Text>No tokens found.</Text>
			<Text>Did you disable 'Zero Balance Assets'?</Text>
		</VStack>
	)
}
