import type { ReactNode } from "react"

type Column<T> = {
	header: string
	key: keyof T
}

type TableProps<T> = {
	data: T[] | null
	columns: Column<T>[]
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
	const safeData = data ?? []

	return (
		<div className="overflow-x-auto w-full">
			<table className="min-w-full border-collapse">
				<thead>
					<tr className="bg-surface-secondary border-b border-border text-left">
						{columns.map((col, i) => (
							<th key={i} className="py-3 px-4 font-semibold text-content">
								{col.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{safeData.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className="bg-surface border-b border-border hover:bg-surface-elevated transition-colors"
						>
							{columns.map((col, colIndex) => {
								const value = row[col.key]
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

					{safeData.length === 0 && (
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
