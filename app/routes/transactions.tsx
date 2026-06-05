import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useState } from "react"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import Table from "~/components/ui/Table"
import SearchInput from "~/components/SearchInput"
import ConfirmDialog from "~/components/ConfirmDialog"
import Actions from "~/components/Actions"
import { TRANSACTION_TABLE_COLUMNS } from "~/constants/constants"
import { useFilter } from "~/hooks/useFilter"
import type { TransactionFilter } from "~/types/types"
import TransactionFilterForm from "~/features/transactions/components/TransactionFilterForm"
import Button from "~/components/ui/Button"
import { handleCSVDownload } from "~/utils/csv"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Transactions() {
	const [iSTrransactionFormIsOpen, setIsTransactionFormIsOpen] = useState(false)
	const [IsFilterFormIsOpen, setIsFilterFormIsOpen] = useState(false)
	const [IsConfirmOpen, setIsConfirmOpen] = useState(false)

	const [editingTransaction, setEdittingTransaction] =
		useState<TransactionSchema | null>(null)
	const [deletingTransaction, setDeletingTransaction] =
		useState<TransactionSchema | null>(null)

	const { storedValue, setValue, deleteValue, updateValue } =
		useLocalStorage<TransactionSchema>("transactions")
	const { filteredData, setFilters, setSearch, search } = useFilter({
		data: storedValue,
		filter: [
			{ param: "type", match: (t, v) => t.type === v },
			{ param: "category", match: (t, v) => t.category === v },
			{ param: "minAmount", match: (t, v) => t.amount >= Number(v) },
			{ param: "maxAmount", match: (t, v) => t.amount <= Number(v) },
			{ param: "dateFrom", match: (t, v) => new Date(t.date) >= new Date(v) },
			{ param: "dateTill", match: (t, v) => new Date(t.date) <= new Date(v) },
			{
				param: "search",
				match: (t, v) => t.title.toLowerCase().includes(v.toLowerCase()),
			},
		],
	})
	const handleTransactionFormSubmit = (data: TransactionSchema) => {
		if (editingTransaction != null) {
			updateValue(data, editingTransaction)
		} else {
			setValue(data)
		}

		setIsTransactionFormIsOpen(false)
	}

	const handleTransationDeletion = () => {
		if (IsConfirmOpen && deletingTransaction != null) {
			deleteValue(deletingTransaction)
		}
	}

	const handleFilterFormSubmit = (data: TransactionFilter) => {
		setIsFilterFormIsOpen(false)
		setFilters(data)
	}

	const initiateDeleteTransaction = (row: TransactionSchema) => {
		setIsConfirmOpen(true)
		setDeletingTransaction(row)
	}

	const initiateEditTransaction = (row: TransactionSchema) => {
		setIsTransactionFormIsOpen(true)
		setEdittingTransaction(row)
	}
	return (
		<>
			<div className="flex justify-between mb-8 flex-col md:flex-row gap-4">
				<h1 className="text-xl font-semibold">Transactions</h1>
				<Actions
					actions={[
						{
							label: "Filter",
							variant: "outline",
							onClick: () => setIsFilterFormIsOpen(true),
						},
						{
							label: "Clear Filters",
							variant: "outline",
							onClick: () => setFilters(null),
						},
						{
							label: "Add Transaction",
							onClick: () => setIsTransactionFormIsOpen(true),
						},
					]}
				/>
				<SearchInput search={search} setSearch={setSearch} />
			</div>
			<div className="flex justify-end mb-4">
				<Button
					variant="outline"
					onClick={() =>
						handleCSVDownload(filteredData ?? [], "transactions.csv")
					}
				>
					Export CSV
				</Button>
			</div>
			<TransactionForm
				isOpen={iSTrransactionFormIsOpen}
				onClose={() => setIsTransactionFormIsOpen(false)}
				onSubmit={handleTransactionFormSubmit}
				editTransactionData={editingTransaction}
			/>
			<TransactionFilterForm
				isOpen={IsFilterFormIsOpen}
				onClose={() => setIsFilterFormIsOpen(false)}
				onSubmit={handleFilterFormSubmit}
			/>
			<ConfirmDialog
				isOpen={IsConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={handleTransationDeletion}
				message="This transaction will be permanently deleted."
			/>
			<Table
				data={filteredData ?? []}
				columns={TRANSACTION_TABLE_COLUMNS}
				actions={[
					{ label: "Edit", onClick: (row) => initiateEditTransaction(row) },
					{
						label: "Delete",
						onClick: (row) => initiateDeleteTransaction(row),
						variant: "danger",
					},
				]}
				noDataText="No transactions found."
			/>
		</>
	)
}
