/* eslint-disable no-empty-pattern */
import { Icon, type IconProps } from "@chakra-ui/react"
import { FaParachuteBox } from "react-icons/fa"

export const ParachuteIcon = ({}: IconProps) => (
	<Icon boxSize={9} pt={1}>
		<FaParachuteBox />
	</Icon>
)
