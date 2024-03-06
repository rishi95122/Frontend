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
import { useBondedLiquidity } from "@hooks/pool/query/useBondedLiquidity"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import dayjs from "dayjs"
import { useUnbondTokens } from "hooks/pool/tx/useUnbondTokens"
import { getTokenInfoFromTokenList } from "hooks/tokens/query/useTokenInfo"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { useMemo, useState } from "react"
import { type TPool } from "utils/tokens/pools"
import shortenNumber from "utils/ui/shortenNumber"

export const UnbondTokens = ({ pool }: { pool: TPool }) => {
	const [tokenList] = useTokenList()

	const options = useMemo(() => {
		const optionsToShow: Array<{
			days: string
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rewards: any[]
			tokens: Token[]
			value: string
		}> = []

		// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
		for (const [, bondingPeriod] of pool?.bondingPeriods.entries() || []) {
			const tokenInfos: Token[] | undefined = bondingPeriod.rewards.map(({ rewardToken }) => {
				const test = Object.values(rewardToken)[0]
				const test2 = getTokenInfoFromTokenList(test, tokenList ?? [])
				return test2!
			})

			const currentOption = {
				days: dayjs.duration(bondingPeriod.lockDuration, "second").format("D") + " Days",
				rewards: bondingPeriod.rewards,
				tokens: tokenInfos!,
				value: bondingPeriod.address
			}
			optionsToShow.push(currentOption)
		}

		return optionsToShow
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pool])

	const [radioValue, setRadioValue] = useState<string | undefined>(undefined)
	const [maxUnbond, setMaxUnbond] = useState("0")
	const [bondPercentage, setBondPercentage] = useState(35)
	const gaps = [25, 50, 75, 100]

	const [bondedTokens] = useBondedLiquidity({
		pool: pool!
	})

	const { getRadioProps } = useRadioGroup({
		defaultValue: undefined,
		name: "period",
		onChange: (value) => {
			const selectedToken = bondedTokens?.bondedBalances.find(
				(bondedToken) => value === bondedToken.address
			)
			setRadioValue(value)
			setMaxUnbond(selectedToken?.balance.toString() ?? "0")
		}
	})

	const { mutate: handleUnbondTokens, isLoading: isExecutingUnbond } = useUnbondTokens({
		bondAmount: Math.floor((bondPercentage / 100) * (Number(maxUnbond) ?? 0)),
		stakingAddress: radioValue ?? ""
	})

	return (
		<Flex flexDir="column" gap={3} h="full" w="full">
			<RadioGroup defaultValue={radioValue}>
				<SimpleGrid
					columns={{ base: 1, md: pool.bondingPeriods.length }}
					mb={{ base: 3, md: 1 }}
					spacing={{ base: 2, md: 6 }}
				>
					{options.map(({ days, value, rewards, tokens }) => {
						const radio = getRadioProps({ value })
						const isDisabled = bondedTokens?.bondedBalances.find(
							(bondedToken) => value === bondedToken.address && bondedToken.balance.isZero()
						)
						return (
							<BondButton isDisabled={isDisabled} key={value} {...radio}>
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
					max={100}
					mb={3}
					min={0}
					onChange={(value) => setBondPercentage(value)}
					placeholder="0"
					size="md"
					step={0.1}
					value={bondPercentage}
				>
					<SliderTrack
						_dark={{ bg: "gray.600", shadow: "md" }}
						bg="offwhite.3"
						h="0.75rem"
						rounded="full"
					>
						<SliderFilledTrack shadow="md" bgGradient="linear(45deg, brand.1, brand.2)" />
					</SliderTrack>
					<SliderThumb bg="offwhite.2" h={{ base: 5, sm: 5 }} w={{ base: 5, sm: 5 }} />
				</Slider>
				<SimpleGrid columns={{ base: 2, sm: 4 }} h="full" spacing={2} w="full">
					{gaps.map((value, index) => (
						<Button
							// eslint-disable-next-line react/no-array-index-key
							key={"unbondButton-" + index}
							_dark={{ bg: "gray.700" }}
							shadow={value === bondPercentage ? "glowMd" : "md"}
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
							onClick={() => setBondPercentage(value)}
							rounded="1em"
						>
							{value}%
						</Button>
					))}
				</SimpleGrid>
			</Box>
			<Spacer />
			<Button
				isLoading={isExecutingUnbond}
				shadow="md"
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
				isDisabled={Boolean(bondPercentage === 0 || !radioValue)}
				onClick={() => {
					handleUnbondTokens()
				}}
				rounded="1.25em"
				transition="0.2s all"
				w="full"
			>
				Unbond {bondPercentage}% Tokens
			</Button>
		</Flex>
	)
}
