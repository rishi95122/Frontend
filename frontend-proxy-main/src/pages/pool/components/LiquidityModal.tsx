import { RemoveLiquidity } from "./RemoveLiquidity"
import {
	Avatar,
	Button,
	Center,
	Circle,
	Flex,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
	useToken,
	VStack
} from "@chakra-ui/react"
import { transparentize } from "@chakra-ui/theme-tools"
import { usePoolFromListQueryById } from "@hooks/pool/query/usePoolList"
import { useUnbondedLiquidity } from "@hooks/pool/query/useUnbondedLiquidity"
import { useAddLiquidity } from "@hooks/pool/tx/useAddLiquidity"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { theme } from "@theme/index"
import { type Token } from "@utils/tokens/tokens"
import { BigNumber } from "bignumber.js"
import { NumericFormat } from "react-number-format"
import { useParams } from "react-router-dom"
import Wave from "react-wavify"
import { useRecoilState } from "recoil"
import { addLiquidityState } from "state/poolState"
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "utils/tokens/helpers"

export const LiquidityModal = ({
	isOpen,
	onClose,
	tokenAColor,
	tokenBColor,
	tokenAColorMuted,
	tokenBColorMuted,
	tokenA,
	tokenB
}: {
	isOpen: boolean
	onClose: () => void
	tokenA: Token
	tokenAColor: string
	tokenAColorMuted: string
	tokenB: Token
	tokenBColor: string
	tokenBColorMuted: string
}) => {
	const [tokenABalance] = useTokenBalance(tokenA.denom)
	const [tokenBBalance] = useTokenBalance(tokenB.denom)

	// const [token1DollarPrice, isLoadingToken1Price] = useTokenDollarPriceTFM({
	//   token: tokenA.token
	//   // : TokenStatus[tokenA.token].contractAddress!
	// })
	// const [token2DollarPrice, isLoadingToken2Price] = useTokenDollarPriceTFM({
	//   token: tokenB.token
	//   // : TokenStatus[tokenB.token].contractAddress!
	// })

	const parameters = useParams()
	const [pool] = usePoolFromListQueryById({
		poolId: Number(parameters.slug!)
	})

	const [unbonded] = useUnbondedLiquidity({ pool: pool?.pool! })

	const [{ tokenA: token1, tokenB: token2 }, setLiquidityAmount] = useRecoilState(addLiquidityState)

	const { mutate: handleAddLiquidity, isLoading: isExecutingAdd } = useAddLiquidity()

	const [red500] = useToken("colors", ["red.500"])

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay backdropFilter="blur(70px)" />
			<ModalContent
				_dark={{
					bg: "gray.700",
					bgGradient: "linear(to-br, gray.600 1%, gray.800 80%)"
				}}
				bg="gray.700"
				bgGradient="linear(to-br, gray.600 1%, gray.800 80%)"
				h="30rem"
				shadow="lg"
				rounded="1.25em"
			>
				<ModalHeader fontFamily="heading" color="white" textAlign="center" w="full">
					Manage Liquidity
				</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody px={{ base: 1 }}>
					<Tabs h="full" isFitted isLazy px={{ base: 0, md: 2 }} variant="soft-rounded">
						<TabList
							_dark={{ color: "white" }}
							bg="whiteAlpha.200"
							color="gray.800"
							gap={2}
							h="3rem"
							rounded="1.25em"
							shadow="md"
						>
							<Tab
								_dark={{
									_selected: { color: "gray.800" },
									color: "white"
								}}
								_selected={{
									bgGradient: "linear(45deg, brand.1, brand.2)",
									color: "gray.800",
									shadow: "glowMd"
								}}
								color="white"
								fontWeight="900"
								rounded="1.25em"
							>
								Add Liquidity
							</Tab>
							<Tab
								_dark={{
									_selected: { color: "gray.800" },
									color: "white"
								}}
								_selected={{
									bgGradient: "linear(45deg, brand.1, brand.2)",
									color: "gray.800",
									shadow: "glowMd"
								}}
								color="white"
								isDisabled={unbonded.isZero()}
								rounded="1.25em"
							>
								Remove Liquidity
							</Tab>
						</TabList>
						<TabPanels h="calc(100% - 3rem)">
							<TabPanel h="full" px={{ base: 0, md: 0 }}>
								<Flex flexDir="column" gap={3} h="full" w="full">
									<Flex flex={1} flexDir="column" gap={6} justify="center" w="full">
										<Flex
											_dark={{ bg: "gray.800" }}
											align="center"
											bg="gray.800"
											shadow={`${transparentize(
												tokenAColor,
												0.45
											)(
												theme
											)} 0px 0px 0.5rem, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenAColor} 0px 0px 1.1rem inset`}
											// filter={`drop-shadow(0px -2px 0.25rem ${tokenAColor}) drop-shadow(0px 2px 0.25rem ${tokenAColorMuted})`}
											gap={2}
											pe={4}
											py={0}
											rounded="full"
											w="full"
										>
											<Circle
												alignItems="center"
												bg="gray.900"
												shadow={`${transparentize(
													tokenAColor,
													0.45
												)(
													theme
												)} 0px 0px 0.5rem, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenAColor} 0px 0px 1.1rem inset`}
												justifyContent="center"
												overflow="hidden"
												pos="relative"
												rounded="full"
												size="6.25rem"
											>
												<Wave
													fill="url(#gradientToken1)"
													options={{
														amplitude: 7,
														height: 45,
														points: 2,
														speed: 0.25
													}}
													style={{
														display: "flex",
														filter: `drop-shadow(0rem -0.15rem 1rem ${tokenAColor}) drop-shadow(0rem -0.15rem 1rem ${tokenAColorMuted})`,
														height: "6.25rem",
														position: "absolute",
														zIndex: 1
													}}
												>
													<defs>
														<linearGradient gradientTransform="rotate(90)" id="gradientToken1">
															<stop offset="20%" stopColor={tokenAColor} />
															<stop offset="90%" stopColor={tokenAColorMuted} />
														</linearGradient>
													</defs>
												</Wave>
												<Center gap={0.5} mixBlendMode="color-dodge" zIndex={2}>
													<Text
														fontFamily="number"
														fontSize={26}
														fontWeight="bold"
														textShadow={`${tokenAColorMuted} 0.1rem 0.1rem 0rem`}
													>
														50
													</Text>
													<Text
														fontFamily="number"
														fontSize={26}
														fontWeight="bold"
														textShadow={`${tokenAColorMuted} 0.1rem 0.1rem 0rem`}
													>
														%
													</Text>
												</Center>
											</Circle>
											<VStack align="start" w="full">
												<Flex align="center" gap={2} justify="end" pe={2} w="full">
													<Text
														color="white"
														fontFamily="heading"
														fontSize={{ base: "0.9em", md: "md" }}
														fontWeight="normal"
													>
														Available
													</Text>
													<HStack spacing={1}>
														<Text
															bgClip="text"
															bgGradient="linear(45deg, brand.1, brand.2)"
															fontSize={{ base: "0.9em", md: "md" }}
															fontWeight="900"
														>
															{convertMicroDenomToDenom(
																tokenABalance,
																tokenA.decimal ?? 6
															).toString()}
														</Text>
														<Avatar
															h="1.25rem"
															src={tokenA?.logoURI ?? "/assets/unknownToken.svg"}
															w="1.25rem"
														/>
													</HStack>
													<HStack ms="auto" spacing={1}>
														<Button
															_active={{ filter: "brightness(90%)" }}
															_dark={{ bg: "gray.600", color: "white" }}
															_hover={{ filter: "brightness(110%)" }}
															bg="gray.600"
															color="white"
															fontSize="sm"
															h={7}
															onClick={() => {
																setLiquidityAmount({
																	tokenA: {
																		amount: tokenABalance.dividedToIntegerBy(2).toString(),
																		token: token1.token
																	},
																	tokenB: {
																		amount: convertDenomToMicroDenom(
																			convertMicroDenomToDenom(
																				tokenABalance.dividedBy(2),
																				token1.token.decimal
																			),
																			token2.token.decimal
																		)
																			.multipliedBy(pool?.pool.ratio!)
																			.decimalPlaces(0, BigNumber.ROUND_CEIL)
																			.toString(),
																		token: token2.token
																	}
																})
															}}
															px={0}
															py={0}
															rounded="full"
															shadow="md"
															transition="0.2s all"
															w={12}
														>
															Half
														</Button>
														<Button
															_active={{ filter: "brightness(90%)" }}
															_dark={{ bg: "gray.600", color: "white" }}
															_hover={{ filter: "brightness(110%)" }}
															bg="gray.600"
															color="white"
															fontSize="sm"
															h={7}
															onClick={() => {
																setLiquidityAmount(
																	({ tokenA: currentTokenA, tokenB: currentTokenB }) => {
																		return {
																			tokenA: {
																				amount: tokenABalance
																					.decimalPlaces(0, BigNumber.ROUND_CEIL)
																					.toString(),
																				token: currentTokenA.token
																			},
																			tokenB: {
																				amount: convertDenomToMicroDenom(
																					convertMicroDenomToDenom(
																						tokenABalance,
																						currentTokenA.token.decimal
																					),
																					currentTokenB.token.decimal
																				)
																					.multipliedBy(pool?.pool.ratio!)
																					.decimalPlaces(0, BigNumber.ROUND_CEIL)
																					.toString(),
																				token: currentTokenB.token
																			}
																		}
																	}
																)
															}}
															px={0}
															py={0}
															rounded="full"
															shadow="md"
															transition="0.2s all"
															w={12}
														>
															Max
														</Button>
													</HStack>
												</Flex>
												<VStack align="end" w="full">
													<NumericFormat
														_dark={{ _focus: { bg: "gray.800" } }}
														allowLeadingZeros={false}
														allowNegative={false}
														bg="transparent"
														color={useColorModeValue("white", "white")}
														customInput={Input}
														decimalScale={token1.token.decimal}
														fontSize={{ base: "lg", sm: "24" }}
														fontWeight="bold"
														minH="3rem"
														onValueChange={(values) => {
															const { value } = values

															setLiquidityAmount(
																({ tokenA: currentTokenA, tokenB: currentTokenB }) => {
																	return {
																		tokenA: {
																			amount: convertDenomToMicroDenom(
																				value,
																				currentTokenA.token.decimal
																			)
																				.decimalPlaces(0, 1)
																				.toString(),
																			token: currentTokenA.token
																		},
																		tokenB: {
																			amount: convertDenomToMicroDenom(
																				value,
																				currentTokenB.token.decimal
																			)
																				.multipliedBy(pool?.pool.ratio!)
																				.decimalPlaces(0, 0)
																				.toString(),
																			token: currentTokenB.token
																		}
																	}
																}
															)
														}}
														placeholder="0"
														px={2}
														py={1}
														rounded="0.6em"
														textAlign="end"
														thousandSeparator=","
														value={convertMicroDenomToDenom(
															token1.amount,
															token1.token.decimal
														).toString()}
														valueIsNumericString
														variant="unstyled"
														w="full"
													/>
													{/* <Text
                            fontSize={{ sm: "16" }}
                            textAlign="end"
                            fontWeight="bold"
                            color={
                              token1.amount === "0"
                                ? useColorModeValue(
                                    "blackAlpha.600",
                                    "whiteAlpha.600"
                                  )
                                : useColorModeValue(
                                    "blackAlpha.700",
                                    "whiteAlpha.700"
                                  )
                            }
                          >
                            $
                            {(
                              token1DollarPrice *
                              convertMicroDenomToDenom(
                                token1.amount,
                                TokenStatus[token1.token].decimal
                              ).toNumber()
                            ).toFixed(2)}
                          </Text> */}
												</VStack>
											</VStack>
										</Flex>
										<Flex
											_dark={{ bg: "gray.800" }}
											align="center"
											bg="gray.800"
											shadow={`${transparentize(
												tokenBColor,
												0.45
											)(
												theme
											)} 0px 0px 0.5rem, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenBColor} 0px 0px 1.1rem inset`}
											gap={2}
											pe={4}
											py={0}
											rounded="full"
											w="full"
										>
											<Circle
												alignItems="center"
												bg="gray.900"
												shadow={`${transparentize(
													tokenBColor,
													0.45
												)(
													theme
												)} 0px 0px 0.5rem, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, ${tokenBColor} 0px 0px 1.1rem inset`}
												justifyContent="center"
												overflow="hidden"
												pos="relative"
												rounded="full"
												size="6.25rem"
											>
												<Wave
													fill="url(#gradientToken2)"
													options={{
														amplitude: 7,
														height: 45,
														points: 2,
														speed: 0.25
													}}
													style={{
														display: "flex",
														filter: `drop-shadow(0rem -0.15rem 1rem ${tokenBColor}) drop-shadow(0rem -0.15rem 1rem ${tokenBColorMuted})`,
														height: "6.25rem",
														position: "absolute",
														zIndex: 1
													}}
												>
													<defs>
														<linearGradient gradientTransform="rotate(90)" id="gradientToken2">
															<stop offset="20%" stopColor={tokenBColor} />
															<stop offset="90%" stopColor={tokenBColorMuted} />
														</linearGradient>
													</defs>
												</Wave>
												<Center gap={0.5} mixBlendMode="color-dodge" zIndex={2}>
													<Text
														fontFamily="number"
														fontSize={26}
														fontWeight="bold"
														textShadow={`${tokenBColorMuted} 0.1rem 0.1rem 0rem`}
													>
														50
													</Text>
													<Text
														fontFamily="number"
														fontSize={26}
														fontWeight="bold"
														textShadow={`${tokenBColorMuted} 0.1rem 0.1rem 0rem`}
													>
														%
													</Text>
												</Center>
											</Circle>
											<VStack align="end" spacing={0} w="full">
												<Flex align="center" gap={2} justify="start" pe={2} w="full">
													<Text
														color="white"
														fontFamily="heading"
														fontSize={{ base: "0.9em", md: "md" }}
														fontWeight="normal"
													>
														Available
													</Text>
													<HStack spacing={1}>
														<Text
															bgClip="text"
															bgGradient="linear(45deg, brand.1, brand.2)"
															fontSize={{ base: "0.9em", md: "md" }}
															fontWeight="900"
														>
															{convertMicroDenomToDenom(
																tokenBBalance,
																tokenB.decimal ?? 6
															).toString() ?? 0}
														</Text>
														<Avatar
															h="1.25rem"
															src={tokenB?.logoURI ?? "/assets/unknownToken.svg"}
															w="1.25rem"
														/>
													</HStack>
												</Flex>
												<VStack align="end" spacing={0} w="full">
													<NumericFormat
														_dark={{ _focus: { bg: "gray.800" } }}
														_invalid={{
															border: `1px solid ${red500}`
														}}
														allowLeadingZeros={false}
														allowNegative={false}
														bg="transparent"
														border="0px"
														color={useColorModeValue("white", "white")}
														customInput={Input}
														decimalScale={token2.token.decimal}
														fontSize={{ base: "lg", sm: "24" }}
														fontWeight="bold"
														isInvalid={tokenBBalance.lt(Number(token2.amount))}
														minH="3rem"
														onValueChange={(values) => {
															const { value } = values

															setLiquidityAmount(
																({ tokenA: currentTokenA, tokenB: currentTokenB }) => {
																	return {
																		tokenA: {
																			amount: convertDenomToMicroDenom(
																				value,
																				currentTokenA.token.decimal ?? 6
																			)
																				.dividedBy(pool?.pool.ratio!)
																				.decimalPlaces(0, 1)
																				.toString(),
																			token: currentTokenA.token
																		},
																		tokenB: {
																			amount: convertDenomToMicroDenom(
																				value,
																				currentTokenB.token.decimal ?? 6
																			)
																				.decimalPlaces(0, 1)
																				.toString(),
																			token: currentTokenB.token
																		}
																	}
																}
															)
														}}
														placeholder="0"
														px={2}
														py={1}
														rounded="0.6em"
														textAlign="end"
														thousandSeparator=","
														transition="0.2s all"
														value={convertMicroDenomToDenom(
															token2.amount,
															token2.token.decimal
														).toString()}
														valueIsNumericString
														variant="unstyled"
														w="fit-content"
													/>
													{/* <Text
                            fontSize={{ sm: "16" }}
                            textAlign="end"
                            fontWeight="bold"
                            color={
                              token2.amount === "0"
                                ? useColorModeValue(
                                    "blackAlpha.600",
                                    "whiteAlpha.600"
                                  )
                                : useColorModeValue(
                                    "blackAlpha.700",
                                    "whiteAlpha.700"
                                  )
                            }
                          >
                            $
                            {(
                              token2DollarPrice *
                              convertMicroDenomToDenom(
                                Number(token2.amount),
                                TokenStatus[token2?.token!]?.decimal ?? 6
                              ).toNumber()
                            ).toFixed(2)}
                          </Text> */}
												</VStack>
											</VStack>
										</Flex>
									</Flex>
									<Button
										isLoading={isExecutingAdd}
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
										isDisabled={token1.amount === "0" || token2.amount === "0"}
										minH="3rem"
										mt="auto"
										onClick={() => handleAddLiquidity()}
										rounded="1.25em"
										transition="0.2s all"
										shadow={token1.amount === "0" || token2.amount === "0" ? "md" : "glowMd"}
										w="full"
									>
										Add Liquidity
									</Button>
								</Flex>
							</TabPanel>
							<TabPanel h="full" px={{ base: 0, md: 2 }}>
								<RemoveLiquidity pool={pool?.pool!} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
