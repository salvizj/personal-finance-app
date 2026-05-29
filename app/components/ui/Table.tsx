import type { Variant } from "~/types/types"
import Button from "./Button"

type Action<T extends Record<string, string | number>> = {
	label: string
	onClick: (row: T) => void
	variant?: Variant
}

type TableProps<T extends Record<string, string | number>> = {
	data: T[]
	columns: readonly (keyof T)[]
	actions?: Action<T>[]
	noDataText: string
}

const Table = <T extends Record<string, string | number>>({
	data,
	columns,
	actions,
	noDataText,
}: TableProps<T>) => {
	if (!data || data.length === 0) {
		return (
			<div>
				<h2>{noDataText}</h2>
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
								{String(col)
									.replace(/([A-Z])/g, " $1")
									.toLowerCase()}
							</th>
						))}
						{actions && (
							<th className="py-3 px-4 font-semibold text-content">Actions</th>
						)}
					</tr>
				</thead>

				<tbody>
					{data.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className="bg-surface border-b border-border hover:bg-surface-elevated transition-colors "
						>
							{columns.map((col, colIndex) => {
								const value = row[col]
								return (
									<td
										key={colIndex}
										className="py-6 px-4 text-content-secondary"
									>
										{String(value)}
									</td>
								)
							})}
							{actions && (
								<td className="py-4 px-4">
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
