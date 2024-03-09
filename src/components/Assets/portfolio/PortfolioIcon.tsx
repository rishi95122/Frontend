/* eslint-disable no-empty-pattern */
import { Icon, type IconProps } from "@chakra-ui/react"
import { BiWalletAlt } from "react-icons/bi"

export const PortfolioIcon = ({}: IconProps) => (
	<Icon boxSize={9} pt={1}>
		<BiWalletAlt />
	</Icon>
)
