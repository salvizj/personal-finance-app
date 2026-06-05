type ExportToCsvProps = {
	data: Record<string, string | number>[]
	filename?: string
}
const ExportToCsv = ({ data, filename }: ExportToCsvProps) => {
	return (
		<div className="p-4 bg-surface rounded-md shadow">
			<h2 className="text-lg font-semibold mb-4">Export to CSV</h2>
			<p className="text-content-secondary mb-4">
				Export your transactions data to a CSV file for easy sharing and backup.
			</p>
			<button
				className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
				onClick={() => {
					alert("Exporting to CSV...")
				}}
			>
				Export Now
			</button>
		</div>
	)
}

export default ExportToCsv
