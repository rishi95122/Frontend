import { HStack, Image, useBreakpointValue } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeIndexState, activeRouteState } from "state/UIState"

const LogoArea = () => {
	const navigate = useNavigate()
	const [, setActiveRoute] = useRecoilState(activeRouteState)
	const [, setActiveIndex] = useRecoilState(activeIndexState)

	// Determine the height of the image based on the breakpoint
	const imageHeight = useBreakpointValue({ base: "4rem", md: "3rem" })

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
			<Image pl={2} pr={0} h={imageHeight} src="/assets/electronnameW.svg" />
		</HStack>
	)
}

export default LogoArea
