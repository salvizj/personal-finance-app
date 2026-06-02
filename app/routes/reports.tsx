import TinyBarChart from "~/features/reports/components/TinyBarChart"
import type { Route } from "./+types/reports"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { TransactionSchema } from "~/schemas/transactionSchema"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Reports() {
	const { storedValue } = useLocalStorage("transactions")

	const data = Object.entries(
		((storedValue ?? []) as TransactionSchema[]).reduce<Record<string, number>>(
			(totals, t) => {
				totals[t.category] = (totals[t.category] ?? 0) + t.amount
				return totals
			},
			{},
		),
	)
		.map(([name, uv]) => ({ name, uv }))
		.sort((a, b) => b.uv - a.uv)

	return (
		<>
			<div className="grid md:grid-cols-2 gap-4  grid-cols-1">
				<TinyBarChart data={data} title="Spending by Category" />
				<TinyBarChart data={data} title="Spending by Category" />
				<TinyBarChart data={data} title="Spending by Category" />
				<TinyBarChart data={data} title="Spending by Category" />
			</div>
		</>
	)
}
