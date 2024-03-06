import { routes } from "./routes"
import Page404 from "pages/404"
import { Route, Routes } from "react-router-dom"

const RouterSetup = () => {
	return (
		<Routes>
			{routes.map((routeProps) => (
				<Route {...routeProps} key={routeProps.path as string} />
			))}
			<Route element={<Page404 />} path="*" />
		</Routes>
	)
}

export default RouterSetup
