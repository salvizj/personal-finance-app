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
			<div className="w-48 mb-8 flex flex-col gap-4">
				{!transactionFormIsOpem && (
					<Button onClick={() => setTransactionFormIsOpen(true)}>
						Add Transaction
					</Button>
				)}
				{!filterFormIsOpen && (
					<Button onClick={() => setFilterFormIsOpen(true)}>Filter</Button>
				)}
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
