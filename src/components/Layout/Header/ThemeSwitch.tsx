/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, Icon, useColorMode, useToken } from "@chakra-ui/react"
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useEffect } from "react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiSunFill } from "react-icons/ri"

export const ThemeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	const [brand1, brand2, gray600, gray800] = useToken("colors", [
		"brand.1",
		"brand.2",
		"gray.600",
		"gray.800"
	])

	const colorModeBgColor = useMotionValue(`linear-gradient(45deg, ${brand1}, ${brand2})`)

	useEffect(() => {
		if (colorMode === "dark") {
			void animate(colorModeBgColor, `linear-gradient(45deg, ${brand1}, ${brand2})`, {
				duration: 0.5,
				type: "tween"
			})
		} else {
			void animate(colorModeBgColor, `linear-gradient(45deg, ${gray600}, ${gray800})`, {
				duration: 0.5,
				type: "tween"
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colorMode])

	return (
		<Flex
			align="center"
			as={motion.div}
			cursor="pointer"
			h="1.7rem"
			onClick={() => {
				toggleColorMode()
			}}
			overflow="hidden"
			px={1}
			rounded="full"
			shadow="md"
			style={{
				// @ts-expect-error Chakra Types WIP
				background: colorModeBgColor,
				justifyContent: colorMode === "light" ? "flex-start" : "flex-end"
			}}
			transition="all .2s"
			w="3rem"
		>
			<Flex
				align="center"
				as={motion.div}
				bg="white"
				boxSize="1.3rem"
				justify="center"
				layout
				overflow="hidden"
				rounded="50%"
			>
				<AnimatePresence initial={false} mode="wait">
					{colorMode === "dark" ? (
						<Flex
							align="center"
							animate={{ opacity: 1, x: 0 }}
							as={motion.div}
							exit={{ opacity: 0, x: 30 }}
							initial={{ opacity: 0, x: -30 }}
							justify="center"
							key="showZeroAssetsButton"
						>
							<Icon as={BsFillMoonStarsFill} color="gray.800" px={0.5} />
						</Flex>
					) : (
						<Flex
							align="center"
							animate={{ opacity: 1, x: 0 }}
							as={motion.div}
							exit={{ opacity: 0, x: 30 }}
							initial={{ opacity: 0, x: -30 }}
							justify="center"
							key="hideZeroAssetsButton"
							style={{ width: "1rem" }}
						>
							<Icon as={RiSunFill} color={gray800} />
						</Flex>
					)}
				</AnimatePresence>
			</Flex>
		</Flex>
	)
}
