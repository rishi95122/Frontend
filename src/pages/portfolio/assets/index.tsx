/* eslint-disable id-length */
/* eslint-disable react/no-unstable-nested-components */
import { IBCModal } from "./components/IBCModal"
import { PortfolioTable } from "./components/PortfolioTable"
import {
	Button,
	Flex,
	HStack,
	Icon,
	IconButton,
	Skeleton,
	Text,
	useBreakpoint,
	useDisclosure,
	VStack
} from "@chakra-ui/react"
import { MemoizedAvatar } from "@components/MemoizedAvatar"
import { useChain } from "@cosmos-kit/react"
import { useMultipleTokenBalance } from "@hooks/tokens/query/useTokenBalance"
import { createColumnHelper } from "@tanstack/react-table"
import { type TokenWithBalance } from "@utils/tokens/tokens"
import { useLocalStorageState } from "ahooks"
import { motion } from "framer-motion"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { PortfolioSummary } from "pages/portfolio/assets/components/PortfolioSummary"
import { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { FaArrowDown, FaArrowUp, FaRegStar, FaStar } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { externalChainState, externalTokenState, showZeroBalanceAssetsState } from "state/UIState"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
// import { IBCModal } from "./components/IBCModal"
import shortenNumber from "utils/ui/shortenNumber"
// import { useTokenDollarPrice } from "hooks/swap/useTokenDollarPrice"
// import { BigNumber } from "bignumber.js"
// import { useTokenDollarPriceTFM } from "hooks/swap/useTokenPriceTFM"

const MyAssets = () => {
	const breakpoint = useBreakpoint({ ssr: false })

	const [tokenList] = useTokenList()
	const [assets] = useMultipleTokenBalance(tokenList)

	const showZeroBalance = useRecoilValue(showZeroBalanceAssetsState)
	const setExternalChain = useSetRecoilState(externalChainState)
	const [externalToken, setExternalToken] = useRecoilState(externalTokenState)

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const [favourites, setFavourites] = useLocalStorageState<string[]>("favoriteTokens", {
		defaultValue: [""]
	})

	const assetsToShow = useMemo(() => {
		if (showZeroBalance) {
			return assets
		} else {
			return assets?.filter((asset) => !asset.balance.isZero())
		}
	}, [assets, showZeroBalance])

	const addToFavourites = (token: string) => {
		// eslint-disable-next-line no-negated-condition
		if (!favourites?.includes(token)) {
			setFavourites([...favourites!, token])
		} else {
			setFavourites(favourites!.filter((item) => item !== token))
		}
	}

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [modalType, setModalType] = useState<"deposit" | "withdraw">("deposit")

	const columnHelper = createColumnHelper<TokenWithBalance>()
	const columns = useMemo(() => {
		return [
			columnHelper.accessor("symbol", {
				cell: (info) => {
					return (
						<HStack>
							{breakpoint !== "base" && breakpoint !== "sm" && (
								<IconButton
									_dark={{
										_hover: {
											bg: "gray.600"
										},
										color: favourites?.includes(info.row.original.denom) ? "yellow.600" : "white"
									}}
									_hover={{ bg: "gray.600" }}
									aria-label="add/remove favourite token"
									bg="transparent"
									color={favourites?.includes(info.row.original.denom) ? "yellow.400" : "gray.800"}
									icon={
										favourites?.includes(info.row.original.denom) ? (
											<Icon as={FaStar} h="1.5rem" w="1.5rem" />
										) : (
											<Icon as={FaRegStar} h="1.5rem" w="1.5rem" />
										)
									}
									onClick={() => addToFavourites(info.row.original.denom)}
									rounded="full"
									size="sm"
								/>
							)}
							<HStack>
								<Skeleton isLoaded={Boolean(info.row.original.logoURI)} rounded="full">
									<MemoizedAvatar
										border="none"
										src={info.row.original.logoURI ?? "/assets/electron.png"}
										blurHash={info.row.original.logoHash}
										w="3rem"
										h="3rem"
									/>
								</Skeleton>
								<Skeleton isLoaded={Boolean(info.row.original.symbol)} rounded="full">
									<VStack align="start" minW="6rem" spacing={{ base: 0, md: 2 }}>
										<Text
											fontFamily="heading"
											fontSize={{ base: "md", sm: "18" }}
											fontWeight="400"
											lineHeight={1}
											textAlign="start"
										>
											{info.row.original.symbol}
										</Text>
										<Text
											lineHeight={1}
											fontSize={{ base: "0.9em", sm: "14" }}
											textAlign="start"
											fontWeight="400"
											fontFamily="body"
										>
											{info.row.original.fullName}
										</Text>
									</VStack>
								</Skeleton>
							</HStack>
						</HStack>
					)
				},
				header: "Asset",
				id: "tokens",
				sortingFn: (a, b, columnId) => {
					return String(a.getValue(columnId)).toLowerCase() <
						String(b.getValue(columnId)).toLowerCase()
						? -1
						: String(a.getValue(columnId)).toLowerCase() >
						  String(b.getValue(columnId)).toLowerCase()
						? 1
						: 0
				}
			}),
			columnHelper.accessor("balance", {
				cell: (info) => {
					return (
						<Skeleton isLoaded={Boolean(info)} rounded="full">
							<VStack align="end" spacing={0}>
								<Text fontFamily="heading">
									{`${shortenNumber(
										convertMicroDenomToDenom(
											info.row.original.balance,
											info.row.original.decimal ?? 6
										),
										2
									)}`}
								</Text>
								{/* <Text
                  fontSize={{ base: "md", sm: "sm" }}
                  textAlign="end"
                  wordBreak="break-word"
                  color="offwhite.3"
                  _dark={{ color: "offwhite.3" }}
                >
                  {Number(info.getValue() ?? 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2
                  }) ?? 0}
                </Text> */}
							</VStack>
						</Skeleton>
					)
				},
				header: "Balance",
				id: "tokenBalance",
				meta: {
					isNumeric: true
				}
			}),
			columnHelper.display({
				cell: (info) => {
					if (!info.row.original.isIBCCoin || !isWalletConnected) {
						return null
					}

					if (breakpoint === "base" || breakpoint === "sm") {
						return (
							<Flex justify="center">
								<IconButton
									onClick={() => {
										setModalType("deposit")
										setExternalChain(info.row.original.chain?.chainId!)
										setExternalToken(info.row.original)
										onOpen()
									}}
									bg="white"
									color="gray.800"
									bgGradient="linear(45deg, brand.1, brand.2)"
									rounded="full"
									aria-label="Open Actions Modal"
									icon={<HiExternalLink size="20" />}
								/>
							</Flex>
						)
					}

					if (info.row.original.chain?.chainId.includes("worm")) {
						return (
							<Button
								_hover={{ filter: "brightness(120%)" }}
								bg="white"
								color="gray.800"
								bgGradient="linear(45deg, brand.1, brand.2)"
								shadow="md"
								as="a"
								href="https://ibc.fun/"
								target="_blank"
								_disabled={{
									_hover: { bg: "white" },
									cursor: "not-allowed",
									opacity: 0.5
								}}
								_dark={{
									_disabled: {
										_hover: { bg: "gray.600" },
										cursor: "not-allowed",
										opacity: 0.5
									},
									_hover: {
										filter: "brightness(120%)"
									},
									bg: "gray.600",
									bgGradient: "linear(45deg, brand.1, brand.2)"
								}}
								rounded="1em"
								size="sm"
								leftIcon={<HiExternalLink size="18" />}
							>
								Bridge
							</Button>
						)
					}

					return (
						<HStack>
							<Button
								_hover={{ filter: "brightness(120%)" }}
								bg="white"
								color="gray.800"
								bgGradient="linear(45deg, brand.1, brand.2)"
								shadow="md"
								_disabled={{
									_hover: { bg: "white" },
									cursor: "not-allowed",
									opacity: 0.5
								}}
								_dark={{
									_disabled: {
										_hover: { bg: "gray.600" },
										cursor: "not-allowed",
										opacity: 0.5
									},
									_hover: {
										filter: "brightness(120%)"
									},
									bg: "gray.600",
									bgGradient: "linear(45deg, brand.1, brand.2)"
								}}
								rounded="1em"
								size="sm"
								leftIcon={<FaArrowDown />}
								onClick={() => {
									setModalType("deposit")
									setExternalChain(info.row.original.chain?.chainId!)
									setExternalToken(info.row.original)
									onOpen()
								}}
							>
								Deposit
							</Button>
							<Button
								size="sm"
								_hover={{ filter: "brightness(120%)" }}
								bg="white"
								color="gray.800"
								bgGradient="linear(45deg, brand.1, brand.2)"
								shadow="md"
								_disabled={{
									_hover: { bg: "white" },
									cursor: "not-allowed",
									opacity: 0.5
								}}
								_dark={{
									_disabled: {
										_hover: { bg: "gray.600" },
										cursor: "not-allowed",
										opacity: 0.5
									},
									_hover: {
										filter: "brightness(120%)"
									},
									bg: "gray.600",
									bgGradient: "linear(45deg, brand.1, brand.2)"
								}}
								rounded="1em"
								leftIcon={<FaArrowUp />}
								onClick={() => {
									setModalType("withdraw")
									setExternalChain(info.row.original.chain?.chainId!)
									setExternalToken(info.row.original)
									onOpen()
								}}
							>
								Withdraw
							</Button>
						</HStack>
					)
				},
				header: "Actions",
				id: "actions"
			})
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assetsToShow, favourites, breakpoint])

	return (
		<Flex
			animate={{ opacity: 1 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={{ base: 5, md: 3 }}
			initial={{ opacity: 0 }}
			pos="relative"
			w="full"
			p={3}
			align="center"
			justify="start"
		>
			<Helmet>
				<title>My Assets | Electron</title>
			</Helmet>
			<PortfolioSummary />
			<PortfolioTable columns={columns} data={assetsToShow ?? []} favourites={favourites ?? []} />
			{isWalletConnected && externalToken && (
				<IBCModal type={modalType} isOpen={isOpen} onClose={onClose} token={externalToken} />
			)}
		</Flex>
	)
}

export default MyAssets
