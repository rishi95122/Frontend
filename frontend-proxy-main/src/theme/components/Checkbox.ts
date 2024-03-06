import { checkboxAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	checkboxAnatomy.keys
)

const baseStyle = definePartsStyle({
	control: {
		_checked: {
			_hover: {
				bgGradient: "linear(45deg, brand.1, brand.2)",
				filter: "brightness(120%)"
			},
			bgGradient: "linear(45deg, brand.1, brand.2)",
			border: "none"
		},
		_dark: {
			_checked: {
				_hover: {
					bgGradient: "linear(45deg, brand.1, brand.2)",
					filter: "brightness(120%)"
				},
				bgGradient: "linear(45deg, brand.1, brand.2)",
				border: "none"
			},
			background: "whiteAlpha.300"
		},
		background: "blackAlpha.200",
		border: "none",
		borderRadius: "0.6em",
		padding: 3
	}
})

export const checkboxTheme = defineMultiStyleConfig({ baseStyle })
