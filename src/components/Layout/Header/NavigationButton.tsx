import {
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Button,
	type ButtonProps,
	HStack,
	Skeleton,
	SkeletonCircle,
	Text
} from "@chakra-ui/react"
import { type ReactElement, useEffect, useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

export type NavigationButtonProps = ButtonProps & {
	activeIndex?: number
	icon: ReactElement
	isDisabled?: boolean
	label: string
	navId: number
	onClick?: () => void
	subLinks?: Record<string, { icon: ReactElement; url: string }>
	url: string
}

// eslint-disable-next-line complexity
const NavigationButton = ({
	label,
	url,
	activeIndex,
	navId,
	isDisabled,
	icon,
	onClick,
	subLinks,
	...props
}: NavigationButtonProps) => {
	const [isActive, setIsActive] = useState(false)

	const { pathname } = useLocation()

	useEffect(() => {
		if (navId === activeIndex) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex])

	return (
		<AccordionItem
			bg={
				isActive && subLinks && Object.entries(subLinks).length > 0
					? "whiteAlpha.200"
					: "transparent"
			}
			border="0px"
			w="full"
		>
			{({ isExpanded }) => (
				<>
					<Link
						key={props.key}
						style={{
							opacity: isDisabled ? 0.5 : 1,
							pointerEvents: isDisabled ? "none" : "all",
							position: "relative"
						}}
						to={isDisabled ? "" : url}
					>
						<AccordionButton
							alignItems="center"
							h="2.5rem"
							justifyContent="start"
							onClick={onClick}
							pos="relative"
							px={{ base: 3, lg: 3, md: 2 }}
							w="full"
						>
							<HStack align="center" color="white" spacing={2} w="full">
								<SkeletonCircle
									filter={isActive ? "drop-shadow(0 0 0.2rem var(--chakra-colors-cyan-500))" : ""}
									isLoaded
									w={{ base: "1.25em", md: "1.25em" }}
									zIndex={2}
								>
									{icon}
								</SkeletonCircle>
								<Skeleton isLoaded rounded="1.25em" zIndex={2}>
									<Text
										bgClip="text"
										bgGradient={
											isActive ? "linear(45deg, white, white)" : "linear(45deg, white, white)"
										}
										filter={isActive ? "drop-shadow(0 0 0.2rem var(--chakra-colors-cyan-500))" : ""}
										fontFamily="heading"
										fontSize={{ base: "1em", md: "1.1em" }}
										fontWeight="400"
										letterSpacing={0.8}
										textAlign="start"
										transition="0.35s all"
										zIndex={2}
									>
										{label}
									</Text>
								</Skeleton>
							</HStack>
							{subLinks && Object.entries(subLinks).length > 0 ? (
								isExpanded ? (
									<FaAngleDown />
								) : (
									<FaAngleUp />
								)
							) : null}
						</AccordionButton>
					</Link>
					{subLinks && (
						<AccordionPanel p={0}>
							{Object.entries(subLinks).map((subLink) => {
								return (
									<Link
										key={props.key}
										style={{
											pointerEvents: isDisabled ? "none" : "all",
											position: "relative"
										}}
										to={url + subLink[1].url}
									>
										<Button
											_hover={{ bg: "whiteAlpha.200" }}
											alignItems="center"
											bg="transparent"
											color="white"
											filter={
												isActive && pathname === url + subLink[1].url
													? "drop-shadow(0 0 0.2rem var(--chakra-colors-cyan-500))"
													: ""
											}
											fontFamily="heading"
											fontSize="16"
											justifyContent="start"
											leftIcon={subLink[1].icon}
											letterSpacing={0.8}
											ps="1.5rem"
											rounded="0"
											size="sm"
											transition="0.35s all"
											w="full"
										>
											{subLink[0]}
										</Button>
									</Link>
								)
							})}
						</AccordionPanel>
					)}
				</>
			)}
		</AccordionItem>
	)
}

export default NavigationButton
