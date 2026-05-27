import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useEffect, useState } from "react"
import Button from "~/components/ui/Button"
import type { transactionSchema } from "~/schemas/transactionSchema"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import Table from "~/components/ui/Table"
import type { FilterData } from "~/types/types"
import FilterForm from "~/features/transactions/components/FilterForm"
import { TABLE_COLUMNS } from "~/features/transactions/constants/constants"
import { useFilterTransactions } from "~/features/transactions/hooks/useFiltertTransactions"
import SearchInput from "~/features/transactions/components/SearchInput"
import TransactionActions from "~/features/transactions/components/TransactionActions"
import ConfirmDialog from "~/components/ConfirmDialog"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Transactions() {
	const [iSTrransactionFormIsOpem, setIsTransactionFormIsOpen] = useState(false)
	const [IsFilterFormIsOpen, setIsFilterFormIsOpen] = useState(false)
	const [IsConfirmOpen, setIsConfirmOpen] = useState(false)

	const [editingTransaction, setEdittingTransaction] =
		useState<transactionSchema | null>(null)
	const [deletingTransaction, setDeletingTransaction] =
		useState<transactionSchema | null>(null)

	const { storedValue, setValue, deleteValue, updateValue } =
		useLocalStorage<transactionSchema>("transactions")
	const { filteredData, setFilters, setSearch, search } =
		useFilterTransactions(storedValue)

	const handleTransactionFormSubmit = (data: transactionSchema) => {
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

	const handleFilterFormSubmit = (data: FilterData) => {
		setIsFilterFormIsOpen(false)
		setFilters(data)
	}

	const initiateDeleteTransaction = (row: transactionSchema) => {
		setIsConfirmOpen(true)
		setDeletingTransaction(row)
		console.log("initiate")
	}

	const initiateEditTransaction = (row: transactionSchema) => {
		setIsTransactionFormIsOpen(true)
		setEdittingTransaction(row)
	}

	return (
		<>
			<div className="flex justify-between mb-8 flex-col md:flex-row gap-4">
				<h1 className="text-xl font-semibold">Transactions</h1>
				<TransactionActions
					onFilter={() => setIsFilterFormIsOpen(true)}
					onClearFilters={() => setFilters(null)}
					onAddTransaction={() => setIsTransactionFormIsOpen(true)}
				/>
				<SearchInput search={search} setSearch={setSearch} />
			</div>
			<TransactionForm
				isOpen={iSTrransactionFormIsOpem}
				onClose={() => setIsTransactionFormIsOpen(false)}
				onSubmit={handleTransactionFormSubmit}
				editTransactionData={editingTransaction}
			/>
			<FilterForm
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
				data={filteredData}
				columns={TABLE_COLUMNS}
				actions={[
					{ label: "Edit", onClick: (row) => initiateEditTransaction(row) },
					{
						label: "Delete",
						onClick: (row) => initiateDeleteTransaction(row),
						variant: "danger",
					},
				]}
			/>
		</>
	)
}
