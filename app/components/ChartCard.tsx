import Card from "./ui/Card"

type ChartCardProps = {
	title: string
	children: React.ReactNode
}

const ChartCard = ({ title, children }: ChartCardProps) => {
	return (
		<Card title={title}>
			<div>{children}</div>
		</Card>
	)
}
export default ChartCard
