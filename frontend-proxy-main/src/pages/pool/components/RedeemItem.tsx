/* eslint-disable canonical/id-match */
import { Avatar, Button, Flex, HStack, Skeleton, Text, VStack } from "@chakra-ui/react"
import { useCountDown } from "ahooks"
import dayjs from "dayjs"
import { useUnbondingAssets } from "hooks/pool/query/useUnbondingAssets"
import { useRedeemTokens } from "hooks/pool/tx/useRedeemTokens"
import { useEffect, useMemo, useRef, useState } from "react"
import { type TPool } from "utils/tokens/pools"

export const RedeemItem = ({
	lockDuration,
	unbonding_info,
	index,
	pool,
	stakingAddress
}: {
	index: number
	lockDuration: number
	pool: TPool
	stakingAddress: string
	unbonding_info: {
		address: string
		amount: string
		time: number
	}
}) => {
	const [unbondingAssets, isLoadingUnbondingAssets] = useUnbondingAssets({
		address: unbonding_info.address,
		amount: unbonding_info.amount,
		index,
		pool
	})

	const [redeemAvailable, setRedeemAvailable] = useState(false)

	useEffect(() => {
		if (dayjs(unbonding_info.time * 1_000 + lockDuration * 1_000).unix() - dayjs().unix() <= 0) {
			setRedeemAvailable(true)
		} else {
			setRedeemAvailable(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unbonding_info])

	const { mutate: handleRedeemTokens, isLoading: isExecutingRedeem } = useRedeemTokens({
		stakingAddress
	})

	const timerRef = useRef<dayjs.Dayjs>()

	useMemo(() => {
		timerRef.current = dayjs(unbonding_info.time * 1_000 + lockDuration * 1_000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unbonding_info])

	const [, formattedResponse] = useCountDown({
		targetDate: timerRef.current
	})

	const { days, hours, minutes, seconds } = formattedResponse

	return (
		<Flex
			_dark={{ bg: "gray.700" }}
			align="center"
			bg="gray.700"
			key={unbonding_info.time}
			px={2}
			py={2}
			rounded="1em"
			shadow="md"
			w="full"
		>
			<VStack align="start" flex={1} fontSize="18" spacing={0.5} w="full">
				<Skeleton isLoaded={Boolean(unbondingAssets)} rounded="0.8em">
					<HStack>
						<Text color="white" fontFamily="heading">
							{unbondingAssets.unbondingAssets[0].toFixed(2)}
						</Text>
						<Avatar
							size="xs"
							src={`/assets/listedTokens/${pool.liquidity.token1.denom.replaceAll("/", "")}.png`}
						/>
					</HStack>
				</Skeleton>
				<Skeleton isLoaded={!isLoadingUnbondingAssets} rounded="0.8em">
					<HStack>
						<Text color="white" fontFamily="heading">
							{unbondingAssets.unbondingAssets[1].toFixed(2)}
						</Text>
						<Avatar
							size="xs"
							src={`/assets/listedTokens/${pool.liquidity.token2.denom.replaceAll("/", "")}.png`}
						/>
					</HStack>
				</Skeleton>
			</VStack>
			<VStack align="end">
				<HStack align="start" justify="end" spacing={1}>
					{redeemAvailable ? (
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontFamily="mono"
							fontWeight="900"
							textAlign="end"
							w="11rem"
						>
							Unbonding Complete
						</Text>
					) : (
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontFamily="mono"
							fontWeight="900"
							textAlign="end"
							w="11rem"
						>
							{days.toLocaleString(undefined, {
								maximumSignificantDigits: 2
							})}{" "}
							Days, {hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
							{minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
							{seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
						</Text>
					)}
				</HStack>
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
					isDisabled={!redeemAvailable}
					isLoading={isExecutingRedeem}
					onClick={() => {
						handleRedeemTokens()
					}}
					rounded="1em"
					size="sm"
					transition="0.2s all"
				>
					Redeem
				</Button>
			</VStack>
		</Flex>
	)
}
