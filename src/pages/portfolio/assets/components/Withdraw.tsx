import { ChainDisplay } from "./ChainDisplay"
import {
	Button,
	Flex,
	HStack,
	Input,
	Spacer,
	Text,
	useColorModeValue,
	VStack
} from "@chakra-ui/react"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import { useIBCWithdraw } from "@hooks/ibc/tx/useIBCWithdraw"
import { useTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { type Token } from "@utils/tokens/tokens"
import dayjs from "dayjs"
import Long from "long"
import { useEffect } from "react"
import { FaArrowRight } from "react-icons/fa"
import { NumericFormat } from "react-number-format"
import { useRecoilState, useRecoilValue } from "recoil"
import { externalChainInfoState, neutronTokenState } from "state/UIState"
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "utils/tokens/helpers"

const Withdraw = ({ token }: { token: Token }) => {
	const {
		address,
		wallet,
		isWalletConnected: isNeutronConnected
	} = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const {
		address: externalAddress,
		connect,
		isWalletConnected
	} = useChainWallet(token.chain?.chainName!, wallet?.name!)
	const [tokenBalance] = useTokenBalance(token.denom)
	const [externalChainInfo, setExternalChainInfo] = useRecoilState(externalChainInfoState)
	const neutronToken = useRecoilValue(neutronTokenState)

	useEffect(() => {
		if (!isWalletConnected) {
			void connect()
		}

		setExternalChainInfo({
			receiver: externalAddress!,
			sender: address!,
			sourceChannel: token.chain?.ibcChannels?.withdraw_channel!,
			sourcePort: token.chain?.ibcChannels?.port_id!,
			timeoutHeight: { revisionHeight: Long.fromNumber(0), revisionNumber: Long.fromNumber(4) },
			timeoutTimestamp: Long.fromNumber(dayjs().add(10, "minutes").unix() * 1_000_000_000),
			token: {
				amount: "0",
				denom: token.denom
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, externalAddress, address])

	const { mutate: handleIbcWithdraw, isLoading: isExecutingWithdraw } = useIBCWithdraw()

	return (
		<VStack align="end">
			<HStack w="full" justify="space-between" mb={6}>
				<ChainDisplay
					address={address!}
					token={neutronToken}
					type="deposit"
					isWalletConnected={isNeutronConnected}
				/>
				<ChainDisplay
					address={externalAddress!}
					token={token}
					type="withdraw"
					isWalletConnected={isWalletConnected}
				/>
			</HStack>
			<VStack align="start" w="full" mb={6}>
				<Flex w="full" justify="end" align="center" gap={2}>
					<Text fontFamily="heading" fontSize={{ base: "0.9em", md: "md" }} fontWeight="normal">
						Available on Neutron
					</Text>
					<Text
						bgClip="text"
						bgGradient="linear(45deg,brand.1,brand.2)"
						fontSize={{ base: "0.9em", md: "md" }}
						fontWeight="900"
						color="brand.1"
					>
						{convertMicroDenomToDenom(tokenBalance, token.decimal).toString()}
					</Text>
					<Spacer />
					<HStack>
						<Button
							fontSize="sm"
							bg="offwhite.1"
							color="gray.800"
							_dark={{ bg: "gray.600", color: "white" }}
							_hover={{ filter: "brightness(110%)" }}
							_active={{ filter: "brightness(90%)" }}
							rounded="0.8em"
							shadow="md"
							transition="0.2s all"
							h={7}
							py={0}
							px={0}
							w={12}
							onClick={() => {
								setExternalChainInfo((external) => {
									return {
										...external,
										token: {
											amount: tokenBalance.dividedBy(2).decimalPlaces(0, 1).toString(),
											denom: token.denom
										}
									}
								})
							}}
						>
							Half
						</Button>
						<Button
							rounded="0.8em"
							fontSize="sm"
							bg="offwhite.1"
							color="gray.800"
							_dark={{ bg: "gray.600", color: "white" }}
							_hover={{ filter: "brightness(110%)" }}
							_active={{ filter: "brightness(90%)" }}
							shadow="md"
							transition="0.2s all"
							h={7}
							py={0}
							px={0}
							w={12}
							onClick={() => {
								setExternalChainInfo((external) => {
									return {
										...external,
										token: {
											amount: tokenBalance.toString(),
											denom: token.denom
										}
									}
								})
							}}
						>
							Max
						</Button>
					</HStack>
				</Flex>
				<NumericFormat
					defaultValue={convertMicroDenomToDenom(tokenBalance, token.decimal).toString()}
					value={convertMicroDenomToDenom(
						externalChainInfo.token?.amount!,
						token.decimal
					).toString()}
					valueIsNumericString
					decimalScale={token.decimal ?? 6}
					allowNegative={false}
					thousandSeparator=","
					allowLeadingZeros={false}
					onValueChange={(values) => {
						const { value } = values

						setExternalChainInfo((external) => {
							return {
								...external,
								token: {
									amount: convertDenomToMicroDenom(value, token.decimal ?? 6)
										.decimalPlaces(0, 1)
										.toString(),
									denom: token.denom
								}
							}
						})
					}}
					customInput={Input}
					variant="unstyled"
					fontSize={{ base: "lg", sm: "24" }}
					fontWeight="bold"
					textAlign="end"
					w="full"
					shadow="md"
					rounded="0.6em"
					color={useColorModeValue("gray.800", "white")}
					px={2}
					py={1}
					placeholder="0"
					// valueIsNumericString
					minH="3rem"
					bg="gray.700"
					_dark={{ _focus: { bg: "gray.800", shadow: "glowSm" } }}
				/>
			</VStack>
			<Button
				onClick={() => handleIbcWithdraw()}
				rounded="1em"
				shadow="md"
				isLoading={isExecutingWithdraw}
				rightIcon={<FaArrowRight />}
				transition="0.3s box-shadow"
				_hover={{ bgGradient: "linear(45deg, brand.1, brand.2)", shadow: "glowMd" }}
				bg="white"
				_dark={{
					_hover: { bgGradient: "linear(45deg, brand.1, brand.2)" },
					bg: "gray.600"
				}}
			>
				Withdraw
			</Button>
		</VStack>
	)
}

export default Withdraw
