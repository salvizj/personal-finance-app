import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { Route } from "./+types/dashboard"
import { TRANSACTION_TABLE_COLUMNS } from "~/constants/constants"
import Table from "~/components/ui/Table"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import { Link } from "react-router"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Home() {
	const { storedValue } = useLocalStorage("transactions")
	return (
		<>
			<div className="space-y-4">
				<h1 className="text-xl font-semibold">Dashboard</h1>
				<Table
					data={(storedValue as TransactionSchema[]) ?? []}
					columns={TRANSACTION_TABLE_COLUMNS}
					noDataText="No transactions found."
					rowLimit={5}
				/>
				<Link to="/transactions" className="text-primary">
					View All Transactions
				</Link>
			</div>
		</>
	)
}
