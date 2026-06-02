import {
	BarChart,
	Bar,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
} from "recharts"

type DataPoint = {
	name: string
	uv: number
}

type TinyBarChartProps = {
	data: DataPoint[]
	title?: string
}

const TinyBarChart = ({ data, title }: TinyBarChartProps) => {
	return (
		<div style={{ width: "100%", maxWidth: 500, aspectRatio: 2 }}>
			{title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
			<ResponsiveContainer width="100%" height="100%">
				<BarChart layout="vertical" data={data}>
					<XAxis type="number" />
					<YAxis type="category" dataKey="name" width={90} />
					<Tooltip />
					<Bar dataKey="uv">
						<Cell fill={`var(--color-primary)`} />
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default TinyBarChart
