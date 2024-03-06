import { Box, Circle, Icon, IconButton, keyframes, Text } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { useGetWins } from "hooks/games/prediction/query/useGetWins"
import { FaTrophy } from "react-icons/fa"

export const pulse = keyframes`
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255,0,100,0.5);
  }

  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(255,0,100,0.2);
  }

  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(0,255,100,0.2;
  }`

export const WinButton = ({ onOpen }: { onOpen: () => void }) => {
	const [wins] = useGetWins()
	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	return (
		<Box pos="relative">
			<IconButton
				_active={{ bg: "gray.800" }}
				_hover={{ bg: "gray.600" }}
				aria-label="Open Wins panel"
				bg="slate.700"
				filter={
					wins && wins.length !== 0
						? "drop-shadow(var(--chakra-colors-yellow-300) 0 0 0.25rem)"
						: ""
				}
				h="3rem"
				icon={
					<Icon
						as={FaTrophy}
						color="yellow.400"
						filter="drop-shadow(0 0 0.3rem var(--chakra-colors-orange-400))"
						h="1.5rem"
						w="1.5rem"
					/>
				}
				isDisabled={!isWalletConnected}
				onClick={onOpen}
				rounded="1em"
				w="3rem"
			/>
			{wins && wins.length !== 0 && (
				<Circle
					_after={{
						animation: `${pulse} infinite 2s linear`,
						bg: "inherit",
						borderRadius: "full",
						content: "''",
						height: "1rem",
						width: "1rem"
					}}
					bg="rgb(255,0,100)"
					left={-2}
					opacity={wins && wins.length !== 0 ? 1 : 0.5}
					pos="absolute"
					top={-1}
				>
					<Text
						fontFamily="number"
						left="0.225rem"
						lineHeight="1.5"
						pos="relative"
						textAlign="center"
						w="full"
						zIndex="999"
					>
						1
					</Text>
				</Circle>
			)}
		</Box>
	)
}
