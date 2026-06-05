import {
	TRANSACTION_EXPENSE_CATEGORIES,
	TRANSACTION_INCOME_CATEGORIES,
} from "~/constants/constants"
import type { TransactionSchema } from "~/schemas/transactionSchema"

export const useTransactionsStats = (transactions: TransactionSchema[]) => {
	const categories = TRANSACTION_INCOME_CATEGORIES.concat(
		TRANSACTION_EXPENSE_CATEGORIES,
	)
	const expenseTransactions = transactions.filter((t) => t.type === "expense")
	const incomeTransactions = transactions.filter((t) => t.type === "income")

	const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
	const totalExpenses = expenseTransactions.reduce(
		(sum, t) => sum + t.amount,
		0,
	)

	const expenseTotalsByCategory = expenseTransactions.reduce<
		Record<string, number>
	>((acc, t) => {
		acc[t.category] = (acc[t.category] ?? 0) + t.amount
		return acc
	}, {})

	const expensesByCategory = Object.entries(expenseTotalsByCategory)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value)

	const topSpendingCategory = expensesByCategory[0]?.name || "N/A"

	const expenseTotalsByMonth = expenseTransactions.reduce<
		Record<string, Record<string, number>>
	>((acc, t) => {
		const month = new Date(t.date).toLocaleString("default", { month: "short" })
		acc[month] ??= {}
		acc[month][t.category] = (acc[month][t.category] ?? 0) + t.amount
		return acc
	}, {})

	const expensesByMonth = Object.entries(expenseTotalsByMonth)
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

	const incomeVsExpense = [
		{ name: "Income", value: totalIncome },
		{ name: "Expense", value: totalExpenses },
	]

	return {
		topSpendingCategory,
		categories,
		expensesByMonth,
		expensesByCategory,
		totalIncome,
		totalExpenses,
		incomeVsExpense,
	}
}
