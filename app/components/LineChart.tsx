import {
	LineChart as ReLineChart,
	Line,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
} from "recharts"
import { COLORS } from "~/constants/constants"

type LineChartProps = {
	data: Record<string, string | number>[]
	categories: string[]
	title?: string
	height?: number
}

const LineChart = ({ data, categories, title, height }: LineChartProps) => {
	return (
		<div className="w-full" style={{ width: "100%", height: height || 300 }}>
			{title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
			<ResponsiveContainer width="100%" height="100%">
				<ReLineChart data={data}>
					<CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
					<XAxis
						dataKey="month"
						tick={{ fill: "var(--color-content-muted)", fontSize: 12 }}
						stroke="var(--color-border)"
					/>
					<YAxis
						tick={{ fill: "var(--color-content-secondary)", fontSize: 12 }}
						stroke="var(--color-border)"
					/>
					<Tooltip
						cursor={{ fill: "var(--color-surface-secondary)" }}
						contentStyle={{
							backgroundColor: "var(--color-surface-elevated)",
							border: "1px solid var(--color-border)",
							borderRadius: "8px",
							color: "var(--color-content)",
						}}
						labelStyle={{
							color: "var(--color-content)",
							fontWeight: 600,
							marginBottom: 4,
						}}
						itemStyle={{
							color: "var(--color-content-secondary)",
						}}
					/>
					<Legend />
					{categories.map((cat, i) => (
						<Line
							key={cat}
							type="monotone"
							dataKey={cat}
							stroke={COLORS[i % COLORS.length]}
							strokeWidth={2}
							dot={false}
						/>
					))}
				</ReLineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default LineChart
