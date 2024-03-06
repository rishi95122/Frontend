/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ComputedDatum } from "@nivo/pie"
import { type Interpolation, type SpringValue } from "@react-spring/web"
import { animated } from "@react-spring/web"
import { pieDataState } from "@state/UIState"
import { type FC } from "react"
import { useRecoilValue } from "recoil"

export const CustomArcLabelComponent: FC<{
	datum: ComputedDatum<{
		color: string
		id: string
		label: string
		value: number
	}>
	style: {
		progress: SpringValue<number>
		textColor: string
		// es
		transform: Interpolation<string, any>
	}
}> = ({ datum, style }) => {
	const pieChartData = useRecoilValue(pieDataState)
	let totalLPTokens = 0
	for (const currentDatum of pieChartData) {
		totalLPTokens += currentDatum.value
	}

	return (
		<animated.g
			style={{ opacity: datum.value > 0 ? 1 : 0, pointerEvents: "none" }}
			transform={style.transform}
			key={datum.id}
		>
			<circle cy={8} fill={style.textColor} r={25} />
			<circle fill="#ffffff" r={25} stroke={datum.color} strokeWidth={2} />
			<text
				dominantBaseline="central"
				fill={style.textColor}
				style={{
					fontFamily: "var(--chakra-fonts-heading)",
					fontSize: 11,
					fontWeight: 800
				}}
				textAnchor="middle"
			>
				{((datum.value / totalLPTokens) * 100).toFixed(2) + "%"}
			</text>
		</animated.g>
	)
}
