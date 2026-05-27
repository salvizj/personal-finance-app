type TableProps<T extends Record<string, string | number>> = {
	data: T[] | null
	columns: readonly (keyof T)[]
}

const Table = <T extends Record<string, string | number>>({
	data,
	columns,
}: TableProps<T>) => {
	if (data === null) {
		return (
			<div>
				<h2>No transaction added yet</h2>
			</div>
		)
	}

	return (
		<div>
			<table className="min-w-full border-collapse">
				<thead>
					<tr className="bg-surface-secondary border-b border-border text-left">
						{columns.map((col, i) => (
							<th
								key={i}
								className="py-3 px-4 font-semibold text-content capitalize"
							>
								{String(col)}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className="bg-surface border-b border-border hover:bg-surface-elevated transition-colors"
						>
							{columns.map((col, colIndex) => {
								const value = row[col]
								return (
									<td
										key={colIndex}
										className="py-3 px-4 text-content-secondary"
									>
										{String(value ?? "")}
									</td>
								)
							})}
						</tr>
					))}

					{data.length === 0 && (
						<tr>
							<td
								colSpan={columns.length}
								className="py-8 text-center text-content-muted"
							>
								No transactions found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Table
