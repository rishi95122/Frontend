/* eslint-disable react/jsx-key */
import { CreateIDOStepper } from "./CreateIDOStepper"
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Textarea
} from "@chakra-ui/react"
import { type InstantiateMsg } from "@fuzio/contracts/types/FuzioNativeIDO.types"
import { useCreateIDO } from "hooks/ido/tx/useCreateIDO"
import gregorian from "react-date-object/calendars/gregorian"
import en from "react-date-object/locales/gregorian_en"
import { useForm } from "react-hook-form"
import DatePicker from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker"
import { useRecoilState } from "recoil"
import { idoStepperState } from "state/UIState"

export const CreateIDOForm = () => {
	const { mutate: handleCreateIDO, isLoading: isExecutingIDOCreation } = useCreateIDO()

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm<InstantiateMsg>()

	const onSubmit = () => {
		handleCreateIDO()
	}

	const [idoActiveStep, setIDOActiveStep] = useRecoilState(idoStepperState)

	return (
		<Flex bg="gray.700" flexDirection="column" gap={4} px={8} py={4} rounded="2xl">
			<CreateIDOStepper />
			<form onSubmit={handleSubmit(onSubmit)}>
				{idoActiveStep === 1 && (
					<>
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.full_name)}>
							<FormLabel htmlFor="name">Project Full Name</FormLabel>
							<Input
								id="ido_page.product.full_name"
								placeholder="Fuziø Network"
								{...register("ido_page.product.full_name", {
									maxLength: { message: "Maximum length is 24", value: 24 },
									minLength: {
										message: "Minimum length should be 4",
										value: 4
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.full_name &&
									errors.ido_page?.product?.full_name.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.short_desc)}>
							<FormLabel htmlFor="name">Project Short Description</FormLabel>
							<Input
								id="ido_page.product.short_desc"
								placeholder="Fuziø Network is the wildest DeFi jungle adeventure!"
								{...register("ido_page.product.short_desc", {
									maxLength: { message: "Maximum length is 24", value: 24 },
									minLength: {
										message: "Minimum length should be 4",
										value: 4
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.short_desc &&
									errors.ido_page?.product?.short_desc.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.logo)}>
							<FormLabel htmlFor="name">Project Logo URL</FormLabel>
							<Input
								id="ido_page.product.logo"
								placeholder="https://electron.network/linkToImage.png"
								{...register("ido_page.product.logo", {
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.logo &&
									errors.ido_page?.product?.logo.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.token_symbol)}>
							<FormLabel htmlFor="name">Token Symbol</FormLabel>
							<Input
								id="ido_page.product.token_symbol"
								placeholder="$UNKNOWN"
								{...register("ido_page.product.token_symbol", {
									maxLength: { message: "Maximum length is 6", value: 6 },
									minLength: {
										message: "Minimum length should be 4",
										value: 3
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.token_symbol &&
									errors.ido_page?.product?.token_symbol.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<HStack align="center" justify="end" w="full">
							<Button
								colorScheme="teal"
								isLoading={isSubmitting}
								mt={4}
								onClick={() => {
									setIDOActiveStep(idoActiveStep + 1)
								}}
							>
								Next
							</Button>
						</HStack>
					</>
				)}
				{idoActiveStep === 2 && (
					<Flex flexDir="column" w="full">
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.long_desc)}>
							<FormLabel htmlFor="name">Product Long Description</FormLabel>
							<Textarea
								id="ido_page.product.long_desc"
								placeholder="Fuziø Network is the wildest DeFi jungle you will ever get to see!"
								{...register("ido_page.product.long_desc", {
									maxLength: { message: "Maximum length is 240", value: 240 },
									minLength: {
										message: "Minimum length should be 4",
										value: 4
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.long_desc &&
									errors.ido_page?.product?.long_desc.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.ido_page?.product?.header)}>
							<FormLabel htmlFor="name">Product Header</FormLabel>
							<Input
								id="ido_page.product.header"
								placeholder="Fuziø Network is the future of DeFi & GameFi"
								{...register("ido_page.product.header", {
									maxLength: { message: "Maximum length is 64", value: 64 },
									minLength: {
										message: "Minimum length should be 1",
										value: 1
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>
								{errors.ido_page?.product?.header &&
									errors.ido_page?.product?.header.message?.toString()}
							</FormErrorMessage>
						</FormControl>
						<HStack align="center" justify="end" w="full">
							<Button
								colorScheme="teal"
								isLoading={isSubmitting}
								onClick={() => {
									setIDOActiveStep(idoActiveStep - 1)
								}}
							>
								Back
							</Button>
							<Button
								colorScheme="teal"
								isLoading={isSubmitting}
								onClick={() => {
									setIDOActiveStep(idoActiveStep + 1)
								}}
							>
								Next
							</Button>
						</HStack>
					</Flex>
				)}
				{idoActiveStep === 3 && (
					<>
						<FormControl isInvalid={Boolean(errors.claim_start)} w="full">
							<FormLabel htmlFor="name">Token Claim Date</FormLabel>
							<Input
								as={DatePicker}
								calendar={gregorian}
								format="DD/MM/YY, HH:mm:ss"
								locale={en}
								placeholder="13/37/23, 13:37:00"
								w="full"
								plugins={[<TimePicker position="bottom" />]}
								// onFocusedDateChange={(focusedDate, clickedDate) =>
								// 	// alert(clickedDate?.toUTC().toUnix())
								// }
								{...register("claim_start", {
									required: "This is required"
								})}
								arrow={false}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem",
									width: "100%"
								}}
							/>
							<FormErrorMessage>{errors.claim_start?.message?.toString()}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.admin)}>
							<FormLabel htmlFor="name">Token Claim Date</FormLabel>
							<Input
								id="admin"
								placeholder="Admin"
								{...register("admin", {
									minLength: {
										message: "Minimum length should be 4",
										value: 4
									},
									required: "This is required"
								})}
								style={{
									background: "var(--chakra-colors-gray-800)",
									border: "none",
									borderRadius: "1em",
									color: "white",
									height: "3rem"
								}}
							/>
							<FormErrorMessage>{errors.admin?.message?.toString()}</FormErrorMessage>
						</FormControl>
						<HStack>
							<Button
								colorScheme="teal"
								isLoading={isSubmitting}
								mt={4}
								onClick={() => {
									setIDOActiveStep(idoActiveStep - 1)
								}}
							>
								Back
							</Button>
							<Button
								colorScheme="teal"
								isLoading={isSubmitting || isExecutingIDOCreation}
								mt={4}
								type="submit"
							>
								Create IDO
							</Button>
						</HStack>
					</>
				)}
			</form>
		</Flex>
	)
}
