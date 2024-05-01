// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { useColorModeValue } from "@chakra-ui/react"
import { linearGradientDef } from "@nivo/core"
import { ResponsiveLine } from "@nivo/line"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SwapChart = ({ data }: { data: any }) => (
	<ResponsiveLine
		areaBlendMode="multiply"
		axisBottom={{
			legendOffset: 600,
			legendPosition: "middle",
			tickPadding: 5,
			tickRotation: 0,
			tickSize: 8
		}}
		axisLeft={null}
		axisRight={null}
		axisTop={null}
		colors={["#02e296"]}
		crosshairType="top-left"
		curve="catmullRom"
		data={data}
		defs={[
			linearGradientDef("gradientA", [
				{ color: "inherit", offset: 0 },
				{ color: "inherit", offset: 100, opacity: 0 }
			])
		]}
		enableArea
		enableGridX={false}
		enableGridY={false}
		enablePoints={false}
		enableSlices="x"
		fill={[{ id: "gradientA", match: "*" }]}
		legends={[]}
		lineWidth={3}
		margin={{ bottom: 50, top: 10 }}
		motionConfig="wobbly"
		pointBorderColor={{ from: "serieColor", modifiers: [] }}
		pointBorderWidth={4}
		pointColor={{ theme: "background" }}
		pointLabelYOffset={-12}
		pointSize={0}
		theme={useColorModeValue({}, { textColor: "#fff" })}
		useMesh
		xScale={{ type: "point" }}
		yFormat=" >-.2f"
		yScale={{
			max: "auto",
			min: "auto",
			reverse: false,
			stacked: true,
			type: "linear"
		}}
	/>
)
