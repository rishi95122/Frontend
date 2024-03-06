import { Avatar, Heading, HStack, Input, Skeleton, VStack } from "@chakra-ui/react"
import { type Token } from "@utils/tokens/tokens"
import truncateAddress from "utils/ui/truncateAddress"

export const ChainDisplay = ({
	token,
	address,
	isWalletConnected,
	type
}: {
	address: string
	isWalletConnected: boolean
	token: Token
	type: "deposit" | "withdraw"
}) => {
	return (
		<VStack w="full">
			<HStack>
				<Heading fontSize="20">{type === "deposit" ? "From" : "To"}</Heading>
				<Heading fontSize="20" textTransform="capitalize">
					{token.chain?.chainName ?? "Unknown Chain"}
				</Heading>
			</HStack>

			<Avatar src={token.logoURI ?? "/assets/unknownToken.svg"} />
			<Skeleton rounded="1.25em" w="full" isLoaded={Boolean(isWalletConnected && address)}>
				<Input
					variant="unstyled"
					fontSize="md"
					fontWeight="bold"
					textAlign="center"
					_hover={{ _disabled: { cursor: "default" } }}
					defaultValue={truncateAddress(address, 4, 6)}
					w="full"
					rounded="1.25em"
					color="gray.800"
					isDisabled
					px={2}
					py={1}
					minH="3rem"
					bg="white"
					shadow="md"
					_dark={{
						_focus: { bg: "gray.800", shadow: "glowMd" },
						bg: "gray.600",
						color: "white"
					}}
					type="text"
					_focus={{
						bg: "offwhite.2",
						border: "none",
						shadow: "md"
					}}
				/>
			</Skeleton>
		</VStack>
	)
}
