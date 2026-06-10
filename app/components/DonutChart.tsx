import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "~/constants/constants"

type DonutChartProps = {
	data: { name: string; value: number }[]
	height?: number
}

const DonutChart = ({ data, height }: DonutChartProps) => {
	if (!data || data.length === 0) {
		return (
			<div>
				<h2>No data yet to show.</h2>
			</div>
		)
	}
	return (
		<ResponsiveContainer width="100%" height={height || 240}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					innerRadius="60%"
					outerRadius="80%"
					label={({ name }) => name}
				>
					{data.map((_, i) => (
						<Cell key={i} fill={COLORS[i % COLORS.length]} />
					))}
				</Pie>
				<Tooltip
					contentStyle={{
						backgroundColor: "var(--color-surface-elevated)",
						border: "1px solid var(--color-border)",
						borderRadius: "8px",
						color: "var(--color-content)",
					}}
					itemStyle={{
						color: "var(--color-content-secondary)",
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	)
}

export default DonutChart
