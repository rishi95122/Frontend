import { PairPickerItem } from "./PairPickerItem"
import {
	Avatar,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Spacer,
	Text
} from "@chakra-ui/react"
import { FaArrowDown } from "react-icons/fa"
import { usePalette } from "react-palette"

export const PairPicker = () => {
	const {
		data: { vibrant }
	} = usePalette("/assets/tokens/btc.svg")

	return (
		<Menu>
			<Flex
				_active={{ bg: "slate.600" }}
				as={MenuButton}
				bg="slate.700"
				color="white"
				display="flex"
				flexDir="row"
				fontWeight="600"
				h="3rem"
				justify="center"
				left={{ base: "0", md: "6rem" }}
				px={2}
				rounded="1em"
				shadow="md"
			>
				<HStack w="full">
					<HStack>
						<Avatar
							filter={`drop-shadow(0 0 0.2rem ${vibrant})`}
							size="sm"
							src="/assets/tokens/btc.svg"
						/>
						<Text
							color="rgba(255,255,255,1)"
							filter={`drop-shadow(0 0 0.3rem ${vibrant})`}
							fontFamily="heading"
							fontSize="lg"
						>
							Bitcoin / USD
						</Text>
					</HStack>
					<Spacer />
					<FaArrowDown size="13" />
				</HStack>
			</Flex>
			<Portal>
				<MenuList bg="slate.700" border="none" overflow="hidden" py={0} rounded="1em" shadow="md">
					<MenuItem
						_disabled={{ color: "white", cursor: "auto" }}
						bg="slate.700"
						cursor="auto"
						isDisabled
					>
						More pairs coming soon.
					</MenuItem>
					<PairPickerItem tokenName="Ethereum / USD" tokenURL="/assets/tokens/eth.png" />
					<PairPickerItem tokenName="Sei / USD" tokenURL="/assets/tokens/ntrn.png" />
					<PairPickerItem tokenName="Atom / USD" tokenURL="/assets/tokens/atom.png" />
				</MenuList>
			</Portal>
		</Menu>
	)
}
