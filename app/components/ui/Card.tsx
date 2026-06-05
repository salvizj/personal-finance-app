type CardProps = {
	title?: string
	children: React.ReactNode
}

const Card = ({ title, children }: CardProps) => {
	return (
		<div className="bg-surface-elevated border border-border rounded-xl shadow-sm p-5 h-full">
			{title && (
				<h2 className="text-sm font-medium text-content-secondary mb-3 uppercase tracking-wide">
					{title}
				</h2>
			)}
			<div className="text-content">{children}</div>
		</div>
	)
}

export default Card
