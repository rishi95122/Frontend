import { type Wallet } from "../types"
import { Button, FormControl, FormErrorMessage, Input, VStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import validator from "validator"
import * as z from "zod"

const defaultValues = {
	loginHint: ""
}

type LoginHint = {
	loginHint: string
}

export const EmailSMSInput = ({
	emailLogin,
	phoneLogin
}: {
	emailLogin: Wallet
	phoneLogin: Wallet
}) => {
	const emailOrPhoneValidation = z.union([
		// eslint-disable-next-line import/no-named-as-default-member
		z.string().refine(validator.isMobilePhone, {
			message: "Invalid email address or phone number"
		}),
		z.string().email()
	])

	const validationSchema = z
		.object({
			loginHint: emailOrPhoneValidation
		})
		.strict()

	const {
		control,
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm<LoginHint>({
		defaultValues,
		mode: "onBlur",
		resolver: zodResolver(validationSchema)
	})

	const values = useWatch({ control })

	const onSubmit = handleSubmit((data) => {
		// eslint-disable-next-line import/no-named-as-default-member
		if (validator.isMobilePhone(data.loginHint)) {
			// eslint-disable-next-line require-unicode-regexp
			const cleaned = data.loginHint.replaceAll(/\D/g, "")
			const countryCode = cleaned.slice(0, 2)
			const mainNumber = cleaned.slice(2)

			localStorage.setItem("@fuzio/loginHint", `+${countryCode}-${mainNumber}`)

			// @ts-expect-error types
			phoneLogin.onClick()
		} else {
			localStorage.setItem("@fuzio/loginHint", data.loginHint)
			// @ts-expect-error types
			emailLogin.onClick()
		}
	})

	return (
		<VStack align="start" as="form" onSubmit={onSubmit} px={16} spacing={2}>
			<FormControl isInvalid={Boolean(errors.loginHint)}>
				<FormErrorMessage mb={3} textAlign="center" w="full">
					{errors.loginHint?.message}
				</FormErrorMessage>
				<Input
					id="loginHint"
					placeholder="Email / Phone Number"
					rounded="1rem"
					variant="filled"
					{...register("loginHint")}
				/>
			</FormControl>
			<Button
				bgGradient={errors.loginHint || !values.loginHint ? "" : "linear(45deg, brand.1, brand.2)"}
				isLoading={isSubmitting}
				rounded="1rem"
				type="submit"
				w="full"
			>
				Log In
			</Button>
		</VStack>
	)
}
