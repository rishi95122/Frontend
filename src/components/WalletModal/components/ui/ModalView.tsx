import { type SimpleModalViewType } from "../types"
import { Stack } from "@chakra-ui/react"
import React from "react"

export const SimpleModalView = ({ modalHead, modalContent }: SimpleModalViewType) => {
	return (
		<Stack color="white" flex={1} h="full" spacing={1}>
			{modalHead}
			{modalContent}
		</Stack>
	)
}
