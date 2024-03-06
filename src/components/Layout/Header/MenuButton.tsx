/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, type SVGMotionProps, type Transition } from "framer-motion"

type Props = SVGMotionProps<any> & {
	color?: string
	isOpen?: boolean
	lineProps?: any
	strokeWidth?: number | string
	transition?: Transition
}

const MenuButton = ({
	isOpen = false,
	width = 20,
	height = 20,
	strokeWidth = 1,
	color = "#000",
	transition = {},
	lineProps = null,
	...props
}: Props) => {
	const variant = isOpen ? "opened" : "closed"
	const top = {
		closed: {
			rotate: 0,
			translateY: 0
		},
		opened: {
			rotate: 45,
			translateY: 2
		}
	}
	const center = {
		closed: {
			opacity: 1
		},
		opened: {
			opacity: 0
		}
	}
	const bottom = {
		closed: {
			rotate: 0,
			translateY: 0
		},
		opened: {
			rotate: -45,
			translateY: -2
		}
	}
	// eslint-disable-next-line no-param-reassign
	lineProps = {
		animate: variant,
		initial: "closed",
		stroke: color,
		strokeWidth: strokeWidth as number,
		transition,
		vectorEffect: "non-scaling-stroke",
		...lineProps
	}
	const unitHeight = 4
	const unitWidth = (unitHeight * (width as number)) / (height as number)

	return (
		<motion.svg
			height={height}
			overflow="visible"
			preserveAspectRatio="none"
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			width={width}
			{...props}
		>
			<motion.line variants={top} x1="0" x2={unitWidth} y1="0" y2="0" {...lineProps} />
			<motion.line variants={center} x1="0" x2={unitWidth} y1="2" y2="2" {...lineProps} />
			<motion.line variants={bottom} x1="0" x2={unitWidth} y1="4" y2="4" {...lineProps} />
		</motion.svg>
	)
}

export default MenuButton
