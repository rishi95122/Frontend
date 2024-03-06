import { HStack, Skeleton, Text, useBreakpoint } from "@chakra-ui/react"
import { BigNumber } from "bignumber.js"
import shortenNumber from "utils/ui/shortenNumber"

const TVL = ({ usd }: { usd: BigNumber }) => {
	const breakpoint = useBreakpoint({ ssr: false })

	if (breakpoint === "base" || breakpoint === "sm ") {
		return (
			<HStack spacing={1}>
				<Text
					fontFamily="heading"
					fontSize={{ base: 18, md: "md" }}
					lineHeight={{ base: 1, md: 1.4 }}
				>
					TVL
				</Text>
				<Skeleton isLoaded={Boolean(usd)} rounded="full" w="full">
					<Text
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontFamily="heading"
						fontSize={{ base: 18, md: "md" }}
						lineHeight={{ base: 1, md: 1.4 }}
					>
						{`$${shortenNumber(usd ?? BigNumber(0), 2)}`}
					</Text>
				</Skeleton>
			</HStack>
		)
	}

	return (
		<Text fontFamily="heading" fontSize={{ base: 18, md: "md" }} lineHeight={{ base: 1, md: 1.4 }}>
			{`$${shortenNumber(usd ?? BigNumber(0), 2)}`}
		</Text>
	)
}

export default TVL
