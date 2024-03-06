import { useImage } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Blurhash } from "react-blurhash"

export const BlurImage = ({
	src,
	blurHash,
	isHovering
}: {
	blurHash: string
	isHovering: boolean
	src: string
}) => {
	const imageStatus = useImage({ src })

	return imageStatus === "loaded" ? (
		<motion.img
			animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
			src={src}
			style={{
				height: "100%",
				objectFit: "cover",
				position: "absolute",
				width: "100%"
			}}
			transition={{ type: "tween" }}
		/>
	) : (
		<Blurhash
			hash={blurHash}
			width="100%"
			height="100%"
			resolutionX={3}
			resolutionY={4}
			punch={1}
			style={{ position: "absolute" }}
		/>
	)
}
