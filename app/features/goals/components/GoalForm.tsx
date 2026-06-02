import { useEffect, useState } from "react"
import Modal from "~/components/ui/Modal"
import { removeNonDigit } from "~/utils/utils"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import { goalSchema, type GoalSchema } from "~/schemas/goalSchema"
import type { z } from "zod"

type GoalsFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: GoalSchema) => void
	editGoalData?: GoalSchema | null
}

const GoalsForm = ({
	isOpen,
	onClose,
	onSubmit,
	editGoalData,
}: GoalsFormProps) => {
	const [name, setName] = useState("")
	const [targetAmount, setTargetAmount] = useState("")
	const [date, setDate] = useState("")
	const [savedAmount, setSavedAmount] = useState("0")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setValidationErrors({})

		const formData = { name, targetAmount, date, savedAmount }
		const result = goalSchema.safeParse(formData)

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

	useEffect(() => {
		if (editGoalData) {
			setName(editGoalData.name)
			setTargetAmount(String(editGoalData.targetAmount))
			setSavedAmount(String(editGoalData.savedAmount))
			setDate(editGoalData.date)
		}
	}, [editGoalData])

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
			name: "targetAmount",
			label: "Target Amount",
			type: "text",
			placeholder: "Target Amount",
			value: targetAmount,
			onChange: (v) => setTargetAmount(removeNonDigit(v)),
			error: validationErrors.targetAmount,
		},
		{
			name: "savedAmount",
			label: "Saved Amount",
			type: "text",
			placeholder: "Saved Amount",
			value: savedAmount,
			onChange: (v) => setSavedAmount(removeNonDigit(v)),
			error: validationErrors.savedAmount,
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
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Add Goal">
			<Form
				fields={fields}
				onSubmit={handleSubmit}
				submitLabel={editGoalData ? "Edit Goal" : "Add Goal"}
			/>
		</Modal>
	)
}
export default GoalsForm
