import {
	Button,
	Flex,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Spacer,
	Text,
	VStack
} from "@chakra-ui/react"
import { usePoolDollarValues } from "@hooks/pool/query/usePoolDollarValues"
import { BigNumber } from "bignumber.js"
import { useRemoveLiquidity } from "hooks/pool/tx/useRemoveLiquidity"
import { useState } from "react"
import { type TPool } from "utils/tokens/pools"

export const RemoveLiquidity = ({ pool }: { pool: TPool }) => {
	const [removeValue, setRemoveValue] = useState(BigNumber(50))
	const gaps = [25, 50, 75, 100]

	const { mutate: handleRemoveLiquidity, isLoading: isExecutingRemove } = useRemoveLiquidity({
		removeAmount: removeValue.dividedBy(100)
	})

	const [poolDollarValue] = usePoolDollarValues({
		pool
	})

	return (
		<Flex flexDir="column" gap={3} h="full" w="full">
			<VStack
				_dark={{ bg: "gray.800" }}
				align="center"
				bg="gray.800"
				p={4}
				rounded="1.25em"
				shadow="md"
				spacing={3}
			>
				<VStack spacing={2}>
					<Text
						color="white"
						fontFamily="heading"
						fontSize={{ base: "xl", sm: "4xl" }}
						fontWeight="bold"
						lineHeight="0.85"
						textAlign="center"
					>
						{removeValue.toString()}%
					</Text>
					<Text
						color="white"
						fontFamily="heading"
						fontSize={{ base: "xl", sm: "xl" }}
						fontWeight="bold"
						lineHeight="0.85"
						textAlign="center"
					>
						{`$
							${((poolDollarValue.unbondedDollarValue * removeValue.toNumber()) / 100).toFixed(2)}`}
					</Text>
				</VStack>
				<Slider
					max={100}
					mb={16}
					min={0}
					onChange={(value) => setRemoveValue(BigNumber(value))}
					placeholder="0"
					size="md"
					step={0.1}
					value={removeValue.toNumber()}
				>
					<SliderTrack
						_dark={{ bg: "gray.600" }}
						bg="gray.600"
						h="0.75rem"
						rounded="full"
						shadow="md"
					>
						<SliderFilledTrack bgGradient="linear(45deg, brand.1, brand.2)" shadow="glowMd" />
					</SliderTrack>
					<SliderThumb bg="offwhite.2" h={{ base: 5, sm: 5 }} w={{ base: 5, sm: 5 }} />
				</Slider>
				<SimpleGrid columns={{ base: 2, sm: 4 }} h="full" spacing={2} w="full">
					{gaps.map((value) => (
						// eslint-disable-next-line react/jsx-key
						<Button
							_dark={{
								bg: "gray.700",
								bgGradient: removeValue.eq(value) ? "linear(45deg,brand.1,brand.2)" : ""
							}}
							_hover={{ filter: "brightness(110%)" }}
							bg="gray.600"
							color="white"
							onClick={() => setRemoveValue(BigNumber(value))}
							rounded="1em"
							shadow={removeValue.eq(value) ? "glowMd" : "md"}
							bgGradient={removeValue.eq(value) ? "linear(45deg,brand.1,brand.2)" : ""}
						>
							{value}%
						</Button>
					))}
				</SimpleGrid>
			</VStack>
			<Spacer />
			<Button
				isLoading={isExecutingRemove}
				_dark={{
					_disabled: {
						bg: "whiteAlpha.200",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}
				}}
				_disabled={{
					bg: "offwhite.4",
					color: "gray.800",
					cursor: "not-allowed",
					opacity: 0.5
				}}
				_hover={{ bgSize: "150%" }}
				bgGradient="linear(45deg, brand.1, brand.2)"
				h="3rem"
				isDisabled={!removeValue.gt(0)}
				// eslint-disable-next-line no-negated-condition
				shadow={!removeValue.gt(0) ? "md" : "glowMd"}
				onClick={() => handleRemoveLiquidity()}
				rounded="1.25em"
				transition="0.2s all"
				w="full"
			>
				Remove Liquidity
			</Button>
		</Flex>
	)
}
