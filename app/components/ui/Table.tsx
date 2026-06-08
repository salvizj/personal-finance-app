import type { Variant } from "~/types/types"
import Button from "./Button"

type Column<T extends Record<string, string | number>> = {
	key: string
	label?: string
	render: (row: T) => React.ReactNode
}

type Action<T extends Record<string, string | number>> = {
	label: string
	onClick: (row: T) => void
	variant?: Variant
}

type TableProps<T extends Record<string, string | number>> = {
	data: T[]
	columns: readonly (keyof T)[]
	actions?: Action<T>[]
	customColumns?: Column<T>[]
	noDataText: string
	rowLimit?: number
}

const Table = <T extends Record<string, string | number>>({
	data,
	columns,
	actions,
	noDataText,
	customColumns,
	rowLimit,
}: TableProps<T>) => {
	if (!data || data.length === 0) {
		return (
			<div>
				<h2>{noDataText}</h2>
			</div>
		)
	}

	return (
		<div className="w-full overflow-x-auto mb-4">
			<table className="min-w-full border-collapse table-fixed">
				<thead>
					<tr className="bg-surface-secondary border-b border-border text-left ">
						{columns.map((col, i) => (
							<th
								key={i}
								className="py-3 px-4 font-semibold text-content capitalize"
							>
								{String(col)
									.replace(/([A-Z])/g, " $1")
									.toLowerCase()}
							</th>
						))}
						{customColumns?.map((col, i) => (
							<th key={i} className="py-3 px-8 font-semibold text-content">
								{col.label ?? col.key}
							</th>
						))}
						{actions && (
							<th className="py-3 px-24 font-semibold text-content">Actions</th>
						)}
					</tr>
				</thead>

				<tbody>
					{data.slice(0, rowLimit ?? data.length).map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className="bg-surface border-b border-border hover:bg-surface-elevated transition-colors "
						>
							{columns.map((col, colIndex) => {
								const value = row[col]
								return (
									<td
										key={colIndex}
										className="py-4 px-4 text-content-secondary text-left"
									>
										{String(value)}
									</td>
								)
							})}
							{customColumns?.map((col, i) => (
								<td key={i} className="py-4 px-8">
									{col.render(row)}
								</td>
							))}
							{actions && (
								<td className="py-4 px-24">
									<div className="flex gap-2 items-center">
										{actions.map((action, k) => (
											<Button
												key={k}
												variant={action.variant ?? "primary"}
												onClick={() => action.onClick(row)}
											>
												{action.label}
											</Button>
										))}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
