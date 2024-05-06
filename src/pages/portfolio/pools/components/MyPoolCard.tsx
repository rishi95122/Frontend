/* eslint-disable complexity */
import {
	Avatar,
	AvatarGroup,
	Button,
	chakra,
	Flex,
	Heading,
	HStack,
	Icon,
	Skeleton,
	Text,
	VStack
} from "@chakra-ui/react"
import { type Denom } from "@electronprotocol/contracts/types/FuzioPool.types"
import { usePoolDollarValues } from "@hooks/pool/query/usePoolDollarValues"
import { usePoolRewards } from "@hooks/pool/query/usePoolRewards"
import { useRedeemHistory } from "@hooks/pool/query/useRedeemHistory"
import { useTokenList } from "@hooks/tokens/query/useTokenList"
import { convertMicroDenomToDenom } from "@utils/tokens/helpers"
import { BigNumber } from "bignumber.js"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useClaimRewards } from "hooks/pool/tx/useClaimRewards"
import { useRedeemAllTokens } from "hooks/pool/tx/useRedeemAllTokens"
import { getTokenInfoFromTokenList, useTokenInfo } from "hooks/tokens/query/useTokenInfo"
import { useEffect, useState } from "react"
import { FaDownload, FaWrench } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { type TPool } from "utils/tokens/pools"
import shortenNumber from "utils/ui/shortenNumber"

