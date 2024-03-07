import { Helmet } from "react-helmet"

const APP_NAME = "Electron"

const Meta = () => {
	return (
		<Helmet>
			<title>Electron | DeFi.</title>
			<meta
				content="Electron - Blurring the boundaries between DeFi and CEX on Neutron"
				name="description"
			/>
			<meta content={APP_NAME} name="application-name" />
			<meta content="yes" name="apple-mobile-web-app-capable" />
			<meta content="default" name="apple-mobile-web-app-status-bar-style" />
			<meta content={APP_NAME} name="apple-mobile-web-app-title" />
			<meta content="telephone=no" name="format-detection" />
			<meta content="yes" name="mobile-web-app-capable" />
			<meta content="#FFFFFF" name="theme-color" />
			<link href="/manifest.json" rel="manifest" />
		</Helmet>
	)
}

export default Meta
