import { AnimateBox, ModalContentVariants } from "../Motion"
import { type SimpleConnectModalType } from "../types"
import {
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Modal,
	ModalContent,
	ModalOverlay,
	useBreakpoint
} from "@chakra-ui/react"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"

export const SimpleConnectModalBaseStyle = (breakpoint: string) => ({
	_dark: {
		bg: "gray.700",
		bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)",
		color: "white"
	},
	_focus: { outline: "none" },
	alignSelf: "center",
	bg: "gray.700",
	bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)",
	borderRadius: "1.25em",
	color: "gray.800",
	position: "relative",
	roundedBottom: breakpoint === "base" || breakpoint === "sm" ? 0 : "1.25em"
})

export const SimpleConnectModal = ({
	initialRef,
	modalView,
	modalOpen,
	modalOnClose
}: SimpleConnectModalType) => {
	const controls = useAnimationControls()
	const contentControls = useAnimationControls()
	const breakpoint = useBreakpoint({ ssr: false })

	useEffect(() => {
		if (modalOpen) {
			controls.set("initial")
			contentControls.set("initial")
			void controls.start("animate")
			void contentControls.start("animate")
		}
	}, [modalView, modalOpen, controls, contentControls])

	if (breakpoint === "base" || breakpoint === "sm") {
		return (
			<Drawer
				initialFocusRef={initialRef}
				isOpen={modalOpen}
				onClose={modalOnClose}
				placement="bottom"
				size="2xl"
			>
				<DrawerOverlay backdropFilter="blur(70px)" bg="transparent" />
				<DrawerContent sx={SimpleConnectModalBaseStyle(breakpoint)}>
					<AnimateBox animate={contentControls} variants={ModalContentVariants}>
						{modalView}
					</AnimateBox>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Modal
			initialFocusRef={initialRef}
			isCentered
			isOpen={modalOpen}
			onClose={modalOnClose}
			size="lg"
		>
			<ModalOverlay backdropFilter="blur(70px)" bg="transparent" />
			<motion.img
				animate={{ rotate: 360 }}
				src="/assets/godrays.png"
				style={{
					filter: "saturate(180%) hue-rotate(-20deg)",
					height: "15rem",
					left: "calc(50% - 7.5rem)",
					position: "absolute",
					top: "5rem",
					width: "15rem",
					zIndex: 1_400
				}}
				transition={{
					duration: 15,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY
				}}
			/>
			<motion.img
				style={{
					filter:
						"saturate(180%) hue-rotate(-20deg) drop-shadow(0 0 1rem var(--chakra-colors-brand-1))",
					height: "7rem",
					left: "calc(50% - 3.5rem)",
					position: "absolute",
					top: "9rem",
					width: "7rem",
					zIndex: 1_400
				}}
				// animate={{ rotate: 360 }}
				// transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20 }}
				src="/assets/electron.png"
			/>
			<Flex
				bottom="calc(50% - 12.5rem)"
				h="25rem"
				left="calc(50% - 18rem)"
				pos="absolute"
				w="36rem"
				zIndex="1400"
			/>
			<ModalContent sx={SimpleConnectModalBaseStyle(breakpoint)}>
				<AnimateBox animate={contentControls} variants={ModalContentVariants}>
					{modalView}
				</AnimateBox>
			</ModalContent>
		</Modal>
	)
}
