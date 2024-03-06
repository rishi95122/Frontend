import { ButtonText } from "./components/ButtonText"
import { FromToken } from "./components/FromToken"
import { SettingsButton } from "./components/SettingsButton"
import { ToToken } from "./components/ToToken"
import { Button, Flex, Icon } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { initialBTCToken, initialNeutronToken } from "@utils/tokens/helpers"
import { type Token } from "@utils/tokens/tokens"
import { SwapIcon } from "components/Assets/SwapIcon"
import { AnimatePresence, motion } from "framer-motion"
import { useTokenSwap } from "hooks/swap/tx/useTokenSwap"
import { useTokenList } from "hooks/tokens/query/useTokenList"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useSearchParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { tokenSwapState } from "state/swapState"
import { marketAdvancedModeState } from "state/UIState"
import MotionFlex from "theme/motion/components/MotionFlex"

const Swap = () => {
	const { isWalletConnected, openView } = useChain(import.meta.env.VITE_NEUTRONNETWORK)
	const [tokenList] = useTokenList()
	const [searchParameters] = useSearchParams()
	const [tokenSwapInfo, setSwapInfo] = useRecoilState(tokenSwapState)

	// const { onCopy, setValue } = useClipboard(
	//   fromToken?.contract === "" ? from.token : fromToken?.contract!
	// )

	const { mutate: handleSwap } = useTokenSwap()

	useEffect(() => {
		let fromToken: Token = initialNeutronToken
		let toToken: Token = initialBTCToken

		if (searchParameters) {
			for (const entry of searchParameters.entries()) {
				const [parameter, value] = entry
				if (parameter === "from" && tokenList) {
					fromToken = tokenList.find((token) => token.symbol === value)!
				}

				if (parameter === "to" && tokenList) {
					toToken = tokenList.find((token) => token.symbol === value)!
				}
			}
		}

		setSwapInfo((currentTokenSwapInfo) => {
			return {
				from: { ...currentTokenSwapInfo?.from!, token: fromToken },
				to: { ...currentTokenSwapInfo?.to!, token: toToken }
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParameters])

	const advancedMode = useRecoilValue(marketAdvancedModeState)
	const [isActive, setIsActive] = useState(false)

	return (
		<Flex
			align="center"
			animate={{ opacity: 1 }}
			as={motion.main}
			direction="column"
			exit={{ opacity: 0 }}
			gap={3}
			initial={{ opacity: 0 }}
			justify="center"
			overflow="hidden"
			pos="relative"
			py={0}
			w="full"
		>
			<Helmet>
				<title>Swap | Electron</title>
			</Helmet>
			<AnimatePresence mode="wait">
				<MotionFlex
					alignItems="start"
					as={motion.div}
					flexDirection={{ base: "column", md: "row" }}
					gap={4}
					justifyContent="center"
					layout
					maxW={{ base: "md", md: advancedMode ? "6xl" : "3xl" }}
					px={4}
					transition={{ bounce: 0, type: "spring" }}
					w="full"
				>
					{/* {advancedMode && (
            <MotionFlex
              layout
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", bounce: 0 }}
              overflow="hidden"
              w="70%"
              h="full"
              bg="white"
              _dark={{ bgGradient: "linear(to-b, gray.600, gray.800)" }}
              shadow="md"
              rounded="1.25em"
              flexDirection="column"
            >
              <HStack px={3} pt={2}>
                <AvatarGroup spacing={-3} size="md" max={2}>
                  <Avatar
                    border="0"
                    name={TokenFullName[from.token]}
                    src={
                      `/assets/listedTokens/${from?.token.replace(
                        /\//g,
                        ""
                      )}.png` ?? "/assets/unknownToken.svg"
                    }
                  />
                  <Avatar
                    border="0"
                    backgroundBlendMode={"soft-light"}
                    backdropFilter="blur(20px) saturate(140%)"
                    bg="rgba(255,255,255,0.05)"
                    name={TokenFullName[to.token]}
                    src={`/assets/listedTokens/${to?.token.replace(
                      /\//g,
                      ""
                    )}.png`}
                  />
                </AvatarGroup>
                <Heading fontSize="xl">
                  {TokenFullName[from.token]} / {TokenFullName[to.token]}
                </Heading>
              </HStack>
              <HStack px={3} pb={2} pt={1} align="center">
                <Text fontWeight="900" fontSize="3xl">
                  0.008
                </Text>
                <Text fontSize="xl">
                  {TokenFullName[from.token]} / {TokenFullName[to.token]}
                </Text>
                <Text color="green.300">+0.0004 (+8.56%)</Text>
              </HStack>
              <SwapChart data={priceDataMock} />
            </MotionFlex>
          )} */}

					<MotionFlex
						as={motion.div}
						flexDirection="column"
						gap={2}
						layout
						px={0}
						transition={{ bounce: 0, type: "spring" }}
						w={{ base: "full", md: "lg" }}
					>
						<Flex alignSelf="end" as={motion.div} gap={1}>
							<SettingsButton />
						</Flex>
						<Flex align="center" direction="column" gap={3} pos="relative" zIndex={1}>
							<Button
								_hover={{ bg: "gray.500", shadow: "glowMd" }}
								animate={{
									rotate: isActive ? 360 : 0
								}}
								aria-label="Switch Input and Output token"
								as={motion.button}
								bg="gray.700"
								color="white"
								shadow="md"
								h="3rem"
								onClick={() => {
									setIsActive(!isActive)
									setSwapInfo(({ from: currentFrom, to: currentTo }) => {
										return {
											from: { ...currentTo, amount: "0" },
											to: { ...currentFrom, amount: "0" }
										}
									})
								}}
								pos="absolute"
								rounded="full"
								w="3rem"
								zIndex={2}
								top="47%"
								// @ts-expect-error types
								transition={{ bounce: 0.2, type: "tween" }}
							>
								<Icon as={SwapIcon} h="2rem" w="2rem" />
							</Button>
							<FromToken />
							<ToToken />
						</Flex>
						{/* {advancedMode && <Rate tokenInputValue={from.amount} />} */}
						<Button
							_active={{
								shadow: "glowMd"
							}}
							_dark={{
								_disabled: {
									bg: "whiteAlpha.500",
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
							_hover={{
								backgroundSize: "120% 120%",
								shadow: "glowMd"
							}}
							bgGradient="linear(45deg, brand.1, brand.2)"
							bgSize="100%"
							h={{ base: 12, md: "3rem" }}
							isDisabled={
								isWalletConnected ? Number(tokenSwapInfo?.from.amount) < 0.000_001 : false
							}
							mt={3}
							onClick={() => {
								if (isWalletConnected) {
									handleSwap()
								} else {
									openView()
								}
							}}
							rounded="1.25em"
							shadow="md"
							transition="0.5s all"
							w="full"
						>
							<ButtonText from={tokenSwapInfo.from} isWalletConnected={isWalletConnected} />
						</Button>
					</MotionFlex>
				</MotionFlex>
			</AnimatePresence>
		</Flex>
	)
}

export default Swap
