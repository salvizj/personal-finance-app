import { describe, it, expect } from "vitest"
import { useTransactionsStats } from "./useTransactionStats"
import type { TransactionSchema } from "~/schemas/transactionSchema"

const defaultProps = (
	over: Partial<TransactionSchema> = {},
): TransactionSchema => ({
	title: "Test transaction",
	amount: 100,
	type: "expense",
	category: "Groceries",
	date: "2024-01-15",
	...over,
})

describe("useTransactionStats", () => {
	it("returns zeroed/default values for an empty array", () => {
		const result = useTransactionsStats([])

		expect(result.totalIncome).toBe(0)
		expect(result.totalExpenses).toBe(0)
		expect(result.topSpendingCategory).toBe("N/A")
		expect(result.expensesByCategory).toEqual([])
		expect(result.expensesByMonth).toEqual([])
		expect(result.incomeVsExpense).toEqual([
			{ name: "Income", value: 0 },
			{ name: "Expense", value: 0 },
		])
	})

	it("computes total income and total expenses", () => {
		const transactions = [
			defaultProps({
				type: "income",
				category: "Salary",
				amount: 1000,
				date: "2024-01-01",
			}),
			defaultProps({
				type: "expense",
				category: "Groceries",
				amount: 200,
				date: "2024-01-02",
			}),
			defaultProps({
				type: "expense",
				category: "Rent",
				amount: 500,
				date: "2024-01-03",
			}),
		]
		const result = useTransactionsStats(transactions)

		expect(result.totalIncome).toBe(1000)
		expect(result.totalExpenses).toBe(700)
		expect(result.incomeVsExpense).toEqual([
			{ name: "Income", value: 1000 },
			{ name: "Expense", value: 700 },
		])
	})

	it("groups expenses by category, sums them, and sorts descending", () => {
		const transactions = [
			defaultProps({ category: "groceries", amount: 100, date: "2024-01-01" }),
			defaultProps({ category: "groceries", amount: 50, date: "2024-01-05" }),
			defaultProps({ category: "housing", amount: 500, date: "2024-01-01" }),
		]
		const result = useTransactionsStats(transactions)

		expect(result.expensesByCategory).toEqual([
			{ name: "housing", value: 500 },
			{ name: "groceries", value: 150 },
		])
	})
	it("picks the category with the highest total as topSpendingCategory", () => {
		const transactions = [
			defaultProps({ category: "housing", amount: 500, date: "2024-01-01" }),
			defaultProps({ category: "housing", amount: 150, date: "2024-01-01" }),
		]
		const result = useTransactionsStats(transactions)

		expect(result.topSpendingCategory).toBe("housing")
	})
	it("groups expenses by month, fills all categories with 0 by default, and sorts months chronologically", () => {
		const transactions = [
			defaultProps({
				type: "expense",
				category: "housing",
				amount: 500,
				date: "2024-03-01",
			}),
			defaultProps({
				type: "expense",
				category: "groceries",
				amount: 100,
				date: "2024-01-15",
			}),
		]
		const result = useTransactionsStats(transactions)

		const months = result.expensesByMonth.map((row) => row.month)
		expect(months).toEqual(["Jan", "Mar"])

		const jan = result.expensesByMonth.find((row) => row.month === "Jan")
		expect(jan?.groceries).toBe(100)
		expect(jan?.housing).toBe(0)
	})
})
