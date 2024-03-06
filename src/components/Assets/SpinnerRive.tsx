import { Center } from "@chakra-ui/react"
import RiveComponent from "@rive-app/react-canvas"

export const SpinnerRive = () => {
	return (
		<Center h="5rem" w="5rem">
			<RiveComponent src="/assets/spinner.riv" />
		</Center>
	)
}
