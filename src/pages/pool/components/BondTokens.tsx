import { BondButton } from "./BondButton"
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	RadioGroup,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Spacer,
	Text,
	useRadioGroup,
	VStack
} from "@chakra-ui/react"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { useUnbondedLiquidity } from "@hooks/pool/query/useUnbondedLiquidity"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { useBondTokens } from "hooks/pool/tx/useBondTokens"
import { getTokenInfoFromTokenList } from "hooks/tokens/query/useTokenInfo"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import shortenNumber from "utils/ui/shortenNumber"

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(duration)

export const BondTokens = () => {
	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const [unbondedTokens] = useUnbondedLiquidity({ pool: pool?.pool! })

	const [tokenList] = useTokenList()

	const options = useMemo(() => {
		const optionsToShow: Array<{
			days: string
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rewards: any[]
			tokens: Token[]
			value: string
		}> = []

		for (const [, bondingPeriod] of pool?.pool.bondingPeriods.entries() ?? []) {
			const tokenInfos = bondingPeriod.rewards.map(({ rewardToken }) => {
				const test = Object.values(rewardToken)[0]
				const test2 = getTokenInfoFromTokenList(test, tokenList ?? [])
				return test2!
			})

			const currentOption = {
				days: dayjs.duration(bondingPeriod.lockDuration, "second").format("D") + " Days",
				rewards: bondingPeriod.rewards,
				tokens: tokenInfos,
				value: bondingPeriod.address
			}
			optionsToShow.push(currentOption)
		}

		return optionsToShow
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pool])

	const [radioValue, setRadioValue] = useState("")
	const [bondPercentage, setBondPercentage] = useState(35)
	const gaps = [25, 50, 75, 100]

	const { getRadioProps } = useRadioGroup({
		defaultValue: undefined,
		name: "period",
		onChange: (value) => {
			setRadioValue(value)
		}
	})

	const { mutate: handleBondTokens, isLoading: isExecutingBond } = useBondTokens({
		bondAmount: unbondedTokens.multipliedBy(bondPercentage / 100).decimalPlaces(0, 1),
		stakingAddress: radioValue
	})

	return (
		<Flex flexDir="column" gap={3} h="full" w="full">
			<RadioGroup defaultValue={radioValue} onChange={(value) => setRadioValue(value)}>
				<SimpleGrid
					columns={{ base: 1, md: pool?.pool.bondingPeriods.length }}
					mb={{ base: 3, md: 1 }}
					spacing={{ base: 2, md: 6 }}
				>
					{options.map(({ days, value, rewards, tokens }) => {
						const radio = getRadioProps({ value })
						return (
							<BondButton key={value} {...radio}>
								<Text fontFamily="heading" fontSize="lg" fontWeight="bold">
									{days}
								</Text>
								<VStack align="start">
									{rewards.slice(0, 2).map(({ apr }, localIndex) => {
										return (
											// eslint-disable-next-line react/jsx-key
											<HStack>
												<Text fontFamily="heading">{shortenNumber(BigNumber(apr), 2)} %</Text>
												<Avatar h="1.5rem" src={tokens[localIndex].logoURI} w="1.5rem" />
											</HStack>
										)
									})}
								</VStack>
							</BondButton>
						)
					})}
				</SimpleGrid>
			</RadioGroup>
			<Box
				_dark={{ bg: "gray.800" }}
				bg="gray.800"
				opacity={unbondedTokens.isZero() || !radioValue ? 0.5 : 1}
				pb={4}
				pt={1}
				px={4}
				rounded="1.25em"
				shadow="md"
			>
				<Text
					color="white"
					fontFamily="heading"
					fontSize={{ base: "xl", sm: "4xl" }}
					fontWeight="bold"
					textAlign="center"
				>
					{bondPercentage}%
				</Text>
				<Slider
					isDisabled={unbondedTokens.isZero() || !radioValue}
					max={100}
					mb={3}
					min={0}
					onChange={(value) => setBondPercentage(value)}
					placeholder="0"
					size="md"
					step={0.1}
					value={bondPercentage}
				>
					<SliderTrack _dark={{ bg: "gray.600" }} bg="gray.600" h="0.75rem" rounded="full">
						<SliderFilledTrack bgGradient="linear(45deg, brand.1, brand.2)" />
					</SliderTrack>
					<SliderThumb bg="offwhite.2" h={{ base: 5, sm: 5 }} w={{ base: 5, sm: 5 }} />
				</Slider>
				<SimpleGrid columns={{ base: 2, sm: 4 }} h="full" spacing={2} w="full">
					{gaps.map((value) => (
						// eslint-disable-next-line react/jsx-key
						<Button
							_dark={{ bg: "gray.700" }}
							_disabled={{
								_active: {
									bg: "whiteAlpha.200",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								},
								_focus: {
									bg: "whiteAlpha.200",
									color: "whiteAlpha.500",
									cursor: "not-allowed"
								},
								bg: "whiteAlpha.200",
								color: "whiteAlpha.500",
								cursor: "not-allowed"
							}}
							_hover={{ filter: "brightness(110%)" }}
							bg="gray.700"
							bgGradient={value === bondPercentage ? "linear(45deg,brand.1,brand.2)" : ""}
							color="white"
							isDisabled={unbondedTokens.isZero() || !radioValue}
							onClick={() => setBondPercentage(value)}
							rounded="1em"
							shadow="md"
						>
							{value}%
						</Button>
					))}
				</SimpleGrid>
			</Box>
			<Spacer />
			<Button
				_disabled={{
					_active: {
						_dark: { bg: "whiteAlpha.200" },
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					},
					_dark: { bg: "whiteAlpha.200" },
					_focus: {
						_dark: { bg: "whiteAlpha.200" },
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					},
					bg: "blackAlpha.300",
					color: "whiteAlpha.500",
					cursor: "not-allowed"
				}}
				_hover={{ bgSize: "150%" }}
				bgGradient="linear(45deg, brand.1, brand.2)"
				isDisabled={Boolean(bondPercentage === 0 || radioValue === "" || unbondedTokens.isZero())}
				shadow={
					bondPercentage === 0 || radioValue === "" || unbondedTokens.isZero() ? "md" : "glowMd"
				}
				isLoading={isExecutingBond}
				onClick={() => {
					handleBondTokens()
				}}
				rounded="1.25em"
				transition="0.2s all"
				w="full"
			>
				Bond {bondPercentage}% Tokens
			</Button>
		</Flex>
	)
}
