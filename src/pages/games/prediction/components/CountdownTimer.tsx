import { Text } from "@chakra-ui/react"
import { useCountDown } from "ahooks"
import { type FC, useMemo, useRef } from "react"

export type CountdownTimerProps = {
	timeTo: number
}

const toDateTime = (secs: number) => {
	const dateTime = new Date(Date.UTC(1_970, 0, 1))
	dateTime.setUTCSeconds(secs)
	return dateTime
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ timeTo }) => {
	const timerRef = useRef<Date>()

	const timerMemo = useMemo(() => {
		timerRef.current = toDateTime(timeTo)
		return timerRef.current
	}, [timeTo])

	const [, formattedResponse] = useCountDown({
		targetDate: timerMemo
	})

	const { minutes, seconds } = formattedResponse

	return (
		<Text fontSize={{ base: 32, md: 32 }} textAlign="center" w="full">
			~ {minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
			{seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
		</Text>
	)
}
