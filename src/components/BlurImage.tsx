import { useImage } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
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
	const isVideo = src.endsWith(".mp4")
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (isVideo && videoRef.current) {
			videoRef.current.playbackRate = 0.5 // Adjust the playback rate here
		}
	}, [isVideo])

	if (isVideo) {
		return (
			<video
				autoPlay
				loop
				muted
				ref={videoRef}
				src={src}
				style={{
					filter: isHovering ? "blur(8px)" : "blur(0px)",
					transition: "filter 0.5s ease-in-out",
					width: "100%",
					height: "100%",
					objectFit: "fill",
					position: "absolute"
				}}
			/>
		);
	} else {
		const imageStatus = useImage({ src });
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
