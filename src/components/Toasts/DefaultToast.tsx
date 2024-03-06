import { HStack, Text } from "@chakra-ui/react"
import { SpinnerRive } from "components/Assets/SpinnerRive"

const DefaultToast = ({ toastText, isPromise }: { isPromise: boolean; toastText: string }) => {
	return (
		<HStack spacing={1} w="full">
			{isPromise && <SpinnerRive />}
			<Text
				_dark={{ color: "white" }}
				color="white"
				fontFamily="heading"
				fontSize={isPromise ? "22" : "19"}
				h="full"
				noOfLines={1}
				textAlign={isPromise ? "left" : "center"}
				w="full"
			>
				{toastText}
			</Text>
		</HStack>
	)
}

export default DefaultToast
