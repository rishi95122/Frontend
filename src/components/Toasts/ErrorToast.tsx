import { HStack, Text, VStack } from "@chakra-ui/react"
import { ErrorRive } from "components/Assets/ErrorRive"

const ErrorToast = ({ errorMessage, errorTitle }: { errorMessage: string; errorTitle: string }) => {
	return (
		<HStack spacing={0.5} w="full">
			<ErrorRive />
			<VStack align="start" spacing={0.5}>
				<Text
					_dark={{ color: "white" }}
					color="white"
					fontFamily="heading"
					h="full"
					noOfLines={1}
					w="full"
				>
					{errorTitle}
				</Text>
				<Text
					_dark={{ color: "white" }}
					color="white"
					fontFamily="body"
					fontSize="sm"
					h="full"
					noOfLines={1}
					w="full"
				>
					{errorMessage}
				</Text>
			</VStack>
		</HStack>
	)
}

export default ErrorToast
