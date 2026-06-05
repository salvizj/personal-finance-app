import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { Route } from "./+types/dashboard"
import {
	GOAL_TABLE_COLUMNS,
	TRANSACTION_TABLE_COLUMNS,
} from "~/constants/constants"
import Table from "~/components/ui/Table"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import { Link } from "react-router"
import type { GoalSchema } from "~/schemas/goalSchema"
import { useTransactionsStats } from "~/hooks/useTransactionStats"
import ChartCard from "~/components/ChartCard"
import DonutChart from "~/components/DonutChart"
import ProgressBar from "~/components/ProgressBar"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Home() {
	const { storedValue: transactions } = useLocalStorage("transactions")
	const { storedValue: goals } = useLocalStorage("goals")
	const { totalIncome, totalExpenses, expensesByCategory } =
		useTransactionsStats((transactions ?? []) as TransactionSchema[])

	const totalBalance = totalIncome - totalExpenses
	return (
		<>
			<div className="space-y-4">
				<h1 className="text-xl font-semibold">Dashboard</h1>
				<p className="text-2xl font-bold">
					Total Balance:{" "}
					<span
						className={`${totalBalance >= 0 ? "text-success" : "text-error"}`}
					>
						${totalBalance.toFixed(2)}
					</span>
				</p>
				<Table
					data={(transactions as TransactionSchema[]) ?? []}
					columns={TRANSACTION_TABLE_COLUMNS}
					rowLimit={5}
					noDataText="No transactions yet. Start by adding some!"
				/>{" "}
				<div className="flex flex-row justify-end ">
					<Link
						to="/transactions"
						className="text-content-secondary hover:text-content"
					>
						View All Transactions
					</Link>
				</div>
				<Table
					data={(goals as GoalSchema[]) ?? []}
					columns={GOAL_TABLE_COLUMNS}
					customColumns={[
						{
							key: "progress",
							label: "Progress",
							render: (row) => (
								<div style={{ width: 67, height: 67 }}>
									<ProgressBar
										value={row.savedAmount}
										maxValue={row.targetAmount}
									/>
								</div>
							),
						},
					]}
					noDataText="No goals set yet. Start by creating a new goal!"
				/>{" "}
				<div className="flex flex-row justify-end ">
					<Link
						to="/goals"
						className="text-content-secondary hover:text-content"
					>
						View All Goals
					</Link>
				</div>
				<div className="flex flex-row justify-start w-1/2">
					<ChartCard title="Expense by Category">
						<DonutChart data={expensesByCategory} height={260} />
					</ChartCard>
				</div>{" "}
				<div className="flex flex-row justify-end ">
					<Link
						to="/reports"
						className="text-content-secondary hover:text-content"
					>
						View All Reports
					</Link>
				</div>
			</div>
		</>
	)
}
