/* eslint-disable no-empty-pattern */
import { Icon, type IconProps } from "@chakra-ui/react"
import { FaHouseUser } from "react-icons/fa6"

export const MyaccountIcon = ({}: IconProps) => (
	<Icon boxSize={9} pt={1}>
		<FaHouseUser />
	</Icon>
)
