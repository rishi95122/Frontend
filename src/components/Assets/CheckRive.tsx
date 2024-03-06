import { Center } from "@chakra-ui/react"
import RiveComponent from "@rive-app/react-canvas"

export const CheckRive = () => {
	return (
		<Center h="5rem" w="5rem">
			<RiveComponent src="/assets/check.riv" />
		</Center>
	)
}
