import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

export const LiveRoundProgress = ({
	startTime,
	closeTime,
	currentTime
}: {
	closeTime: number
	currentTime: number
	startTime: number
}) => {
	const current = useMotionValue(((currentTime - startTime) / (closeTime - startTime)) * 100)

	const scaleX = useTransform(current, [0, 100], [0, 1], {
		clamp: true
	})

	useEffect(() => {
		void animate(current, ((currentTime - startTime) / (closeTime - startTime)) * 100, {
			duration: 1.5,
			type: "tween"
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTime])

	//   useAnimationFrame(() => {
	//     current.set(percent)
	//   })

	//   console.log(startTime, closeTime, current.get())

	return (
		<motion.div
			style={{
				background:
					"linear-gradient(45deg, var(--chakra-colors-brand-1), var(--chakra-colors-brand-2))",
				height: "0.5rem",
				position: "absolute",
				scaleX,
				top: "2rem",
				transformOrigin: "0%",
				width: "100%"
			}}
		/>
	)
}
