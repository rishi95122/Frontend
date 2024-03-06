import colors from "./colors"
import { checkboxTheme } from "./components/Checkbox"
import { config } from "./config"
import { shadows } from "./shadows"
import styles from "./styles"
import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
	colors,
	components: {
		Checkbox: checkboxTheme
	},
	config,
	fonts: {
		body: "Satoshi, sans-serif",
		heading: "Satoshi Italic, sans-serif",
		mono: "Roboto Mono",
		number: "Fugaz One, sans-serif"
	},
	shadows,
	styles
})