export const MyPoolCard = ({ pool }: { pool: TPool }) => {
	const tokenA = useTokenInfo(pool.liquidity.token1.denom)
	const tokenB = useTokenInfo(pool.liquidity.token2.denom)
	const highestAprToken = useTokenInfo(
		pool.highestApr.highestAprToken
			? Object.values(pool.highestApr.highestAprToken)[0]
			: pool.liquidity.token1.denom
	)

	const [tokenList] = useTokenList()

	const navigate = useNavigate()

	const [poolDollarValue, isLoadingPoolDollarValue] = usePoolDollarValues({
		pool
	})

	const [poolRewards, isLoadingPoolRewards] = usePoolRewards({
		pool
	})

	const [redeemHistory] = useRedeemHistory({
		limit: 100,
		pool,
		startAfter: 0
	})

	const [redeemAvailable, setRedeemAvailable] = useState(false)
	const [claimAvailable, setClaimAvailable] = useState(false)
	const [claimableRewards, setClaimableRewards] = useState<Array<{ amount: string; token: Denom }>>(
		[]
	)

	useEffect(() => {
		if (redeemHistory?.canUnbondAny) {
			setRedeemAvailable(true)
		} else {
			setRedeemAvailable(false)
		}
	}, [redeemHistory])

	useEffect(() => {
		let totalRewardAmount = 0
		for (const reward of poolRewards) {
			totalRewardAmount += Number(reward.amount)
		}

		if (totalRewardAmount > 0) {
			setClaimAvailable(true)
		} else {
			setClaimAvailable(false)
		}

		const currentlyClaimableRewards = poolRewards.filter((reward) => reward.amount !== "0")

		if (currentlyClaimableRewards.length > 0) {
			setClaimableRewards(currentlyClaimableRewards)
		}
	}, [poolRewards])

	const { mutate: handleRedeemTokens, isLoading: isExecutingRedeem } = useRedeemAllTokens({ pool })

	const { mutate: handleClaimRewards, isLoading: isExecutingClaim } = useClaimRewards({
		pool
	})

	return (
		<Flex
			_dark={{
				bg: "rgba(33, 33, 33, 0.5)"
			}}
			align="start"
			bg="gray.800"
			pb={{ base: 12, md: 3 }}
			pos="relative"
			pt={3}
			px={3}
			rounded="1.25em"
			shadow="md"
			w={{ base: "full", md: "full" }}
			h={{ base: "80%", md: "full" }}
		>
			<Flex direction="column" flex={1} gap={2} h="full" w="full">
				<HStack>
					<AvatarGroup size={{ base: "sm", md: "md" }}>
						<Avatar border="none" name={tokenA?.symbol ?? ""} src={tokenA?.logoURI ?? ""} />
						<Avatar
							border="none"
							name={tokenB?.symbol ?? ""}
							right="3"
							src={tokenB?.logoURI ?? ""}
						/>
					</AvatarGroup>
					<VStack align="start" h="full" spacing={0}>
						<Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="400">
							{tokenA?.symbol}
							<chakra.span color="gray.400" fontWeight="900" px="4px">
								/
							</chakra.span>
							{tokenB?.symbol}
						</Heading>
						<Text fontSize={{ base: "sm", md: "lg" }}>
							<chakra.span color="gray.400" fontSize="sm" fontWeight="900" pe="2px">
								#
							</chakra.span>
							{pool.poolId}
						</Text>
					</VStack>
				</HStack>
				<Flex direction="column" flex={1} gap={1.5} h="full" w="full">
					<HStack
						_dark={{ bg: "rgba(33, 33, 33, 0.7)", color: "white" }}
						bg="rgba(33, 33, 33, 0.7)"
						color="white"
						h={{ base: "1.25rem", md: "3rem" }}
						justify="space-between"
						px={3}
						py={2}
						mt={-1}
						rounded="0.8em"
						shadow="md"
						w="full"
						fontSize={{ base: "12", md: "16" }}
					>
						<Text fontFamily="heading">APR</Text>
						<Skeleton isLoaded={Boolean(pool.highestApr)}>
							<HStack>
								<Text fontSize={pool.highestApr.highestAprValue === 0 ? "20" : "14"}>
									{pool.highestApr.highestAprValue === 0 ? "No Rewards" : "Up to"}
									{pool.highestApr.highestAprValue !== 0 && (
										<chakra.span
											bgClip="text"
											bgGradient="linear(45deg, brand.1, brand.2)"
											fontFamily="heading"
											fontSize={{ base: "14", md: "20" }}
											ps={1}
										>
											{shortenNumber(BigNumber(pool.highestApr.highestAprValue), 2) ?? 0}%
										</chakra.span>
									)}
								</Text>
								{pool.highestApr.highestAprToken && (
									<Avatar
										h={{ base: "1rem", md: "2rem" }}
										src={highestAprToken?.logoURI ?? "/assets/unknownToken.svg"}
										w={{ base: "1rem", md: "2rem" }}
									/>
								)}
							</HStack>
						</Skeleton>
					</HStack>

					{claimableRewards.length !== 0 && (
						<HStack
							_dark={{ bg: "rgba(33, 33, 33, 0.7)", color: "white" }}
							bg="rgba(33, 33, 33, 0.7)"
							color="white"
							h={{ base: "1.25rem", md: "3rem" }}
							justify="space-between"
							px={3}
							py={1}
							rounded="0.8em"
							shadow="md"
							w="full"
							fontSize={{ base: "12", md: "16" }}
						>
							<Text fontFamily="heading">Rewards</Text>
							<Skeleton isLoaded={!isLoadingPoolRewards} rounded="1em">
								<HStack align="center">
									{claimableRewards.map((reward) => {
										const tokenInfo = getTokenInfoFromTokenList(
											Object.values(reward.token)[0],
											tokenList
										)

										return (
											// eslint-disable-next-line react/jsx-key
											<HStack>
												<Text
													bgClip="text"
													bgGradient="linear(45deg, brand.1, brand.2)"
													fontFamily="heading"
													fontSize={{ base: "14", md: "20" }}
													ps={1}
												>
													{convertMicroDenomToDenom(
														reward.amount!,
														tokenInfo?.decimal ?? 6
													).toFixed(2)}
												</Text>
												{tokenInfo && (
													<Avatar
														h={{ base: "1rem", md: "1.5rem" }}
														src={tokenInfo?.logoURI ?? "/assets/unknownToken.svg"}
														w={{ base: "1rem", md: "1.5rem" }}
													/>
												)}
											</HStack>
										)
									})}
								</HStack>
							</Skeleton>
						</HStack>
					)}
					<HStack
						_dark={{ bg: "rgba(33, 33, 33, 0.7)", color: "white" }}
						bg="linear(to-b, #0a2b33, #1a001e)"
						color="white"
						justify="space-between"
						px={3}
						py={0.2}
						rounded="0.8em"
						shadow="md"
						w="full"
					>
						<VStack align="start" spacing={{ base: "0.3", md: "0.5" }}>
							<Text fontFamily="heading" fontSize={{ base: "12", md: "16" }}>
								Unbonded
							</Text>
							<Text fontFamily="heading" fontSize={{ base: "12", md: "16" }}>
								Bonded
							</Text>
							<Text fontFamily="heading" fontSize={{ base: "12", md: "16" }}>
								Redeemable
							</Text>
						</VStack>
						<VStack align="end" spacing={{ base: "0.3", md: "0.5" }}>
							<Skeleton isLoaded={!isLoadingPoolDollarValue} rounded="1em">
								<Text
									bgClip="text"
									bgGradient="linear(45deg, brand.1, brand.2)"
									fontFamily="heading"
									ps={1}
									fontSize={{ base: "14", md: "20" }}
								>
									{poolDollarValue.unbondedDollarValue < 0.01 &&
									poolDollarValue.unbondedDollarValue !== 0
										? "< 0.01$"
										: `$${poolDollarValue?.unbondedDollarValue.toFixed(2)}`}
								</Text>
							</Skeleton>
							<Skeleton isLoaded={!isLoadingPoolDollarValue} rounded="1em">
								<Text
									bgClip="text"
									bgGradient="linear(45deg, brand.1, brand.2)"
									fontFamily="heading"
									ps={1}
									fontSize={{ base: "14", md: "20" }}
								>
									{poolDollarValue.totalBondedDollarValue < 0.01 &&
									poolDollarValue.totalBondedDollarValue !== 0
										? "< 0.01$"
										: `$${poolDollarValue?.totalBondedDollarValue.toFixed(2)}`}
								</Text>
							</Skeleton>
							<Skeleton isLoaded={!isLoadingPoolDollarValue} rounded="1em">
								<Text
									bgClip="text"
									bgGradient="linear(45deg, brand.1, brand.2)"
									fontFamily="heading"
									ps={1}
									fontSize={{ base: "14", md: "20" }}
								>
									{poolDollarValue.totalRedeemableDollarValue < 0.01 &&
									poolDollarValue.totalRedeemableDollarValue !== 0
										? "< 0.01$"
										: `$${poolDollarValue?.totalRedeemableDollarValue.toFixed(0)}`}
								</Text>
							</Skeleton>
						</VStack>
					</HStack>
				</Flex>
				<HStack justify="space-evenly" mt={{ base: "-0.5", md: "2" }} mb={{ base: "2", md: "0" }}>
					<Button
						_active={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						shadow="md"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						leftIcon={<Icon as={FaWrench} h="1.2rem" w="1.2rem" />}
						onClick={() => {
							navigate(`/pool/${pool.poolId}`)
						}}
						rounded="0.9em"
						transition="all 0.25s"
					>
						Manage
					</Button>
					<Button
						_active={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						shadow="md"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						isDisabled={!redeemHistory || !redeemAvailable}
						isLoading={isExecutingRedeem}
						leftIcon={<Icon as={FaDownload} h="1.2rem" w="1.2rem" />}
						onClick={() => {
							handleRedeemTokens()
						}}
						rounded="0.9em"
						transition="all 0.25s"
					>
						Redeem
					</Button>
					<Button
						_active={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						_hover={{
							filter: "brightness(110%) drop-shadow(0px 0px 2px rgba(2,226,150, 1))",
							shadow: "glowMd"
						}}
						shadow="md"
						aria-label="Claim Pool Rewards"
						bgGradient="linear(45deg, brand.1, brand.2)"
						color="gray.800"
						fontSize="16"
						isDisabled={!claimAvailable}
						isLoading={isExecutingClaim}
						leftIcon={<FarmIcon h="1.5rem" w="1.5rem" />}
						onClick={() => {
							handleClaimRewards()
						}}
						rounded="0.9em"
						transition="all 0.25s"
					>
						Claim
					</Button>
				</HStack>
			</Flex>
		</Flex>
	)
}
