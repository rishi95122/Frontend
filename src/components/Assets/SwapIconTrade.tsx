/* eslint-disable no-empty-pattern */
import { Icon, type IconProps } from "@chakra-ui/react"
import { PiSwapFill } from "react-icons/pi"

export const SwapIconTrade = ({}: IconProps) => (
	<Icon boxSize={12} pt={3} ml={3}>
		<PiSwapFill />
	</Icon>
)
