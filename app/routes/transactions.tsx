import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useState } from "react"
import Button from "~/components/ui/Button"
import type { transactionSchema } from "~/schemas/transactionSchema"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import Table from "~/components/ui/Table"
import type { Column, FilterData } from "~/types/types"
import FilterForm from "~/features/transactions/components/FilterForm"

const transactionColumns: Column<{
	title: string
	amount: number
	type: "income" | "expense"
	category: string
	date: string
	note?: string
}>[] = [
	{ header: "Title", key: "title" },
	{ header: "Amount", key: "amount" },
	{ header: "Type", key: "type" },
	{ header: "Category", key: "category" },
	{ header: "Date", key: "date" },
	{ header: "Note", key: "note" },
]

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Transactions() {
	const [transactionFormIsOpem, setTransactionFormIsOpen] = useState(false)
	const [filterFormIsOpen, setFilterFormIsOpen] = useState(false)
	const { storedValue, setValue, removeValue } =
		useLocalStorage<transactionSchema>("transactions")

	const handleTransactionFormSubmit = (data: transactionSchema) => {
		setValue(data)
		setTransactionFormIsOpen(false)
	}

	const handleFilterFormSubmit = (data: FilterData) => {
		setFilterFormIsOpen(false)
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
			<Table data={storedValue} columns={transactionColumns} />
		</>
	)
}
