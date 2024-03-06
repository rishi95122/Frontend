/* eslint-disable id-length */
import { type AvatarProps, Flex, Img } from "@chakra-ui/react"
import { useImage } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { memo } from "react"
import { Blurhash } from "react-blurhash"

const BlurAvatar = ({
	src,
	blurHash,
	w,
	h,
	...props
}: AvatarProps & {
	blurHash: string
	src: string
}) => {
	const imageStatus = useImage({ src })

	return imageStatus === "loaded" ? (
		<Flex
			{...props}
			transition={{ type: "tween" }}
			as={motion.div}
			w="full"
			h="full"
			minW={w}
			minH={h}
		>
			<Img w={w} h={h} rounded="full" objectFit="cover" src={src} />
		</Flex>
	) : (
		<Blurhash
			hash={blurHash ?? "L7PZfSjE%%t,?vt7t7R*%%o#H=VX"}
			width="100%"
			height="100%"
			resolutionX={3}
			resolutionY={4}
			punch={1}
			style={{ position: "absolute" }}
		/>
	)
}

export const MemoizedAvatar = memo(BlurAvatar)
