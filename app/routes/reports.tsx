import TinyBarChart from "~/components/TinyBarChart"
import type { Route } from "./+types/reports"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { TransactionSchema } from "~/schemas/transactionSchema"
import DonutChart from "~/components/DonutChart"
import Card from "~/components/ui/Card"
import LineChart from "~/components/LineChart"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Reports() {
	const { storedValue } = useLocalStorage("transactions")

	const expenseByCategory = Object.entries(
		((storedValue ?? []) as TransactionSchema[]).reduce<Record<string, number>>(
			(totals, t) => {
				totals[t.category] = (totals[t.category] ?? 0) + t.amount
				return totals
			},
			{},
		),
	)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value)

	const incomeVsExpense = [
		{ name: "Income", value: 5000 },
		{ name: "Expense", value: 3000 },
	]

	const expenses = ((storedValue ?? []) as TransactionSchema[]).filter(
		(t) => t.type === "expense",
	)

	const categories = Array.from(new Set(expenses.map((t) => t.category)))

	const byMonth: Record<string, Record<string, number>> = {}
	for (const t of expenses) {
		const month = new Date(t.date).toLocaleString("default", { month: "short" })
		byMonth[month] ??= {}
		byMonth[month][t.category] = (byMonth[month][t.category] ?? 0) + t.amount
	}

	const monthlyTrend = Object.entries(byMonth)
		.map(([month, cats]) => {
			const row: Record<string, string | number> = { month }
			for (const cat of categories) {
				row[cat] = cats[cat] ?? 0
			}
			return row
		})
		.sort(
			(a, b) =>
				new Date(`01 ${a.month} 2024`).getTime() -
				new Date(`01 ${b.month} 2024`).getTime(),
		)

	const topSpendingCategory = expenseByCategory[0]?.name || "N/A"
	const totalIncome =
		incomeVsExpense.find((d) => d.name === "Income")?.value || 0
	const totalExpenses =
		incomeVsExpense.find((d) => d.name === "Expense")?.value || 0

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
					<DonutChart data={expenseByCategory} />
				</Card>
				<Card title="Income vs Expense">
					<TinyBarChart data={incomeVsExpense} />
				</Card>
			</div>

			<Card title="Monthly Trend">
				<LineChart data={monthlyTrend} categories={categories} />
			</Card>
		</div>
	)
}
