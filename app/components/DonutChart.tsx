import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "~/constants/constants"

type DonutChartProps = {
	data: { name: string; value: number }[]
	title?: string
	height?: number
}

const DonutChart = ({ data, title, height }: DonutChartProps) => {
	return (
		<div
			style={{
				height: height || 300,
			}}
		>
			{title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
			<ResponsiveContainer width="100%" height="100%">
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
		</div>
	)
}

export default DonutChart
