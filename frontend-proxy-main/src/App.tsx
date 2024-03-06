// eslint-disable-next-line import/no-unassigned-import
import "react-toastify/dist/ReactToastify.css"
import { ChakraProvider } from "@chakra-ui/react"
import { NeutronProvider } from "@components/SeiProvider"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Layout from "components/Layout"
import Fonts from "components/Layout/components/Fonts"
import RouterSetup from "components/Router/RouterSetup"
import { MotionConfig } from "framer-motion"
import { BrowserRouter as Router } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import { queryClient } from "services/queryClient"
import { theme } from "theme"

const App = () => {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Fonts />
			<RecoilRoot>
				<RecoilNexus />
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<NeutronProvider>
						<Router>
							<MotionConfig transition={{ duration: 0.25, type: "tween" }}>
								<Layout>
									<RouterSetup />
								</Layout>
							</MotionConfig>
						</Router>
					</NeutronProvider>
				</QueryClientProvider>
			</RecoilRoot>
		</ChakraProvider>
	)
}

export default App
