import { HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { type ExecuteResult } from "@cosmjs/cosmwasm-stargate"
import { type DeliverTxResponse } from "@cosmjs/stargate"
import { CheckRive } from "components/Assets/CheckRive"
import { HiExternalLink } from "react-icons/hi"
import { IoMdCube } from "react-icons/io"

const SuccessToast = ({
	data,
	txType,
	chainName
}: {
	chainName?: string
	data: DeliverTxResponse | ExecuteResult
	txType: string
}) => {
	return (
		<HStack pe={2} spacing={1}>
			<CheckRive />
			<VStack align="start" h="3rem" justify="center" spacing={2} w="full">
				<Text color="white" fontFamily="heading" fontSize={18} lineHeight="0.9">
					{txType} confirmed.
				</Text>
				<HStack color="white" justify="start">
					<IoMdCube size={18} />
					<Text color="white" fontFamily="body" fontSize={18} lineHeight="0.9">
						{data.height}
					</Text>
				</HStack>
			</VStack>
			<IconButton
				_hover={{ bg: "whiteAlpha.200" }}
				aria-label="Go to Block Explorer"
				as="a"
				href={`https://rpc-falcron.pion-1.ntrn.tech/${chainName ?? "sei%20atlantic%202"}/tx/${
					data.transactionHash
				}`}
				icon={<HiExternalLink />}
				rounded="1.25em"
				size="sm"
				target="_blank"
				variant="ghost"
			/>
		</HStack>
	)
}

export default SuccessToast
