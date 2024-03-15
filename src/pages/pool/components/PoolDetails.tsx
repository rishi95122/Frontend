/* eslint-disable canonical/id-match */
import { CustomArcLabelComponent } from "./CustomArcLabelComponent"
import {
	Avatar,
	ButtonGroup,
	chakra,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	SimpleGrid,
	Skeleton,
	SkeletonCircle,
	Text,
	Tooltip,
	VStack
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { usePoolDollarValues } from "@hooks/pool/query/usePoolDollarValues"
import { useTotalPoolDollarValues } from "@hooks/pool/query/useTotalPoolDollarValues"
import { useTotalUnderlyingAssets } from "@hooks/pool/query/useTotalUnderlyingAssets"
import { useUnderlyingAssets } from "@hooks/pool/query/useUnderlyingAssets"
import { ResponsivePie } from "@nivo/pie"
import { pieDataState } from "@state/UIState"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import chroma from "chroma-js"
import dayjs from "dayjs"
import { getTokenInfoFromTokenList, useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BiSolidLayerMinus, BiSolidLayerPlus } from "react-icons/bi"
import { FaGlobeAmericas, FaUserAlt } from "react-icons/fa"
import { useSetRecoilState } from "recoil"
import { type TPool } from "utils/tokens/pools"
import shortenNumber from "utils/ui/shortenNumber"

export const PoolDetails = ({ pool, apr }: { apr: number; pool: TPool }) => {
	const [underlyingAssets, isLoadingUnderlyingAssets] = useUnderlyingAssets({
		pool
	})

	const [totalUnderlyingAssets, isLoadingTotalUnderlyingAssets] = useTotalUnderlyingAssets({
		pool
	})

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const [myPoolValues, isLoadingMyPoolValues] = usePoolDollarValues({ pool })
	const [totalPoolValues, isLoadingTotalPoolValues] = useTotalPoolDollarValues({ pool })
	const [tokenList] = useTokenList()

	const [isShowingTotal, setIsShowingTotal] = useState(!isWalletConnected)
	const [isShowingDetails, setIsShowingDetails] = useState(false)

	const handleTotalToggle = useCallback(() => {
		setIsShowingTotal(!isShowingTotal)
	}, [isShowingTotal])

	const handleDetailToggle = useCallback(() => {
		setIsShowingDetails(!isShowingDetails)
	}, [isShowingDetails])

	const token1Info = useTokenInfo(pool.liquidity.token1.denom)
	const token2Info = useTokenInfo(pool.liquidity.token2.denom)

	const setPieData = useSetRecoilState(pieDataState)

	const options = useMemo(() => {
		const optionsToShow: Array<{
			days: string
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rewards: any[]
			tokens: Token[]
			value: string
		}> = []

		for (const [, bondingPeriod] of pool.bondingPeriods.entries() ?? []) {
			const tokenInfos: Token[] = bondingPeriod.rewards.map(({ rewardToken }) => {
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

	const pieChartData = useMemo(() => {
		if (isShowingTotal) {
			if (isShowingDetails) {
				const colors = chroma
					.scale(["#5CD367", "#2f8751"])
					.mode("lch")
					.colors(totalUnderlyingAssets.bondedTokensPerPeriod.length)
				return [
					...totalUnderlyingAssets.bondedTokensPerPeriod.map((period, index) => {
						return {
							color: colors[index],
							id: `period-${index}`,
							label: `${options[index].days}`,
							value: period[0] + period[1]
						}
					}),
					{
						color: "#F93A45",
						id: "unbondedTokens",
						label: "Unbonded",
						value: totalUnderlyingAssets.unbondedTokens[0] + totalUnderlyingAssets.unbondedTokens[1]
					}
				]
			} else {
				return [
					{
						color: "#5CD367",
						id: "bondedTokens",
						label: "Bonded",
						value: totalUnderlyingAssets.bondedTokens[0] + totalUnderlyingAssets?.bondedTokens[1]
					},
					{
						color: "#F93A45",
						id: "unbondedTokens",
						label: "Unbonded",
						value: totalUnderlyingAssets.unbondedTokens[0] + totalUnderlyingAssets.unbondedTokens[1]
					}
				]
			}
		} else if (isShowingDetails) {
			const colors = chroma
				.scale(["#5CD367", "#2f8751"])
				.mode("lch")
				.colors(underlyingAssets.bondedTokensPerPeriod.length)

			return [
				...underlyingAssets.bondedTokensPerPeriod.map((period, index) => {
					return {
						color: colors[index],
						id: `period-${index}`,
						label: `${options[index].days}`,
						value: period[0] + period[1]
					}
				}),
				{
					color: "#F93A45",
					id: "unbondedTokens",
					label: "Unbonded",
					value: underlyingAssets.unbondedTokens[0] + underlyingAssets.unbondedTokens[1]
				}
			]
		} else {
			return [
				{
					color: "#5CD367",
					id: "bondedTokens",
					label: "Bonded",
					value: underlyingAssets.bondedTokens[0] + underlyingAssets?.bondedTokens[1]
				},
				{
					color: "#F93A45",
					id: "unbondedTokens",
					label: "Unbonded",
					value: underlyingAssets.unbondedTokens[0] + underlyingAssets.unbondedTokens[1]
				}
			]
		}
	}, [
		isShowingTotal,
		isShowingDetails,
		underlyingAssets.bondedTokensPerPeriod,
		underlyingAssets.bondedTokens,
		underlyingAssets.unbondedTokens,
		totalUnderlyingAssets.unbondedTokens,
		totalUnderlyingAssets.bondedTokens,
		totalUnderlyingAssets.bondedTokensPerPeriod,
		options
	])

	useEffect(() => {
		setPieData(pieChartData)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pieChartData])

	useEffect(() => {
		if (!isWalletConnected) {
			setIsShowingTotal(true)
		}
	}, [isWalletConnected])

	return (
		<Flex flexDirection={{ base: "column", md: "row" }} gap={2} maxW="5xl" w="full">
			<Flex
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
				bg="gray.700"
				bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
				flex={1.5}
				flexDirection={{ base: "column", md: "row" }}
				rounded="1.25em"
				shadow="md"
				pos="relative"
			>
				<VStack align="start" ps={4} py={3} spacing={1}>
					<Text fontFamily="heading" fontSize="22">
						{isShowingTotal ? "Pool Details" : "My Pool Details"}
					</Text>
					<ButtonGroup zIndex="5" pos="absolute" right="1rem" size="sm" isAttached rounded="1rem">
						<IconButton
							shadow="md"
							rounded="0.8rem"
							pb={1}
							icon={
								isShowingDetails ? (
									<Icon as={BiSolidLayerMinus} w="1.25rem" h="1.25rem" />
								) : (
									<Icon as={BiSolidLayerPlus} w="1.25rem" h="1.25rem" />
								)
							}
							aria-label="Toggle Total View"
							onClick={handleDetailToggle}
							bg="gray.600"
							isDisabled={!totalUnderlyingAssets.bondedTokensPerPeriod.length}
							_disabled={{
								_hover: { cursor: "not-allowed", filter: "brightness(100%)" },
								opacity: 0.5,
								shadow: "md"
							}}
							_hover={{ filter: "brightness(110%)" }}
							_active={{ filter: "brightness(90%)" }}
						/>
						<IconButton
							isDisabled={!isWalletConnected}
							_disabled={{
								_hover: { cursor: "not-allowed", filter: "brightness(100%)" },
								opacity: 0.5,
								shadow: "md"
							}}
							shadow="md"
							rounded="0.8rem"
							pb={1}
							icon={isShowingTotal ? <Icon as={FaUserAlt} /> : <Icon as={FaGlobeAmericas} />}
							aria-label="Toggle Total View"
							onClick={handleTotalToggle}
							bg="gray.600"
							_hover={{ filter: "brightness(110%)" }}
							_active={{ filter: "brightness(90%)" }}
						/>
					</ButtonGroup>
					{isShowingTotal ? (
						<VStack w="20rem">
							<Skeleton isLoaded={!isLoadingTotalPoolValues} rounded="0.8em" w="full">
								<Tooltip
									bg="gray.800"
									border="none"
									color="white"
									hasArrow
									label={
										<VStack align="start" spacing={0}>
											<Text>
												Unbonded: $
												{`${totalPoolValues.unbondedDollarValue.toLocaleString("en-US", {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2
												})}`}
											</Text>
											<Text>
												Bonded: $
												{`${totalPoolValues?.totalBondedDollarValue.toLocaleString("en-US", {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2
												})}`}
											</Text>
										</VStack>
									}
									placement="top"
									rounded="1em"
									shadow="md"
								>
									<Flex
										justify="start"
										w="full"
										bg="gray.800"
										px={5}
										py={3}
										direction="column"
										rounded="1rem"
										shadow="md"
									>
										<Text fontFamily="heading" fontSize="20" w="full" textAlign="start">
											TVL
										</Text>
										<Divider />
										<Heading
											pt={0.5}
											w="full"
											_hover={{ cursor: "default" }}
											bgClip="text"
											bgGradient="linear(45deg, brand.1, brand.2)"
											noOfLines={1}
										>
											$
											{(
												totalPoolValues.totalBondedDollarValue +
												totalPoolValues?.unbondedDollarValue
											).toLocaleString("en-US", {
												maximumFractionDigits: 2,
												minimumFractionDigits: 2
											})}
										</Heading>
									</Flex>
								</Tooltip>
							</Skeleton>
							<HStack align="start" flex={1} spacing={3} w="full">
								<VStack
									align="start"
									flex={1}
									spacing={0}
									bg="gray.800"
									px={5}
									py={2}
									rounded="1rem"
									shadow="md"
								>
									<Text fontFamily="heading" fontSize="18" w="full" textAlign="center">
										Unbonded
									</Text>
									<Divider w="90%" />
									<VStack pt={0.5} align="end" flex={1} fontSize="18" spacing={0.5} w="full">
										<Skeleton isLoaded={!isLoadingTotalUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{totalUnderlyingAssets?.unbondedTokens[0].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
										<Skeleton isLoaded={!isLoadingTotalUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{totalUnderlyingAssets?.unbondedTokens[1].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
									</VStack>
								</VStack>
								<VStack
									align="center"
									flex={1}
									spacing={0}
									bg="gray.800"
									px={5}
									py={2}
									rounded="1rem"
									shadow="md"
									justify="start"
								>
									<Text fontFamily="heading" fontSize="18" w="full" textAlign="center">
										Bonded
									</Text>
									<Divider w="90%" />
									<VStack pt={0.5} align="end" flex={1} fontSize="18" spacing={0.5} w="full">
										<Skeleton isLoaded={!isLoadingTotalUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{totalUnderlyingAssets?.bondedTokens?.[0].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
										<Skeleton isLoaded={!isLoadingTotalUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{totalUnderlyingAssets?.bondedTokens[1].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
									</VStack>
								</VStack>
							</HStack>
						</VStack>
					) : (
						<VStack w="20rem">
							<Skeleton isLoaded={!isLoadingMyPoolValues} rounded="0.8em" w="full">
								<Tooltip
									bg="gray.800"
									border="none"
									color="white"
									hasArrow
									label={
										<VStack align="start" spacing={0}>
											<Text>
												Unbonded:{" "}
												{`$${myPoolValues.unbondedDollarValue.toLocaleString("en-US", {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2
												})}`}
											</Text>
											<Text>
												Bonded:{" "}
												{`$${myPoolValues?.totalBondedDollarValue.toLocaleString("en-US", {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2
												})}`}
											</Text>
										</VStack>
									}
									placement="top"
									rounded="1em"
									shadow="md"
								>
									<Flex
										justify="start"
										w="full"
										bg="gray.800"
										px={5}
										py={3}
										direction="column"
										rounded="1rem"
										shadow="md"
									>
										<Text fontFamily="heading" fontSize="20" w="full" textAlign="start">
											TVL
										</Text>
										<Divider />
										<Heading
											pt={0.5}
											_hover={{ cursor: "default" }}
											bgClip="text"
											bgGradient="linear(45deg, brand.1, brand.2)"
										>
											$
											{(myPoolValues.totalBondedDollarValue + myPoolValues?.unbondedDollarValue > 0
												? myPoolValues.totalBondedDollarValue + myPoolValues?.unbondedDollarValue
												: 0
											).toFixed(2)}
										</Heading>
									</Flex>
								</Tooltip>
							</Skeleton>
							<HStack align="start" flex={1} spacing={3} w="full">
								<VStack
									align="center"
									flex={1}
									spacing={0}
									bg="gray.800"
									px={5}
									py={2}
									rounded="1rem"
									shadow="md"
									justify="start"
								>
									<Text fontFamily="heading" fontSize="18" w="full" textAlign="center">
										Unbonded
									</Text>
									<Divider />
									<VStack pt={0.5} align="end" flex={1} fontSize="18" spacing={0.5} w="full">
										<Skeleton isLoaded={!isLoadingUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{underlyingAssets?.unbondedTokens[0].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
										<Skeleton isLoaded={!isLoadingUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{underlyingAssets?.unbondedTokens[1].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
									</VStack>
								</VStack>
								<VStack
									align="center"
									flex={1}
									spacing={0}
									bg="gray.800"
									px={5}
									py={2}
									rounded="1rem"
									shadow="md"
									justify="start"
								>
									<Text fontFamily="heading" fontSize="18" w="full" textAlign="center">
										Bonded
									</Text>
									<Divider />
									<VStack pt={0.5} align="end" flex={1} fontSize="18" spacing={0.5} w="full">
										<Skeleton isLoaded={!isLoadingUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{underlyingAssets?.bondedTokens?.[0].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
										<Skeleton isLoaded={!isLoadingUnderlyingAssets} rounded="0.8em" w="full">
											<HStack justify="end" w="full">
												<Text fontSize="0.9em">
													{underlyingAssets?.bondedTokens[1].toLocaleString("en-US", {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2
													})}
												</Text>
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</Skeleton>
									</VStack>
								</VStack>
							</HStack>
						</VStack>
					)}
				</VStack>
				<Flex
					justifyContent="center"
					alignItems="center"
					px={3}
					py={2}
					w={{ base: "full", md: "auto" }}
				>
					<SkeletonCircle isLoaded={Boolean(pieChartData)} boxSize="15rem" overflow="visible">
						<ResponsivePie
							activeOuterRadiusOffset={8}
							// @ts-expect-error test
							arcLabelsComponent={CustomArcLabelComponent}
							arcLabelsRadiusOffset={0}
							motionConfig="wobbly"
							arcLabelsSkipAngle={40}
							arcLabelsTextColor={{
								from: "color",
								modifiers: [["darker", 0.6]]
							}}
							borderWidth={0}
							colors={{ datum: "data.color" }}
							cornerRadius={8}
							data={pieChartData}
							defs={[
								{
									background: "inherit",
									color: "rgba(255, 255, 255, 0.3)",
									id: "normal",
									padding: 1,
									size: 4,
									stagger: true
								},
								{
									background: "inherit",
									color: "rgba(255, 255, 255, 0.3)",
									id: "lines",
									lineWidth: 4,
									rotation: -45,
									spacing: 10,
									type: "patternLines"
								}
							]}
							enableArcLinkLabels={false}
							fill={[
								{
									id: "normal",
									match: {
										id: "bondedTokens"
									}
								},
								{
									id: "lines",
									match: {
										id: "unbondedTokens"
									}
								}
							]}
							innerRadius={0.5}
							margin={{ bottom: 8, left: 0, right: 0, top: 8 }}
							padAngle={2}
							// eslint-disable-next-line react/no-unstable-nested-components
							tooltip={({ datum: { id, label } }) => {
								if (id === "bondedTokens") {
									return (
										<VStack
											_dark={{
												bgGradient: "linear(to-br, gray.600, gray.800)"
											}}
											align="end"
											bgGradient="linear(to-br, gray.600, gray.800)"
											px={2}
											py={1}
											spacing={0}
											rounded="1em"
											shadow="md"
											zIndex="6"
										>
											<Text w="full" textAlign="center" fontFamily="heading" fontSize="sm">
												{label}
											</Text>
											<Divider />
											<HStack pt={0.5} justify="end" w="full">
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.bondedTokens[0].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.bondedTokens[0].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												)}
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
											<HStack pt={0.5} justify="end" w="full">
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.bondedTokens[1].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.bondedTokens[1].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												)}

												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</VStack>
									)
								} else if (id === "unbondedTokens") {
									return (
										<VStack
											_dark={{
												bgGradient: "linear(to-br, gray.600, gray.800)"
											}}
											align="end"
											bgGradient="linear(to-br, gray.600, gray.800)"
											px={2}
											py={1}
											spacing={0}
											rounded="1em"
											shadow="md"
											zIndex="6"
										>
											<Text w="full" textAlign="center" fontFamily="heading" fontSize="sm">
												{label}
											</Text>
											<Divider />
											<HStack>
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.unbondedTokens[0].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.unbondedTokens[0].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												)}

												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
											<HStack pt={0.5}>
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.unbondedTokens[1].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.unbondedTokens[1].toLocaleString("en-US", {
															maximumFractionDigits: 2,
															minimumFractionDigits: 2
														})}
													</Text>
												)}
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</VStack>
									)
								} else {
									const index = Number(id.toString().split("-")[1])

									return (
										<VStack
											_dark={{
												bgGradient: "linear(to-br, gray.600, gray.800)"
											}}
											align="end"
											bgGradient="linear(to-br, gray.600, gray.800)"
											px={2}
											py={1}
											spacing={0}
											rounded="1em"
											shadow="md"
											zIndex="6"
										>
											<Text w="full" textAlign="center" fontFamily="heading" fontSize="sm">
												{label}
											</Text>
											<Divider />
											<HStack>
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.bondedTokensPerPeriod[index][0].toLocaleString(
															"en-US",
															{
																maximumFractionDigits: 2,
																minimumFractionDigits: 2
															}
														)}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.bondedTokensPerPeriod[index][0].toLocaleString(
															"en-US",
															{
																maximumFractionDigits: 2,
																minimumFractionDigits: 2
															}
														)}
													</Text>
												)}
												<Avatar size="xs" src={token1Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
											<HStack pt={0.5}>
												{isShowingTotal ? (
													<Text>
														{totalUnderlyingAssets?.bondedTokensPerPeriod[index][1].toLocaleString(
															"en-US",
															{
																maximumFractionDigits: 2,
																minimumFractionDigits: 2
															}
														)}
													</Text>
												) : (
													<Text>
														{underlyingAssets?.bondedTokensPerPeriod[index][1].toLocaleString(
															"en-US",
															{
																maximumFractionDigits: 2,
																minimumFractionDigits: 2
															}
														)}
													</Text>
												)}
												<Avatar size="xs" src={token2Info?.logoURI ?? "/assets/unknownToken.svg"} />
											</HStack>
										</VStack>
									)
								}
							}}
						/>
					</SkeletonCircle>
				</Flex>
			</Flex>

			<Flex
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
				bg="gray.700"
				bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
				flex={1}
				rounded="1.25em"
				shadow="md"
			>
				<VStack align="start" py={3} px={3} w="full" spacing={1}>
					<Text fontFamily="heading" fontSize="22">
						Rewards
					</Text>
					<Skeleton isLoaded={Boolean(pool)} rounded="0.8em" w="full">
						<Flex
							justify="start"
							w="full"
							bg="gray.800"
							px={5}
							py={3}
							direction="column"
							rounded="1rem"
							shadow="md"
						>
							<Heading
								_hover={{ cursor: "default" }}
								bgClip="text"
								bgGradient="linear(45deg, brand.1, brand.2)"
								textAlign="center"
								fontSize="3xl"
							>
								<chakra.span _dark={{ color: "white" }} color="white" fontSize="18" pe={2}>
									Up to
								</chakra.span>
								{shortenNumber(BigNumber(apr), 2) + "%"}
								<chakra.span _dark={{ color: "white" }} color="white" fontSize="18" ps={2}>
									APR
								</chakra.span>
							</Heading>
						</Flex>
					</Skeleton>
					<SimpleGrid
						columns={pool.bondingPeriods.length}
						h="full"
						spacing={{ base: 2, md: 3 }}
						w="full"
					>
						{options.map(({ days, value, rewards, tokens }) => {
							return (
								<VStack
									align="center"
									bg="blackAlpha.400"
									key={value}
									px={2}
									py={1}
									shadow="md"
									rounded="1.25em"
									spacing={0}
								>
									<Text
										bgGradient="linear(45deg,brand.1,brand.2)"
										bgClip="text"
										fontFamily="heading"
										fontSize="lg"
										fontWeight="bold"
										pb={0.5}
									>
										{days}
									</Text>
									<Divider w="90%" />
									<VStack pt={1} w="full" align="end">
										{rewards.slice(0, 2).map(({ apr: currentApr }, localIndex) => {
											return (
												// eslint-disable-next-line react/jsx-key
												<HStack spacing={0.5}>
													<Text>
														{shortenNumber(BigNumber(currentApr), 2)}
														<chakra.span ps={0.5}>%</chakra.span>
													</Text>
													<Avatar h="1.5rem" src={tokens[localIndex].logoURI ?? ""} w="1.5rem" />
												</HStack>
											)
										})}
									</VStack>
								</VStack>
							)
						})}
					</SimpleGrid>
				</VStack>
			</Flex>
		</Flex>
	)
}
