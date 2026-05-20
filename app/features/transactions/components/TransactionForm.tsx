import { useState } from "react"
import Button from "~/components/ui/Button"
import Input from "~/components/ui/Input"
import Modal from "~/components/ui/Modal"
import Select from "~/components/ui/Select"
import { transactionSchema } from "~/schemas/transactionSchema"

type TransactionFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: transactionSchema) => void
}
const CATEGORIES = [
	// Income
	{ value: "salary", label: "Salary" },
	{ value: "freelance", label: "Freelance" },
	{ value: "investment", label: "Investment" },

	// Essentials
	{ value: "groceries", label: "Groceries" },
	{ value: "housing", label: "Housing" },
	{ value: "utilities", label: "Utilities" },
	{ value: "transportation", label: "Transportation" },
	{ value: "health", label: "Health" },

	// Lifestyle
	{ value: "food", label: "Food & Dining" },
	{ value: "entertainment", label: "Entertainment" },
	{ value: "shopping", label: "Shopping" },
	{ value: "subscriptions", label: "Subscriptions" },
	{ value: "travel", label: "Travel" },
	{ value: "education", label: "Education" },

	{ value: "other", label: "Other" },
]
const TransactionForm = ({
	isOpen,
	onClose,
	onSubmit,
}: TransactionFormProps) => {
	const [title, setTitle] = useState("")
	const [amount, setAmount] = useState(0)
	const [type, setType] = useState("")
	const [category, setCategory] = useState("")
	const [date, setDate] = useState("")
	const [note, setNote] = useState("")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = { title, amount, type, category, date, note }
		const result = transactionSchema.safeParse(formData)

		if (!result.success) {
			const fieldErrors = Object.fromEntries(
				result.error.issues.map((issue) => [
					String(issue.path[0]),
					issue.message,
				]),
			)
			setValidationErrors(fieldErrors)
			return
		}

		setValidationErrors({})
		onSubmit(result.data)
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<Input
					placeholder="Title"
					type="text"
					label="Title"
					required={true}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					error={validationErrors.title}
				/>
				<Input
					placeholder="Amount"
					type="number"
					label="Amount"
					required={true}
					value={amount}
					onChange={(e) => setAmount(parseFloat(e.target.value))}
					error={validationErrors.amount}
				/>
				<Select
					placeholder="Type"
					options={[
						{ value: "income", label: "Income" },
						{ value: "expense", label: "Expense" },
					]}
					label={"Type"}
					value={type}
					onChange={(e) => setType(e.target.value)}
					error={validationErrors.type}
				/>

				<Select
					placeholder="Category"
					options={CATEGORIES}
					label={"Category"}
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					error={validationErrors.category}
				/>
				<Input
					placeholder="Date"
					type="date"
					label="Date"
					required={true}
					value={date}
					onChange={(e) => setDate(e.target.value)}
					error={validationErrors.date}
				/>
				<Input
					placeholder="Note"
					type="text"
					label="Note"
					required={true}
					value={note}
					onChange={(e) => setNote(e.target.value)}
					error={validationErrors.note}
				/>
				<Button type="submit">Add Transaction</Button>
			</form>
		</Modal>
	)
}
export default TransactionForm
