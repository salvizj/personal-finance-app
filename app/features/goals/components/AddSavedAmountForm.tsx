import { useState } from "react"
import Modal from "~/components/ui/Modal"
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

const AddToSavedAmount = ({
	isOpen,
	onClose,
	onSubmit,
	editGoalData,
}: GoalsFormProps) => {
	const [addToSavedAmount, setAddToSavedAmount] = useState("")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = { addToSavedAmount }
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

	const fields: FieldConfig[] = [
		{
			name: "savedAmount",
			label: "Saved Amount",
			type: "text",
			placeholder: "Saved Amount",
			required: true,
			value: addToSavedAmount,
			onChange: setAddToSavedAmount,
			error: validationErrors.title,
		},
	]

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			submitLabel={"Add To Saved total"}
		/>
	)
}
export default AddToSavedAmount
