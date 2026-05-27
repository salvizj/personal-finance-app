import Button from "~/components/ui/Button"

type TransactionActionsProps = {
	onFilter: () => void
	onClearFilters: () => void
	onAddTransaction: () => void
}

const TransactionActions = ({
	onFilter,
	onClearFilters,
	onAddTransaction,
}: TransactionActionsProps) => {
	return (
		<div className="flex gap-2">
			<Button variant="outline" onClick={onFilter}>
				Filter
			</Button>
			<Button variant="outline" onClick={onClearFilters}>
				Clear filters
			</Button>
			<Button onClick={onAddTransaction}>Add Transaction</Button>
		</div>
	)
}

export default TransactionActions
