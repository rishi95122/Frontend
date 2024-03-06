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
import dayjs from "dayjs"
import { useIBCDeposit } from "hooks/ibc/tx/useIBCDeposit"
import { useExternalBalance } from "hooks/tokens/query/useExternalBalance"
import Long from "long"
import { useEffect } from "react"
import { FaArrowRight } from "react-icons/fa"
import { NumericFormat } from "react-number-format"
import { useRecoilState, useRecoilValue } from "recoil"
import { externalChainInfoState, neutronTokenState } from "state/UIState"
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "utils/tokens/helpers"
import { type Token } from "utils/tokens/tokens"

const Deposit = ({ token }: { token: Token }) => {
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
	const [tokenBalance] = useExternalBalance(token.chain?.localDenom!)
	const [externalChainInfo, setExternalChainInfo] = useRecoilState(externalChainInfoState)
	const neutronToken = useRecoilValue(neutronTokenState)

	useEffect(() => {
		if (!isWalletConnected) {
			void connect()
		}

		setExternalChainInfo({
			receiver: address!,
			sender: externalAddress!,
			sourceChannel: token.chain?.ibcChannels?.deposit_channel!,
			sourcePort: token.chain?.ibcChannels?.port_id!,
			timeoutHeight: { revisionHeight: Long.fromNumber(0), revisionNumber: Long.fromNumber(4) },
			timeoutTimestamp: Long.fromNumber(dayjs().add(10, "minutes").unix() * 1_000_000_000),
			token: {
				amount: "0",
				denom: token.chain?.localDenom!
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, externalAddress, address])

	const { mutate: handleIbcDeposit, isLoading: isExecutingDeposit } = useIBCDeposit()

	return (
		<VStack align="end">
			{/* {token. === TokenType.HUAHUA && (
				<Alert status="warning" mb={6} rounded="1.25em">
					<AlertIcon />
					Chihuahua needs a higher gas fee than estimateable. Please increase your gas by 10,000
					before trying to deposit.
				</Alert>
			)} */}

			<HStack w="full" justify="space-between" mb={6}>
				<ChainDisplay
					address={externalAddress!}
					token={token}
					type="deposit"
					isWalletConnected={isWalletConnected}
				/>
				<ChainDisplay
					address={address!}
					token={neutronToken}
					type="withdraw"
					isWalletConnected={isNeutronConnected}
				/>
			</HStack>
			<VStack align="start" w="full" mb={6}>
				<Flex w="full" justify="end" align="center" gap={2}>
					<Text fontFamily="heading" fontSize={{ base: "0.9em", md: "md" }} fontWeight="normal">
						Available on {token.chain?.chainPrettyName}
					</Text>
					<Text
						bgGradient="linear(45deg,brand.1,brand.2)"
						fontSize={{ base: "0.9em", md: "md" }}
						fontWeight="900"
						bgClip="text"
					>
						{convertMicroDenomToDenom(tokenBalance, token.decimal ?? 6)
							.decimalPlaces(token.decimal)
							.toFixed(2)}
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
					value={
						convertMicroDenomToDenom(externalChainInfo.token?.amount!, token.decimal).toString() ??
						0
					}
					valueIsNumericString
					decimalScale={token.decimal}
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
				onClick={() => handleIbcDeposit()}
				rounded="1em"
				transition="0.3s box-shadow"
				shadow="md"
				isLoading={isExecutingDeposit}
				rightIcon={<FaArrowRight />}
				_hover={{ bgGradient: "linear(45deg, brand.1, brand.2)", shadow: "glowMd" }}
				bg="white"
				_dark={{
					_hover: { bgGradient: "linear(45deg, brand.1, brand.2)" },
					bg: "gray.600"
				}}
			>
				Deposit
			</Button>
		</VStack>
	)
}

export default Deposit
