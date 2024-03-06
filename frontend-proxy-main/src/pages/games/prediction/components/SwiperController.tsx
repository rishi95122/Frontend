import { Flex } from "@chakra-ui/react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import MotionIconButton from "theme/motion/components/MotionIconButton"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SwiperController = ({ prevRef, nextRef }: { nextRef: any; prevRef: any }) => {
	return (
		<Flex
			alignItems="center"
			bg="slate.700"
			gap={6}
			h="3rem"
			justifyContent="space-between"
			minW="12rem"
			pos="relative"
			px={1}
			rounded="full"
			shadow="md"
		>
			<MotionIconButton
				_hover={{ filter: "brightness(120%)" }}
				bg="gray.600"
				color="white"
				rounded="full"
				whileHover={{ cursor: "pointer", scale: 1.1 }}
				whileTap={{ scale: 1 }}
				transition={{ type: "spring" }}
				ref={prevRef}
			>
				<FaArrowLeft size="26" />
			</MotionIconButton>
			<MotionIconButton
				_hover={{ filter: "brightness(120%)" }}
				color="white"
				rounded="full"
				transition={{ duration: 0.2, ease: "linear", type: "tween" }}
				whileHover={{ cursor: "pointer", scale: 1.1 }}
				whileTap={{ scale: 1 }}
				bg="gray.600"
				ref={nextRef}
			>
				<FaArrowRight size="26" />
			</MotionIconButton>
		</Flex>
	)
}
