import { HeaderMenu } from "./HeaderMenu"
import { RouterArea } from "./RouterArea"
import { Flex, HStack, Image, Spacer, useBreakpoint, useColorModeValue } from "@chakra-ui/react"
import ConnectButton from "components/ConnectButton"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { activeIndexState, activeRouteState } from "state/UIState"

const Header = () => {
	const breakpoint = useBreakpoint({ ssr: false })

	const navigate = useNavigate()

	const [, setActiveRoute] = useRecoilState(activeRouteState)
	const [, setActiveIndex] = useRecoilState(activeIndexState)

	const handleClick = () => {
		setActiveIndex(-1)
		setActiveRoute(undefined)
	}

	const isMobile = Boolean(breakpoint === "base" || breakpoint === "sm")

	return (
		<Flex
			align="center"
			as="header"
			bg={useColorModeValue("white", "gray.800")}
			gap={2}
			h="4rem"
			justifyContent="flex-end"
			px={2}
			py={2}
			shadow="md"
			w="full"
			zIndex={5}
		>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<Image
					_hover={{ cursor: "pointer" }}
					color="white"
					onClick={() => {
						handleClick()
						navigate("/")
					}}
					src="/assets/electron.png"
					w="3rem"
				/>
			) : (
				<Image
					_hover={{ cursor: "pointer" }}
					color="white"
					onClick={() => {
						handleClick()
						navigate("/")
					}}
					src="/assets/electron.png"
					w="10rem"
				/>
			)}
			{!isMobile && <Spacer />}
			{!isMobile && <RouterArea />}
			<Spacer />
			<HStack direction={isMobile ? "row-reverse" : "row"} spacing={2}>
				{isMobile && <RouterArea />}
				{!isMobile && <HeaderMenu />}
				{!isMobile && <ConnectButton />}
			</HStack>
		</Flex>
	)
}

export default Header
