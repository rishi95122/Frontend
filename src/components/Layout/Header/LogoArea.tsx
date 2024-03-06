import { HStack, Image } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeIndexState, activeRouteState } from "state/UIState"

const LogoArea = () => {
	const navigate = useNavigate()
	const [, setActiveRoute] = useRecoilState(activeRouteState)
	const [, setActiveIndex] = useRecoilState(activeIndexState)

	return (
		<HStack
			_hover={{ cursor: "pointer" }}
			justify="center"
			onClick={() => {
				navigate("/")
				setActiveRoute(undefined)
				setActiveIndex(-1)
			}}
			pb={3}
			pt={2}
			w="full"
		>
			<Image src="/assets/UnknownLogo.png" w="3rem" />
			{/* <Image h="2.5rem" src="/assets/logo_name.png" /> */}
		</HStack>
	)
}

export default LogoArea
