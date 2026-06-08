import { removeNonDigit } from "~/utils/utils"
import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import { useState } from "react"
import {
	goalFilterSchema,
	type GoalFilterSchema,
} from "~/schemas/goalFilterSchema"
import type z from "zod"

type GoalFilterFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: GoalFilterSchema) => void
}

const GoalFilterForm = ({ isOpen, onClose, onSubmit }: GoalFilterFormProps) => {
	const [name, setName] = useState("")
	const [minTargetAmount, setMinTargetAmount] = useState("")
	const [maxTargetAmount, setMaxTargetAmount] = useState("")
	const [minSavedAmount, setMinSavedAmount] = useState("")
	const [maxSavedAmount, setMaxSavedAmount] = useState("")
	const [dateFrom, setDeadlineFrom] = useState("")
	const [dateTill, setDeadlineTill] = useState("")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setValidationErrors({})

		const formData = {
			name,
			minTargetAmount,
			maxTargetAmount,
			minSavedAmount,
			maxSavedAmount,
			dateFrom,
			dateTill,
		}
		const filledData = Object.fromEntries(
			Object.entries(formData).filter(([, value]) => value !== ""),
		)
		const result = goalFilterSchema.safeParse(filledData)

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
			name: "name",
			label: "Name",
			type: "text",
			placeholder: "Name",
			value: name,
			onChange: setName,
			error: validationErrors.name,
		},
		{
			name: "minTargetAmount",
			label: "Min Target Amount",
			type: "text",
			placeholder: "Amount",
			value: minTargetAmount,
			onChange: (v) => setMinTargetAmount(removeNonDigit(v)),
			error: validationErrors.minTargetAmount,
		},
		{
			name: "maxTargetAmount",
			label: "Max Target Amount",
			type: "text",
			placeholder: "Amount",
			value: maxTargetAmount,
			onChange: (v) => setMaxTargetAmount(removeNonDigit(v)),
			error: validationErrors.maxTargetAmoun,
		},
		{
			name: "minSavedAmount",
			label: "Min Saved Amount",
			type: "text",
			placeholder: "Amount",
			value: minSavedAmount,
			onChange: (v) => setMinSavedAmount(removeNonDigit(v)),
			error: validationErrors.minSavedAmount,
		},
		{
			name: "maxSavedAmount",
			label: "Max SAVED Amount",
			type: "text",
			placeholder: "Amount",
			value: maxSavedAmount,
			onChange: (v) => setMaxSavedAmount(removeNonDigit(v)),
			error: validationErrors.maxSavedAmount,
		},
		{
			name: "dateFrom",
			label: "Date From",
			type: "date",
			value: dateFrom,
			onChange: setDeadlineFrom,
			error: validationErrors.dateFrom,
		},
		{
			name: "dateTill",
			label: "Date Till",
			type: "date",
			value: dateTill,
			onChange: setDeadlineTill,
			error: validationErrors.dateTill,
		},
	]
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Filter">
			<Form fields={fields} onSubmit={handleSubmit} submitLabel="Filter" />
		</Modal>
	)
}

export default GoalFilterForm
