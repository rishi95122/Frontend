/* eslint-disable import/no-unassigned-import */
import "@fontsource/fugaz-one"
import "@fontsource/roboto-mono"
import App from "./App"
import * as amplitude from "@amplitude/analytics-browser"
import { ColorModeScript } from "@chakra-ui/react"
import { createRoot } from "react-dom/client"
import { hotjar } from "react-hotjar"

const root = createRoot(document.querySelector("#root") as HTMLElement)
root.render(
	<>
		<ColorModeScript initialColorMode="dark" />
		<App />
	</>
)

hotjar.initialize(import.meta.env.VITE_HOTJARID, 6)
amplitude.init(import.meta.env.VITE_AMPLITUDE)
