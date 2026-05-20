import TransactionForm from "~/features/transactions/components/TransactionForm"
import type { Route } from "./+types/transactions"
import { useState } from "react"
import Button from "~/components/ui/Button"
import type { transactionSchema } from "~/schemas/transactionSchema"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Transactions() {
	const [isOpen, setIsOpen] = useState(false)

	const handleFormSubmit = (data: transactionSchema) => {
		console.log("Form submitted with data:", data)
		setIsOpen(false)
	}
	return (
		<>
			{!isOpen && (
				<Button onClick={() => setIsOpen(true)}>Add Transaction</Button>
			)}
			<TransactionForm
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onSubmit={handleFormSubmit}
			/>
		</>
	)
}
