// @ts-nocheck
import Welcome from "./1Welcome"
import Pickchains from "./2PickChains"
import Chainsrewards from "./3ChainsRewards"
import Claim from "./4Claim"
import { Flex } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { useState } from "react"

const MultiStepForm = () => {
	const [step, setStep] = useState(1) // Set the initial step to 1

	const handleNext = () => {
		setStep(step + 1)
	}

	const handlePrevious = () => {
		setStep(step - 1)
	}

	return (
		<Flex
			animate={{ opacity: 0.9 }}
			as={motion.main}
			exit={{ opacity: 0 }}
			flexDirection="column"
			gap={2}
			h="full"
			initial={{ opacity: 0 }}
			p={{ base: 4, lg: 24, md: 16 }}
			w="full"
			mt={{ base: -3, md: -4 }}
		>
			{step === 1 && <Welcome onNext={handleNext} />}
			{step === 2 && <Pickchains onNext={handleNext} onPrev={handlePrevious} />}
			{step === 3 && <Chainsrewards onPrev={handlePrevious} />}
			{step === 4 && <Claim onPrev={handlePrevious} />}
		</Flex>
	)
}

export default MultiStepForm
