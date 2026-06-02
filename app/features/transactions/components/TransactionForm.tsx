import { useEffect, useState } from "react"
import Modal from "~/components/ui/Modal"
import { removeNonDigit } from "~/utils/utils"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import {
	TRANSACTION_EXPENSE_CATEGORIES,
	TRANSACTION_INCOME_CATEGORIES,
	TRANSACTION_TYPES,
} from "~/constants/constants"
import type z from "zod"
import {
	transactionSchema,
	type TransactionSchema,
} from "~/schemas/transactionSchema"

type TransactionFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: TransactionSchema) => void
	editTransactionData?: TransactionSchema | null
}

const TransactionForm = ({
	isOpen,
	onClose,
	onSubmit,
	editTransactionData,
}: TransactionFormProps) => {
	const [title, setTitle] = useState("")
	const [amount, setAmount] = useState("")
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
				result.error.issues.map((issue: z.core.$ZodIssue) => [
					String(issue.path[0]),
					issue.message,
				]),
			)
			setValidationErrors(fieldErrors)
			console.log("Validation errors:", fieldErrors)
			return
		}

		setValidationErrors({})
		onSubmit(result.data)
	}

	useEffect(() => {
		if (editTransactionData) {
			setTitle(editTransactionData.title)
			setType(editTransactionData.type)
			setAmount(String(editTransactionData.amount))
			setCategory(editTransactionData.category)
			setDate(editTransactionData.date)
			setNote(editTransactionData.note ?? "")
		}
	}, [editTransactionData])

	const fields: FieldConfig[] = [
		{
			name: "title",
			label: "Title",
			type: "text",
			placeholder: "Title",
			value: title,
			onChange: setTitle,
			error: validationErrors.title,
		},
		{
			name: "amount",
			label: "Amount",
			type: "text",
			placeholder: "Amount",
			value: amount,
			onChange: (v) => setAmount(removeNonDigit(v)),
			error: validationErrors.amount,
		},
		{
			name: "type",
			label: "Type",
			type: "select",
			options: TRANSACTION_TYPES,
			value: type,
			onChange: setType,
			error: validationErrors.type,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: TRANSACTION_INCOME_CATEGORIES.concat(
				TRANSACTION_EXPENSE_CATEGORIES,
			),
			value: category,
			onChange: setCategory,
			error: validationErrors.category,
		},
		{
			name: "date",
			label: "Date",
			type: "date",
			placeholder: "Date",
			value: date,
			onChange: setDate,
			error: validationErrors.date,
		},
		{
			name: "note",
			label: "Note",
			type: "text",
			placeholder: "Note",
			value: note,
			onChange: setNote,
			error: validationErrors.note,
		},
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
			<Form
				fields={fields}
				onSubmit={handleSubmit}
				submitLabel={
					editTransactionData ? "Edit Transaction" : "Add Transaction"
				}
			/>
		</Modal>
	)
}
export default TransactionForm
