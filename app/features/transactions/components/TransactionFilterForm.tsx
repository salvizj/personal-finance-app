import { useState } from "react"
import { removeNonDigit } from "~/utils/utils"
import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import {
	TRANSACTION_EXPENSE_CATEGORIES,
	TRANSACTION_INCOME_CATEGORIES,
	TRANSACTION_TYPES,
} from "~/constants/constants"
import {
	transactionFilterSchema,
	type TransactionFilterSchema,
} from "~/schemas/transactionFilterSchema"
import type z from "zod"

type TransactionFilterForm = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: TransactionFilterSchema) => void
}

const TransactionFilterForm = ({
	isOpen,
	onClose,
	onSubmit,
}: TransactionFilterForm) => {
	const [type, setType] = useState("")
	const [category, setCategory] = useState("")
	const [minAmount, setMinAmount] = useState("")
	const [maxAmount, setMaxAmount] = useState("")
	const [dateFrom, setDateFrom] = useState("")
	const [dateTill, setDateTill] = useState("")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = {
			type,
			category,
			minAmount,
			maxAmount,
			dateFrom,
			dateTill,
		}

		const filledData = Object.fromEntries(
			Object.entries(formData).filter(([, value]) => value !== ""),
		)

		const result = transactionFilterSchema.safeParse(filledData)

		if (!result.success) {
			const fieldErrors = Object.fromEntries(
				result.error.issues.map((issue: z.core.$ZodIssue) => [
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

	const fields: FieldConfig[] = [
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
			name: "minAmount",
			label: "Min Amount",
			type: "text",
			placeholder: "Amount",
			value: minAmount,
			onChange: (v) => setMinAmount(removeNonDigit(v)),
			error: validationErrors.minAmount,
		},
		{
			name: "maxAmount",
			label: "Max Amount",
			type: "text",
			placeholder: "Amount",
			value: maxAmount,
			onChange: (v) => setMaxAmount(removeNonDigit(v)),
			error: validationErrors.maxAmount,
		},
		{
			name: "dateFrom",
			label: "Date From",
			type: "date",
			value: dateFrom,
			onChange: setDateFrom,
			error: validationErrors.dateFrom,
		},
		{
			name: "dateTo",
			label: "Date To",
			type: "date",
			value: dateTill,
			onChange: setDateTill,
			error: validationErrors.dateTo,
		},
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Filter">
			<Form fields={fields} onSubmit={handleSubmit} submitLabel="Filter" />
		</Modal>
	)
}

export default TransactionFilterForm
