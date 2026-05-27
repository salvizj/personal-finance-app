import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useState } from "react"
import Button from "~/components/ui/Button"
import type { transactionSchema } from "~/schemas/transactionSchema"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import Table from "~/components/ui/Table"
import type { FilterData } from "~/types/types"
import FilterForm from "~/features/transactions/components/FilterForm"
import { TABLE_COLUMNS } from "~/features/transactions/constants/constants"
import { useFilterTransactions } from "~/features/transactions/hooks/useFiltertTransactions"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Transactions() {
	const [transactionFormIsOpem, setTransactionFormIsOpen] = useState(false)
	const [filterFormIsOpen, setFilterFormIsOpen] = useState(false)
	const { storedValue, setValue, removeValue } =
		useLocalStorage<transactionSchema>("transactions")
	const { filteredData, setFilters } = useFilterTransactions(storedValue)

	const handleTransactionFormSubmit = (data: transactionSchema) => {
		setValue(data)
		setTransactionFormIsOpen(false)
	}

	const handleFilterFormSubmit = (data: FilterData) => {
		setFilterFormIsOpen(false)
		setFilters(data)
	}

	return (
		<>
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-xl font-semibold">Transactions</h1>
				<div className="flex gap-2">
					<Button variant="outline" onClick={() => setFilterFormIsOpen(true)}>
						Filter
					</Button>
					<Button variant="outline" onClick={() => setFilters(null)}>
						Clear filters
					</Button>
					<Button onClick={() => setTransactionFormIsOpen(true)}>
						Add Transaction
					</Button>
				</div>
			</div>
			<TransactionForm
				isOpen={transactionFormIsOpem}
				onClose={() => setTransactionFormIsOpen(false)}
				onSubmit={handleTransactionFormSubmit}
			/>
			<FilterForm
				isOpen={filterFormIsOpen}
				onClose={() => setFilterFormIsOpen(false)}
				onSubmit={handleFilterFormSubmit}
			/>
			<Table data={filteredData} columns={TABLE_COLUMNS} />
		</>
	)
}
