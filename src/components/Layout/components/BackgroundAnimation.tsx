import { Box } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { Gradient } from "utils/ui/gradientMesh"

export const BackgroundAnimation = () => {
	// Create your instance

	const gradient = useMemo(() => {
		return new Gradient()
	}, [])

	useEffect(() => {
		// @ts-expect-error types
		gradient.initGradient("#gradient-canvas")
	}, [gradient])

	return (
		<Box as="canvas" data-transition-in h="full" id="gradient-canvas" pos="absolute" w="full" />
	)
}
