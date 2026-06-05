import TinyBarChart from "~/components/TinyBarChart"
import type { Route } from "./+types/reports"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import DonutChart from "~/components/DonutChart"
import LineChart from "~/components/LineChart"
import { useTransactionsStats } from "~/hooks/useTransactionStats"
import ChartCard from "~/components/ChartCard"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Reports() {
	const { storedValue } = useLocalStorage("transactions")
	const {
		topSpendingCategory,
		totalIncome,
		totalExpenses,
		categories,
		expensesByCategory,
		expensesByMonth,
		incomeVsExpense,
	} = useTransactionsStats((storedValue ?? []) as TransactionSchema[])

	return (
		<>
			<div className="space-y-4">
				<h1 className="text-xl font-semibold">Reports</h1>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<ChartCard title="Top Spending">
						<p className="text-2xl font-bold text-content">
							{topSpendingCategory}
						</p>
					</ChartCard>
					<ChartCard title="Total Income">
						<p className="text-2xl font-bold text-success">${totalIncome}</p>
					</ChartCard>
					<ChartCard title="Total Expenses">
						<p className="text-2xl font-bold text-error">${totalExpenses}</p>
					</ChartCard>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<ChartCard title="Expense by Category">
						<DonutChart data={expensesByCategory} height={240} />
					</ChartCard>
					<ChartCard title="Income vs Expense">
						<TinyBarChart data={incomeVsExpense} height={240} />
					</ChartCard>
				</div>

				<ChartCard title="Monthly Trend">
					<LineChart
						data={expensesByMonth}
						categories={categories}
						height={300}
					/>
				</ChartCard>
			</div>
		</>
	)
}
