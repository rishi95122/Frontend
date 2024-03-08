import { Avatar, Button, Flex, HStack, Spacer, Tag, Text, VStack } from "@chakra-ui/react"
import { useFinishedRound } from "hooks/games/prediction/query/useFinishedRound"
import { useCollectWin } from "hooks/games/prediction/tx/useCollectWin"
import { useMemo } from "react"
import { convertMicroDenomToDenom } from "utils/tokens/helpers"
import shortenNumber from "utils/ui/shortenNumber"

export const WonRoundCard = ({ wonRound }: { wonRound: [string, string] }) => {
	const winAmount = useMemo(() => {
		return convertMicroDenomToDenom(wonRound[1], 6)
	}, [wonRound])

	const [finishedRoute] = useFinishedRound({ roundId: wonRound[0] })

	const { mutate: claimWin, isLoading: isClaimingWin } = useCollectWin({
		roundId: wonRound[0]
	})

	return (
		<Flex
			align="center"
			bg="gray.800"
			gap={2}
			h="4rem"
			overflow="hidden"
			pe={2}
			rounded="1em"
			w="full"
		>
			<Tag
				bgGradient="linear(45deg, brand.1, brand.2)"
				color="white"
				fontFamily="heading"
				fontSize="1.5em"
				fontWeight="900"
				h="full"
				letterSpacing={2}
				px={2}
				textAlign="center"
				w="7rem"
			>
				<Text w="full">#{wonRound[0]}</Text>
			</Tag>
			<VStack align="start">
				<Tag
					bg={finishedRoute?.winner === "bull" ? "rgb(134, 244, 84)" : "rgb(255, 106, 106)"}
					color="gray.800"
					shadow={
						finishedRoute?.winner === "bull"
							? "rgba(118, 255, 25, 0.4) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(59, 198, 14) 0px 0px 15px inset"
							: "rgba(255, 73, 73, 0.42) 0px 0px 10px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset, rgba(0, 0, 0, 0.15) 0px -3px 0px inset, rgb(255, 55, 55) 0px 0px 15px inset"
					}
					textAlign="center"
					textTransform="capitalize"
					w="3rem"
				>
					<Text w="full">{finishedRoute?.winner}</Text>
				</Tag>
				<HStack align="center" justify="center">
					<Text color="white" fontSize="sm" lineHeight="0.8">
						You Won:
					</Text>
					<HStack spacing={1}>
						<Text
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontWeight="900"
							lineHeight="0.8"
						>
							{shortenNumber(winAmount, 2)}
						</Text>
						<Avatar h="1.25rem" src="/assets/electron.png" w="1.25rem" />
					</HStack>
				</HStack>
			</VStack>
			<Spacer />
			<Button
				isLoading={isClaimingWin}
				_hover={{ filter: "brightness(110%)" }}
				bg="gray.600"
				color="white"
				onClick={() => claimWin()}
				rounded="1em"
				size="md"
				transition="0.2s all"
			>
				Claim
			</Button>
		</Flex>
	)
}
