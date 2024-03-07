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
			{/* <Image src="/assets/electronnameW.svg" w="3rem" /> */}
			<Image pr={5} h="3rem" src="/assets/electronnameW.svg" />
		</HStack>
	)
}

export default LogoArea
