import { Box, useRadio } from "@chakra-ui/react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BondButton = (props: any) => {
	const { getInputProps, getCheckboxProps, state } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				_checked={{
					bgGradient: "linear(45deg, brand.1, brand.2)",
					color: "white",
					filter: "drop-shadow(0px 0px 2px rgba(2,226,150, 1))"
				}}
				_dark={{ bg: "gray.800" }}
				_focus={{
					boxShadow: "glowMd"
				}}
				_hover={{
					filter:
						state.isChecked || props.isDisabled
							? ""
							: "brightness(110%) drop-shadow(0px 0px 3px rgba(2,226,150, 1))"
				}}
				bg="gray.800"
				borderRadius="1.25em"
				color="white"
				cursor={props.isDisabled ? "not-allowed" : "pointer"}
				opacity={props.isDisabled ? 0.3 : 1}
				px={5}
				py={3}
				rounded="1.25em"
				shadow="md"
				transition="0.2s all"
			>
				{props.children}
			</Box>
		</Box>
	)
}
