import { IconButton, useColorMode } from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiSunFill } from "react-icons/ri"

const ThemeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			_active={{ filter: "brightness(90%)" }}
			_hover={{ filter: "brightness(110%)" }}
			aria-label="theme toggle"
			bgGradient="linear(45deg, brand.1, brand.2)"
			icon={colorMode === "light" ? <BsFillMoonStarsFill size="14" /> : <RiSunFill size="14" />}
			onClick={() => {
				toggleColorMode()
			}}
			p={0}
			rounded="full"
			shadow="md"
			size="sm"
		/>
	)
}

export default ThemeToggle
