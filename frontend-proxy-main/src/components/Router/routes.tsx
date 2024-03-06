/* eslint-disable react/jsx-pascal-case */
import Earn from "pages/earn"
import Games from "pages/games"
import Prediction from "pages/games/prediction"
import Home from "pages/home"
import Launchpad from "pages/launchpad"
// import { CubeDash } from "pages/games/cubedash"
import IDO from "pages/launchpad/ido"
import { CreateIDOPage } from "pages/launchpad/ido/routes/Create"
import Pool from "pages/pool"
import MyAssets from "pages/portfolio/assets"
import MyPoolsPage from "pages/portfolio/pools"
import Trade from "pages/trade"
import Swap from "pages/trade/swap"
import { type PathRouteProps } from "react-router-dom"
// import { CubeDash } from "pages/games/cubedash"

export const routes: PathRouteProps[] = [
	{
		element: <Home />,
		path: "/"
	},
	{
		element: <Games />,
		path: "/games"
	},
	{
		element: <Prediction />,
		path: "/games/prediction"
	},
	// {
	//   path: "/games/cubedash",
	//   element: <CubeDash />
	// },
	{
		element: <MyAssets />,
		path: "/portfolio"
	},
	{
		element: <MyAssets />,
		path: "/portfolio/assets"
	},
	{
		element: <MyPoolsPage />,
		path: "/portfolio/pools"
	},
	{
		element: <Trade />,
		path: "/trade"
	},
	{
		element: <Swap />,
		path: "/trade/swap"
	},
	{
		element: <Earn />,
		path: "/trade/pools"
	},
	{
		element: <Pool />,
		path: "/pool/:slug"
	},
	{
		element: <Launchpad />,
		path: "/launchpad"
	},
	{
		element: <IDO />,
		path: "/launchpad/ido"
	},
	{
		element: <CreateIDOPage />,
		path: "/launchpad/ido/create"
	}
]
