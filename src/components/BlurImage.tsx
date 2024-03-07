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
	// Check if the src is an image or video
	const isVideo = src.endsWith(".mp4")

	if (isVideo) {
		// If it's a video, return the video element
		return (
			<video
				autoPlay
				loop
				muted
				src={src}
				style={{
					filter: isHovering ? "blur(8px)" : "blur(0px)",
					transition: "filter 0.5s ease-in-out",
					width: "100%",
					height: "100%",
					objectFit: "cover",
					position: "absolute"
				}}
			/>
		)
	} else {
		// If it's an image, return the image element
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
}
