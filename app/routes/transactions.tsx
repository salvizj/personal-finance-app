import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useState } from "react"
import Button from "~/components/ui/Button"
import type { transactionSchema } from "~/schemas/transactionSchema"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import Table from "~/components/ui/Table"
import type { Column } from "~/types/types"

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
	const [isOpen, setIsOpen] = useState(false)
	const { storedValue, setValue, removeValue } =
		useLocalStorage<transactionSchema>("transactions")

	const handleFormSubmit = (data: transactionSchema) => {
		setValue(data)
		setIsOpen(false)
	}

	return (
		<>
			{!isOpen && (
				<Button onClick={() => setIsOpen(true)}>Add Transaction</Button>
			)}
			<TransactionForm
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onSubmit={handleFormSubmit}
			/>
			<Table data={storedValue} columns={transactionColumns} />
		</>
	)
}
