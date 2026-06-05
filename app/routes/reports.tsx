import TinyBarChart from "~/components/TinyBarChart"
import type { Route } from "./+types/reports"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import DonutChart from "~/components/DonutChart"
import Card from "~/components/ui/Card"
import LineChart from "~/components/LineChart"
import { useReportsStats } from "~/features/reports/hooks/useReportsStats"

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
	} = useReportsStats((storedValue ?? []) as TransactionSchema[])

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Card title="Top Spending">
					<p className="text-2xl font-bold text-content">
						{topSpendingCategory}
					</p>
				</Card>
				<Card title="Total Income">
					<p className="text-2xl font-bold text-success">${totalIncome}</p>
				</Card>
				<Card title="Total Expenses">
					<p className="text-2xl font-bold text-error">${totalExpenses}</p>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card title="Expense by Category">
					<DonutChart data={expensesByCategory} />
				</Card>
				<Card title="Income vs Expense">
					<TinyBarChart data={incomeVsExpense} />
				</Card>
			</div>

			<Card title="Monthly Trend">
				<LineChart data={expensesByMonth} categories={categories} />
			</Card>
		</div>
	)
}
