import {
	Heading,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	Stepper,
	StepSeparator,
	StepStatus,
	StepTitle,
	useSteps
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { idoStepperState } from "state/UIState"

const steps = [
	{ description: "Project Introduction", title: "Project" },
	{ description: "Product Information", title: "Product" },
	{ description: "Dates & Time", title: "Times" },
	{ description: "Admin Settings", title: "Admin" }
]

export const CreateIDOStepper = () => {
	const { activeStep, setActiveStep } = useSteps({
		count: steps.length,
		index: 1
	})

	const [idoActiveStep] = useRecoilState(idoStepperState)

	useEffect(() => {
		setActiveStep(idoActiveStep - 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idoActiveStep])

	return (
		<Stepper index={activeStep} size="md">
			{steps.map((step, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<Step key={index} onClick={() => setActiveStep(index)}>
					<StepIndicator>
						<StepStatus
							active={<StepNumber />}
							complete={<StepIcon />}
							incomplete={<StepNumber />}
						/>
					</StepIndicator>
					<Heading fontSize="14">
						<StepTitle>{step.title}</StepTitle>
					</Heading>
					<StepSeparator />
				</Step>
			))}
		</Stepper>
	)
}
