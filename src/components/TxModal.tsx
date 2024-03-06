/* eslint-disable complexity */
import {
	Avatar,
	Button,
	HStack,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Tag,
	Text,
	VStack
} from "@chakra-ui/react"
import { type Coin } from "@cosmjs/proto-signing"
import { cosmwasm } from "@fuzio/sei-rpc"
import { type SignData } from "@fuzio/web3auth"
import { useFetchAllIDOs } from "@hooks/ido/query/useFetchAllIDOs"
import { usePoolList } from "@hooks/pool/query/usePoolList"
import { getTokenInfoFromTokenList } from "@hooks/tokens/query/useTokenInfo"
import { useTokenList } from "@hooks/tokens/query/useTokenList"
import { convertMicroDenomToDenom } from "@utils/tokens/helpers"
import { AuthInfo, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { useEffect, useMemo, useState } from "react"
import { FaCheckCircle, FaGasPump, FaTimesCircle } from "react-icons/fa"

export const TxModal = ({
	isOpen,
	onClose,
	signData,
	signTx,
	rejectTx
}: {
	isOpen: boolean
	onClose: () => void
	rejectTx: () => void
	signData?: SignData
	signTx: () => void
}) => {
	const { MsgExecuteContract } = cosmwasm.wasm.v1
	const [poolList] = usePoolList()
	const [tokenList] = useTokenList()
	const [idoContractList] = useFetchAllIDOs()

	const swapContractList = useMemo(() => {
		if (!poolList) return []

		const swapContracts = poolList?.poolsWithAPR.map((pool) => {
			return pool.pool.swapAddress
		})

		return swapContracts
	}, [poolList])

	const predictionContractList = useMemo(() => {
		return ["sei1wtm234jw7ewdq2aqs0r7eq5t4vhwknpjdd0r7g6fdu4aj4wfedlq8w6pua"]
	}, [])

	const [txJson, setTxJson] = useState<
		Array<{
			"@type": string
			contract: string
			funds: Coin[]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			msg: any
			sender: string
		}>
	>()
	const [txType, setTxType] = useState<string>("Token Swap")
	const [authInfo, setAuthInfo] = useState<AuthInfo>()

	useEffect(() => {
		if (signData?.type === "direct") {
			const decodedTxBody = TxBody.decode(signData?.value?.bodyBytes)
			const decodedMessages = decodedTxBody.messages.map((message) => {
				const decoded = MsgExecuteContract.decode(message.value)
				const decodedMessageString = Buffer.from(decoded.msg).toString()
				const decodedMessage = JSON.parse(decodedMessageString)

				const test = {
					...decoded,
					msg: decodedMessage
				}

				return {
					"@type": message.typeUrl,
					...test
				}
			})

			const decodedAuthInfo = AuthInfo.decode(signData?.value.authInfoBytes)

			setAuthInfo(decodedAuthInfo)

			setTxJson(decodedMessages)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signData])

	useEffect(() => {
		if (!txJson) return
		// eslint-disable-next-line no-console
		console.log(txJson)
		if (swapContractList.includes(txJson[0].contract)) {
			switch (Object.keys(txJson[0].msg)[0]) {
				case "swap":
					setTxType("Token Swap")
					break
				case "add_liquidity":
					setTxType("Liquidity Provision")
					break
				default:
					break
			}
		}

		if (predictionContractList.includes(txJson[0].contract)) {
			setTxType("Prediction")
		}

		if (idoContractList?.includes(txJson[0].contract)) {
			setTxType("IDO")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [txJson])

	// eslint-disable-next-line consistent-return
	const JSONInterpreter = useMemo(() => {
		if (!txJson)
			return (
				<VStack align="start" bg="gray.900" h="15rem" rounded="1.25em" shadow="none" w="full" />
			)
		if (swapContractList.includes(txJson[0].contract)) {
			const pool = poolList?.poolsWithAPR.find(
				(currentPool) => currentPool.pool.swapAddress === txJson[0].contract
			)

			const tokenAInfo = getTokenInfoFromTokenList(
				pool?.pool.liquidity.token1.denom!,
				tokenList ?? []
			)

			const tokenBInfo = getTokenInfoFromTokenList(
				pool?.pool.liquidity.token2.denom!,
				tokenList ?? []
			)

			switch (Object.keys(txJson[0].msg)[0]) {
				case "swap":
					return (
						<VStack
							align="start"
							bg="gray.900"
							h="15rem"
							px={2}
							py={2}
							rounded="1.25em"
							shadow="none"
							w="full"
						>
							<HStack align="center" spacing={1} w="full">
								<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
									Input
								</Tag>
								<HStack align="center" flex={1} justify="end" spacing={1}>
									<Text color="white" flex={1} fontFamily="heading" textAlign="end">
										{convertMicroDenomToDenom(
											txJson[0].msg.swap.input_amount,
											txJson[0].msg.swap.input_token === "token1"
												? tokenAInfo?.decimal ?? 6
												: tokenBInfo?.decimal ?? 6
										).toFixed(2)}
									</Text>
									<Avatar
										size="xs"
										src={
											txJson[0].msg.swap.input_token === "token1"
												? tokenAInfo?.logoURI ?? "/assets/unknownToken.svg"
												: tokenBInfo?.logoURI ?? "/assets/unknownToken.svg"
										}
									/>
								</HStack>
							</HStack>
							<HStack align="center" spacing={1} w="full">
								<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
									Output
								</Tag>
								<HStack align="center" flex={1} justify="end" spacing={1}>
									<Text color="white" flex={1} fontFamily="heading" textAlign="end">
										{convertMicroDenomToDenom(
											txJson[0].msg.swap.min_output,
											txJson[0].msg.swap.input_token === "token1"
												? tokenBInfo?.decimal ?? 6
												: tokenAInfo?.decimal ?? 6
										).toFixed(2)}
									</Text>
									<Avatar
										size="xs"
										src={
											txJson[0].msg.swap.input_token === "token1"
												? tokenAInfo?.logoURI ?? "/assets/unknownToken.svg"
												: tokenBInfo?.logoURI ?? "/assets/unknownToken.svg"
										}
									/>
								</HStack>
							</HStack>
						</VStack>
					)
				case "add_liquidity":
					return (
						<VStack
							align="start"
							bg="gray.900"
							h="15rem"
							px={2}
							py={2}
							rounded="1.25em"
							shadow="none"
							w="full"
						>
							<HStack align="center" spacing={1} w="full">
								<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
									Token #1
								</Tag>
								<HStack align="center" flex={1} justify="end" spacing={1}>
									<Text color="white" flex={1} fontFamily="heading" textAlign="end">
										{convertMicroDenomToDenom(
											txJson[0].msg.add_liquidity.token1_amount,
											tokenAInfo?.decimal ?? 6
										).toFixed(2)}
									</Text>
									<Avatar size="xs" src={tokenAInfo?.logoURI} />
								</HStack>
							</HStack>
							<HStack align="center" spacing={1} w="full">
								<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
									Token #2
								</Tag>
								<HStack align="center" flex={1} justify="end" spacing={1}>
									<Text color="white" flex={1} fontFamily="heading" textAlign="end">
										{convertMicroDenomToDenom(
											txJson[0].msg.add_liquidity.max_token2,
											tokenBInfo?.decimal ?? 6
										).toFixed(2)}
									</Text>
									<Avatar size="xs" src={tokenBInfo?.logoURI} />
								</HStack>
							</HStack>
						</VStack>
					)
				default:
					break
			}
		} else if (predictionContractList.includes(txJson[0].contract)) {
			return (
				<VStack align="start" bg="gray.900" rounded="1.25em" shadow="none" w="full">
					<HStack align="center" spacing={1} w="full">
						<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
							Bet Amount
						</Tag>
						<HStack align="center" flex={1} justify="end" spacing={1}>
							<Text color="white" flex={1} fontFamily="heading">
								{convertMicroDenomToDenom(0, 6).toFixed(2)}
							</Text>
							{/* <Avatar
								size="xs"
								src={
									`/assets/listedTokens/${
										txJson[0].msg.swap.input_token === "token1"
											? pool?.pool.liquidity.token1.denom!.replaceAll("/", "")
											: pool?.pool.liquidity.token2.denom!.replaceAll("/", "")
									}.png` ?? ""
								}
							/> */}
						</HStack>
					</HStack>
				</VStack>
			)
		} else if (idoContractList?.includes(txJson[0].contract)) {
			return (
				<VStack align="start" bg="gray.900" rounded="1.25em" shadow="none" w="full">
					<HStack align="center" spacing={1} w="full">
						<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
							Bet Amount
						</Tag>
						<HStack align="center" flex={1} justify="end" spacing={1}>
							<Text color="white" flex={1} fontFamily="heading">
								{convertMicroDenomToDenom(0, 6).toFixed(2)}
							</Text>
							{/* <Avatar
                size="xs"
                src={
                  `/assets/listedTokens/${
                    txJson[0].msg.swap.input_token === "token1"
                      ? pool?.pool.liquidity.token1.denom!.replace(/\//g, "")
                      : pool?.pool.liquidity.token2.denom!.replace(/\//g, "")
                  }.png` ?? ""
                }
              /> */}
						</HStack>
					</HStack>
				</VStack>
			)
		} else {
			return (
				<VStack align="start" bg="gray.900" rounded="1.25em" shadow="none" w="full">
					<HStack align="center" spacing={1} w="full">
						<Tag colorScheme="cyan" rounded="0.8em" variant="subtle">
							Bet Amount
						</Tag>
						<HStack align="center" flex={1} justify="end" spacing={1}>
							<Text color="white" flex={1} fontFamily="heading">
								{convertMicroDenomToDenom(0, 6).toFixed(2)}
							</Text>
							{/* <Avatar
                size="xs"
                src={
                  `/assets/listedTokens/${
                    txJson[0].msg.swap.input_token === "token1"
                      ? pool?.pool.liquidity.token1.denom!.replace(/\//g, "")
                      : pool?.pool.liquidity.token2.denom!.replace(/\//g, "")
                  }.png` ?? ""
                }
              /> */}
						</HStack>
					</HStack>
				</VStack>
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [txJson])

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
			<ModalOverlay backdropFilter="blur(70px)" bg="transparent" />
			<ModalContent rounded="1.25rem" shadow="md">
				<ModalHeader>{txType}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack w="full">
						{JSONInterpreter}
						<HStack
							align="center"
							bg="gray.900"
							justify="start"
							overflow="hidden"
							pe={2}
							rounded="1.25em"
							shadow="none"
							w="full"
						>
							<Tag
								colorScheme="cyan"
								fontFamily="heading"
								gap={1}
								py={4}
								rounded="1.25em"
								variant="subtle"
							>
								<Icon as={FaGasPump} h="1rem" w="1rem" />
								Transaction Fee
							</Tag>
							<HStack align="center" flex={1} spacing={1} w="full">
								<VStack align="start" justify="center" spacing={0.5} w="full">
									<Text
										color="white"
										flex={1}
										fontFamily="heading"
										lineHeight={1}
										textAlign="end"
										w="full"
									>
										{convertMicroDenomToDenom(authInfo?.fee?.amount[0].amount ?? "0", 6).toFixed(2)}
									</Text>
									<Text
										color="offwhite.3"
										flex={1}
										fontFamily="body"
										fontSize="sm"
										fontWeight="500"
										lineHeight={1}
										textAlign="end"
										w="full"
									>
										$
										{convertMicroDenomToDenom(authInfo?.fee?.amount[0].amount ?? "0", 6).toFixed(2)}
									</Text>
								</VStack>
								<Avatar size="sm" src={"/assets/tokens/ntrn.png" ?? ""} />
							</HStack>
						</HStack>
					</VStack>
				</ModalBody>
				<ModalFooter gap={4}>
					<Button
						_active={{ filter: "brightness(110%)" }}
						_hover={{ filter: "brightness(120%)" }}
						bg="rgb(255, 106, 106)"
						color="gray.800"
						fontFamily="heading"
						leftIcon={<FaTimesCircle />}
						onClick={rejectTx}
						rounded="1em"
						shadow="rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset;"
						transition="0.2s all"
						w="full"
					>
						Cancel
					</Button>
					<Button
						_active={{ filter: "brightness(110%)" }}
						_hover={{ filter: "brightness(120%)" }}
						bg="rgb(14, 255, 100)"
						color="gray.800"
						fontFamily="heading"
						leftIcon={<FaCheckCircle />}
						onClick={signTx}
						rounded="0.8em"
						shadow="rgba(18, 225, 95, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(29, 198, 84) 0px 0px 15px inset"
						transition="0.2s all"
						w="full"
					>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
