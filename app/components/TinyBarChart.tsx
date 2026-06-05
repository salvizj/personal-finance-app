import {
	BarChart,
	Bar,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
} from "recharts"
import { COLORS } from "~/constants/constants"

type TinyBarChartProps = {
	data: { name: string; value: number }[]
	height?: number
}

const TinyBarChart = ({ data, height }: TinyBarChartProps) => {
	return (
		<ResponsiveContainer width="100%" height={height || 240}>
			<BarChart layout="vertical" data={data}>
				<XAxis
					type="number"
					tick={{ fill: "var(--color-content-muted)", fontSize: 12 }}
					stroke="var(--color-border)"
				/>
				<YAxis
					type="category"
					dataKey="name"
					width={90}
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
				<Bar dataKey="value" radius={4}>
					{data.map((_, i) => (
						<Cell key={i} fill={COLORS[i % COLORS.length]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default TinyBarChart
