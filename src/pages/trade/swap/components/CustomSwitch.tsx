/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Flex, Icon } from "@chakra-ui/react"
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useEffect } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useRecoilState } from "recoil"
import { marketAdvancedModeState } from "state/UIState"

export const CustomSwitch = ({ onToggle }: { onToggle: () => void }) => {
	const [advancedMode, setAdvancedMode] = useRecoilState(marketAdvancedModeState)

	const colorModeBgColor = useMotionValue("#02e296")

	useEffect(() => {
		if (advancedMode) {
			void animate(colorModeBgColor, "#02e296", {
				duration: 0.5,
				type: "tween"
			})
		} else {
			void animate(colorModeBgColor, "#2D3748", {
				duration: 0.5,
				type: "tween"
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [advancedMode])

	return (
		<Flex
			align="center"
			as={motion.div}
			cursor="pointer"
			h="1.7rem"
			onClick={() => {
				setAdvancedMode(!advancedMode)
				onToggle()
			}}
			overflow="hidden"
			px={1}
			rounded="full"
			shadow="md"
			style={{
				// @ts-expect-error Chakra Types WIP
				background: colorModeBgColor,
				justifyContent: advancedMode ? "flex-end" : "flex-start"
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
					{advancedMode ? (
						<Flex
							align="center"
							animate={{ opacity: 1, x: 0 }}
							as={motion.div}
							exit={{ opacity: 0, x: 30 }}
							initial={{ opacity: 0, x: -30 }}
							justify="center"
							key="lightModeButton"
						>
							<Icon as={FaCheck} color="#02e296" />
						</Flex>
					) : (
						<Flex
							align="center"
							animate={{ opacity: 1, x: 0 }}
							as={motion.div}
							exit={{ opacity: 0, x: 30 }}
							initial={{ opacity: 0, x: -30 }}
							justify="center"
							key="darkModeButton"
							style={{ width: "1rem" }}
						>
							<Icon as={FaTimes} color="#2D3748" />
						</Flex>
					)}
				</AnimatePresence>
			</Flex>
		</Flex>
	)
}
