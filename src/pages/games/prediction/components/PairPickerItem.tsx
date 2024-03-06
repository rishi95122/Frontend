import { Avatar, HStack, MenuItem, Text } from "@chakra-ui/react"
import { usePalette } from "react-palette"

export const PairPickerItem = ({
	tokenURL,
	tokenName
}: {
	tokenName: string
	tokenURL: string
}) => {
	const {
		data: { vibrant }
	} = usePalette(tokenURL)

	return (
		<MenuItem
			_disabled={{ color: "white", cursor: "auto" }}
			bg="slate.700"
			cursor="auto"
			isDisabled
		>
			<HStack w="full">
				<HStack>
					<Avatar filter={`drop-shadow(0 0 0.2rem ${vibrant})`} size="xs" src={tokenURL} />
					<Text
						color="rgba(255,255,255,1)"
						filter={`drop-shadow(0 0 0.3rem ${vibrant})`}
						fontFamily="heading"
						fontSize="lg"
					>
						{tokenName}
					</Text>
				</HStack>
			</HStack>
		</MenuItem>
	)
}
