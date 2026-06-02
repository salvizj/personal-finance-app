type ProgressBarProps = { value: number; maxValue: number }

const ProgressBar = ({ value, maxValue }: ProgressBarProps) => {
	const percent = Math.round(Math.min(value / maxValue, 1) * 100)

	const colorClass =
		percent >= 75
			? "bg-green-300"
			: percent <= 75 && percent >= 50
				? "bg-amber-300"
				: "bg-red-300"

	return (
		<div className="flex flex-col items-center gap-1 w-full min-w-32">
			<span className="text-sm text-content ">{percent}%</span>
			<div className="w-full h-4 bg-surface-secondary rounded-full overflow-hidden">
				<div
					className={`h-full rounded-full transition-all ${colorClass}`}
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	)
}

export default ProgressBar
